var cy = cytoscape({
  container: document.getElementById('cy'), // container to render in
  style: [
        {
            selector: "node",
            style: {
                "background-opacity": 0,
                label: "",
            },
        },
        {
            selector: "node[type = 'route']",
            style: {
                "background-opacity": 1,
                "shape": "ellipse",
            },
        },
        {
            selector: "node[?running]",
            style: {
                "background-color": "orange",
            },
        },
        {
            selector: 'edge',
            style: {
                'curve-style': 'bezier',
                'mid-target-arrow-shape': 'triangle',
                'arrow-scale': 2,
                "label": (edge) => {
                    const weight = edge.data().weight;
                    const label = edge.data().label;
                    if (label && label.length > 0) {
                        return label.replaceAll("{weight}", weight);
                    } else {
                        if (weight == 1 || weight <= 0) {
                            return "";
                        } else {
                            return weight ?? "";
                        }
                    }
                },
                "text-margin-y": 18,
                "text-background-opacity": 1,
                "edge-text-rotation": "autorotate",
                "color": "white"
            }
        },
        {
            "selector": "edge[?activateScript]",
            "style": {
                'mid-target-arrow-shape': 'triangle-tee',
            },
        },
        {
            "selector": "edge[?weightScript]",
            "style": {
                "line-color": "#7c3aed",
                "mid-target-arrow-color": "#7c3aed",
            },
        },
        {
            "selector": "edge[weight <= 0]",
            "style": {
                "line-color": "#dc2626",
                "color": "#dc2626",
                "mid-target-arrow-color": '#dc2626',
            },
        },
        {
            "selector": "edge:selected",
            "style": {
                "underlay-color": "lightblue",
                "underlay-opacity": 1
            }
        },
        {
            selector: 'node[type = "group"]',
            style: {
                'text-valign': 'bottom',
                'text-halign': 'center',
                "text-margin-y": 4,
                "text-background-opacity": 0.3,
                'color': '#fff',
                'shape': 'round-rectangle',
                'corner-radius': "10",
                'padding': 10,
                'background-color': (ele) => ele.data("color") ?? "#000",
                'background-opacity': 0.1,
            }
        },
        {
            selector: 'node[type = "group"][label]',
            style: {
                'label': 'data(label)',
            }
        },
        {
            selector: 'node[type = "group"][color]',
            style: {
                'text-background-color': 'data(color)',
            }
        },
        {
            selector: 'node[type = "group"]:selected',
            style: {
                'border-color': 'lightblue',
                'border-width': 3
            }
        },
        {
            selector: '.eh-handle',
            style: {
                'background-color': 'red',
                'width': 12,
                'height': 12,
                'shape': 'ellipse',
                'overlay-opacity': 0,
                'border-width': 12, // makes the handle easier to hit
                'border-opacity': 0
            }
        },
    ],
});

const domContainer = document.getElementById("#dom-layer");
const renderer = cy.domNode({
    domContainer,
});

// the default values of each option are outlined below:
let edgeHandlesDefaults = {
  canConnect: function( sourceNode, targetNode ){
    // whether an edge can be created between source and target
    return !sourceNode.same(targetNode); // e.g. disallow loops
  },
  edgeParams: function( sourceNode, targetNode ){
    // for edges between the specified source and target
    // return element object to be passed to cy.add() for edge
    return {};
  },
  hoverDelay: 75, // time spent hovering over a target node before it is considered selected
  snap: false, // when enabled, the edge can be drawn by just moving close to a target node (can be confusing on compound graphs)
  snapThreshold: 50, // the target node must be less than or equal to this many pixels away from the cursor/finger
  snapFrequency: 15, // the number of times per second (Hz) that snap checks done (lower is less expensive)
  noEdgeEventsInDraw: true, // set events:no to edges during draws, prevents mouseouts on compounds
  disableBrowserGestures: true // during an edge drawing gesture, disable browser gestures such as two-finger trackpad swipe and pinch-to-zoom
};
const edgeHandles = cy.edgehandles(edgeHandlesDefaults);

let userGlobalEnv = {};
let userSettings = {
    autoProgressSecondsInterval: localStorage.getItem("autoProgressSecondsInterval") ?? 1,
    autosaveSecondsInterval: localStorage.getItem("autosaveSecondsInterval") ?? 10,
    runAllWeightScriptAfterActivation: (localStorage.getItem("runAllWeightScriptAfterActivation") == 'true'),
};
let transientState = {
    sidePanelTarget: null,
    runInstances: [],
    dirtyNodes: [],
};
let graphState = {
    title: "",
    description: ""
};

const userGlobalEnvProxy = new Proxy(userGlobalEnv, {
    has(target, prop) { return true; },
    get(target, prop, receiver) {
        return (prop in target ? target[prop] : 0); 
    },
    set(target, prop, value) { 
        target[prop] = value;
        return true;
    }
});

/// Activates a state node, which highlights it in the graph and
/// runs its activationScript as well as all outgoing edge weightScripts.
function activateNode(node, runInstanceId) {
    if (!node) {
        console.log("activatNode called with invalid node");
        return;
    }

    /// Hide all activate buttons if this is the first run instance.
    if (transientState.runInstances.length === 0) {
        cy.nodes().forEach((n) => {
            n.data("running", false);
            n.data("canActivate", false);
        });
    }

    // stop running the last node.
    let currentRunInstance = transientState.runInstances.findLast((d) => d.id === runInstanceId);
    if (!currentRunInstance) {
        currentRunInstance = transientState.runInstances.findLast((d) => {
            for (const nextNode of d.nextNodes) {
                if (nextNode.id() === node.id()) {
                    return true;
                }
            }
        });
    }
    if (currentRunInstance) {
        currentRunInstance.runningNode.data("running", false);
        currentRunInstance.runningNode.data("canActivate", false);
        for (const nextNode of currentRunInstance.nextNodes) {
            nextNode.data("canActivate", false);
        }
        currentRunInstance.nextNodes = [];
    } else {
        // create a new run instance.
        currentRunInstance = {
            id: runInstanceId ?? guid(),
            runningNode: node,
            nextNodes: [],
        };
        transientState.runInstances.push(currentRunInstance);
    }

    // clear running status of route nodes
    cy.nodes("[type = 'route']").forEach((routeNode) => {
        routeNode.data("running", false);
    });

    node.data("running", true);
    node.data("canActivate", false);
    const lastRunningNode = currentRunInstance.runningNode;
    currentRunInstance.runningNode = node;

    // Route nodes automatically progress to next.
    const nodeType = node.data().type;
    if (nodeType === "route") {
        setTimeout(() => {progressToNextNode(node);}, 100);
        return;
    }

    // Show the 'activate' button on all state nodes connected
    // in outgoing connection to this node being activates.
    // This also performs a depth first search along any route nodes
    // so we can consider those route nodes essentially collapsed into a
    // single edge.
    let connectedRouteNodes = [];
    cy.edges(`[source="${node.id()}"]`).forEach((edge) => {
        const target = edge.target();
        const nodeType = target.data().type;
        if (nodeType === "state") {
            currentRunInstance.nextNodes.push(target);
        } else if (nodeType === "route") {
            connectedRouteNodes.push(target);
        }
    });
    for (let routeNode of connectedRouteNodes) {
        let foundStateNodes = [];
        let stateNodeDepth = 9999;
        cy.elements().dfs({
            root: routeNode,
            visit: (currentNode, edge, previousNode, index, depth) => {
                if (currentNode.data().type === "state") {
                    if (depth > stateNodeDepth) {
                        return true;
                    } else {
                        foundStateNodes.push(currentNode);
                        stateNodeDepth = depth;
                    }
                }
            },
            directed: true,
        });
        for (const stateNode of foundStateNodes) {
            currentRunInstance.nextNodes.push(stateNode);
        }
    }
    for (const nextNode of currentRunInstance.nextNodes) {
        nextNode.data("canActivate", true);
    }

    let globalEnvDirty = false;
    transientState.dirtyNodes = [node, lastRunningNode];
    const runningNodeUserdataProxy = generateUserdataProxy(node.data().userEnv, node.id());

    // Run the travel script on the edge that is being travelled across.
    const edgesTo = lastRunningNode.edgesTo(node);
    if (edgesTo.length > 0) {
        const edge = edgesTo[0];
        const edgeUserdata = edge.data().userEnv ?? {};
        const edgeActivateScript = edge.data().activateScript;
        const edgeUserdataProxy = generateUserdataProxy(edgeUserdata, edge.id());
        const fromNodeUserdataProxy = generateUserdataProxy(lastRunningNode.data().userEnv, lastRunningNode.id());
        try {
            runUserEdgeScript(
                edgeActivateScript, 
                currentRunInstance, 
                userGlobalEnvProxy, 
                edgeUserdataProxy, 
                fromNodeUserdataProxy, 
                runningNodeUserdataProxy
            );
        } catch (error) {
            showErrorToUser(`Failed to run travel script: ${error}`);
        }
        edge.data('userEnv', edgeUserdata);
        globalEnvDirty = true;
    }

    // Run the user script on this activates node.
    // A proxy is used so the user doesn't have to declare
    // any variables, it just automatically sets any undefined
    // variable to 0.
    runningNodeUserdataProxy._visits += 1;
    if (node.data().activateScript) {
        try {
            runUserScript(
                node.data().activateScript, 
                currentRunInstance, 
                userGlobalEnvProxy, 
                runningNodeUserdataProxy
            );
        } catch (error) {
            showErrorToUser(`Failed to run state script: ${error}`);
        }
        globalEnvDirty = true;
        if (transientState.sidePanelTarget && transientState.sidePanelTarget.id() === node.id()) {
            document.getElementById("side-panel-node-visits").innerText = node.data().userEnv._visits;
        }
    }

    // Update the outgoing edge weights if any of those have a weight script.
    let edgesWithWeightScript = [];
    if (userSettings.runAllWeightScriptAfterActivation) {
        edgesWithWeightScript = cy.edges('[weightScript]').toArray();
    } else {
        edgesWithWeightScript = node.outgoers('edge[weightScript]').toArray();
    }
    for (const edge of edgesWithWeightScript) {
        const edgeData = edge.data();
        if (edgeData.weightScript && edgeData.weightScript.length > 0) {
            const edgeUserdata = edgeData.userEnv ?? {};
            const edgeUserdataProxy = generateUserdataProxy(edgeData.userEnv ?? {}, edge.id());
            const fromNodeUserdataProxy = generateUserdataProxy(edge.source().data().userEnv ?? {}, edge.source().id());
            const toNodeUserdataProxy = generateUserdataProxy(edge.target().data().userEnv ?? {}, edge.target().id());
            let weight = 1.0;
            try {
                weight = runUserEdgeScript(
                    edgeData.weightScript, 
                    currentRunInstance, 
                    userGlobalEnvProxy, 
                    edgeUserdataProxy, 
                    fromNodeUserdataProxy,
                    toNodeUserdataProxy
                );
            } catch (error) {
                showErrorToUser(`Failed to run weight script: ${error}`);
            }
            edge.data("userEnv", edgeUserdata);
            if (weight === true) {
                edge.data('weight', 1);
            } else if (weight === false) {
                edge.data('weight', 0);
            } else {
                if (!isNaN(Number(weight))) {
                    edge.data('weight', parseFloat(weight.toFixed(2)));
                } else {
                    showErrorToUser(`Weight Script returned invalid value: ${weight}`);
                }
            }
            globalEnvDirty = true;
        }
    }

    for (const nextNode of currentRunInstance.nextNodes) {
        const edgesTo = currentRunInstance.runningNode.edgesTo(nextNode);
        let foundNonZeroEdge = false;
        for (const edgeTo of edgesTo) {
            if ((edgeTo.data().weight ?? 1) > 0) {
                foundNonZeroEdge = true;
                break;
            }
        }
        nextNode.data("hasValidEdgeTo", foundNonZeroEdge);
    }

    for (const dirtyNode of transientState.dirtyNodes) {
        dirtyNode.scratch('_domUpdaters').updateData(dirtyNode);
    }

    if (globalEnvDirty) {
        document.getElementById("side-panel-data-output").innerHTML = renderDataToHtml(userGlobalEnv);
    }

    // Auto progress to the next node if auto-progress is enabled.
    if (node.data().autoProgress === true) {
        setTimeout(() => {
            progressToNextNode(node);
        }, userSettings.autoProgressSecondsInterval * 1000);
    }
}

/// Selects a random item in items. The random selection uses
/// weights to sample items. I.e. if item[0] has weight 2 and item[1] has weight 4,
/// then item[1] is twice as likely to be picked.
function weightedRandom(items, weights) {
    if (items.length !== weights.length) {
        console.error("weightedRandom() must take inputs of equal length.");
        return null;
    }
    if (items.length == 0) {
        console.log("weightedRandom() items length is 0");
        return null;
    }
    let weightSum = 0;
    let cumulativeWeights = [];
    for (const weight of weights) {
        weightSum += weight;
        cumulativeWeights.push(weight + (cumulativeWeights[cumulativeWeights.length - 1] || 0));
    }
    const randomNumber = weightSum * Math.random();
    for (let i = 0; i < weights.length; i += 1) {
        if (cumulativeWeights[i] >= randomNumber) {
            return {
                item: items[i],
                index: i,
            };
        }
    }
    return null;
}

/// Automatically pick and activate the next state node.
/// It chooses one of the outgoing edges of the current running node,
/// depending on thier weights, and then activates it's target node.
function progressToNextNode(sourceNode) {
    const outgoers = sourceNode.outgoers('edge').toArray();
    if (outgoers.length === 0) {
        removeRunInstanceForNode(sourceNode);
        return;
    };
    let weights = [];
    let targetNodes = [];
    for (const edge of outgoers) {
        const weight = edge.data().weight ?? 1;
        if (weight > 0) {
            weights.push(weight);
            targetNodes.push(edge.target());
        }
    }
    const sample = weightedRandom(targetNodes, weights);
    if (sample) {
        activateNode(sample.item);
    }
}

function removeRunInstanceForNode(node) {
    transientState.runInstances = transientState.runInstances.filter((n) => {
        return n.runningNode !== node;
    });
    node.data("running", false);
}

function generateUserdataProxy(userdata, id) {
    return new Proxy(userdata, {
        has(target, prop) { return true; },
        get(target, prop, receiver) {
            if (prop === "_id") return id;
            return (prop in target ? target[prop] : 0); 
        },
        set(target, prop, value) {
            if (prop === "_id") return false; 
            target[prop] = value;
            return true;
        }
    });
}

function findNodeByIdOrTitle(nodeIdOrTitle) {
    const foundNodesById = cy.nodes(`#${nodeIdOrTitle}`);
    if (foundNodesById.length > 0) {
        return foundNodesById[0];
    }
    const foundNodesByTitle = cy.nodes(`[name = "${nodeIdOrTitle.toUpperCase()}"]`);
    if (foundNodesByTitle.length > 0) {
        return foundNodesByTitle[0];
    }
    return null;
}

/// Userland functions related to threads (AKA Run Instances).
const userspaceThreadFunctions = {
    run(runInstanceId) {
        const otherRunInstance = transientState.runInstances.findLast((n) => n.id === runInstanceId);
        if (otherRunInstance) {
            progressToNextNode(otherRunInstance.runningNode);
        } else {
            showErrorToUser(`Failed to run thread. There is no thread named ${runInstanceId}.`)
        }
    },
    changeId(runInstanceId, newRunInstanceId) {
        const otherRunInstance = transientState.runInstances.findLast((n) => n.id === runInstanceId);
        if (otherRunInstance) {
            otherRunInstance.id = runInstanceId ?? guid();
        } else {
            showErrorToUser(`Failed to change thread id. There is no thread with id ${runInstanceId}`);
        }
    },
    stop(runInstanceId) {
        const otherRunInstance = transientState.runInstances.findLast((n) => n.id === runInstanceId);
        transientState.runInstances = transientState.runInstances.filter((n) => {
            return n.id !== runInstanceId;
        });
        if (otherRunInstance) {
            otherRunInstance.runningNode.data("running", false);
        } else {
            showErrorToUser(`Failed to stop thread. There is no thread named ${runInstanceId}`);
        }
    },
    autorun(runInstanceId, intervalSeconds) {
        const _run = () => {
            const otherRunInstance = transientState.runInstances.findLast((n) => n.id === runInstanceId);
            if (otherRunInstance) {
                progressToNextNode(otherRunInstance.runningNode);
                setTimeout(_run, intervalSeconds * 1000);
            }
        };
        const _otherRunInstance = transientState.runInstances.findLast((n) => n.id === runInstanceId);
        if (_otherRunInstance) {
            setTimeout(_run, intervalSeconds * 1000);
        } else {
            showErrorToUser(`Failed to autorun thread: ${runInstanceId}`);
        }
    },
};

/// Userland functions related to state nodes.
const userspaceNodeFunctions = {
    run(nodeIdOrTitle, runInstanceId) {
        const foundNode = findNodeByIdOrTitle(nodeIdOrTitle);
        if (foundNode) {
            activateNode(foundNode, runInstanceId);
        } else {
            showErrorToUser(`Failed to run node. There is no node ${nodeIdOrTitle.toUpperCase()}`);
        }
    },
    filter(filterFn) {
        const foundNodes = cy.nodes('[type = "state"]');
        foundNodes.forEach((n) => transientState.dirtyNodes.push(n));
        const nodeUserEnvs = foundNodes.map((n) => generateUserdataProxy(n.data().userEnv, n.id()));
        return nodeUserEnvs.filter(filterFn);
    },
    get(nodeIdOrTitle) {
        const foundNode = findNodeByIdOrTitle(nodeIdOrTitle);
        if (foundNode) {
            transientState.dirtyNodes.push(foundNode);
            return generateUserdataProxy(foundNode.data().userEnv, foundNode.id());
        } else {
            return null;
        }
    },
    set(nodeIdOrTitle, fieldName, value) {
        const foundNode = findNodeByIdOrTitle(nodeIdOrTitle);
        if (foundNode) {
            foundNode.data().userEnv[fieldName] = value;
            transientState.dirtyNodes.push(foundNode);
            return true;
        } else {
            return false;
        }
    }
};

/// Run a user-created script.
/// This sets up some environment variables for the user.
/// g: the global state object.
/// self: a state object stored on the node itself.
/// runNode(nodeTitleOrGui, runInstanceId): creates a new run instance at the current node.
/// runThread(runInstanceId): progresses that runInstance to the next node.
/// setThreadId(runInstanceId): sets the current run instance's id.
function runUserScript(script, runInstance, globalEnv, nodeEnv) {
    "use strict";
    const threadId = runInstance.id;
    const reset = resetAllUserVariablesButKeepRunning;
    const random = Math.random;
    const min = Math.min;
    const max = Math.max;
    const log = showInfoToUser;
    const node = userspaceNodeFunctions;
    const thread = userspaceThreadFunctions;
    const g = globalEnv;
    const self = nodeEnv;
    const result = eval(script);
    return result;
}

function runUserEdgeScript(script, runInstance, globalEnv, edgeEnv, fromNodeEnv, toNodeEnv) {
    "use strict";
    const threadId = runInstance.id;
    const reset = resetAllUserVariablesButKeepRunning;
    const random = Math.random;
    const min = Math.min;
    const max = Math.max;
    const log = showInfoToUser;
    const node = userspaceNodeFunctions;
    const thread = userspaceThreadFunctions;
    const g = globalEnv;
    const self = edgeEnv;
    const from = fromNodeEnv;
    const to = toNodeEnv;
    const result = eval(script);
    return result;
}

/// Create the DOM element for a state node.
function createStateNodeElement(name) {
    const element = document.createElement("article");
    const tone = "blue";
    const playIcon = String.fromCodePoint(0x25B6);
    const paperIcon = String.fromCodePoint(0x1F4C3);
    const dieIcon = String.fromCodePoint(0x1F3B2);
    element.className = `dom-node tone-${tone} hide-progress`;
    element.innerHTML = `<header>
        <strong class="node-title">${(name ?? "untitled").toUpperCase()}</strong>
        </header>
        <p class="node-description"></p>
        <p class="node-data"></p>
        <div style="display: flex; align-items: center;">
        <button type="button" data-action="activate">${playIcon}</button>
        <button type="button" data-action="progress">${dieIcon}</button>
        <span class="script-icon" hidden="true">${paperIcon}</span>
        </div>
        `;
    const updateTitle = (node) => {
        const _element = node.data().dom;
        _element.querySelector(".node-title").innerText = node.data().name.toUpperCase();
    };
    const updateDescription = (node) => {
        const _element = node.data().dom;
        _element.querySelector(".node-description").innerText = node.data().description;
    };
    const updateData = (node) => {
        const _element = node.data().dom;
        _element.querySelector(".node-data").innerHTML = renderDataToHtml(node.data().userEnv);
    };
    const updateAutoProgress = (node) => {
        const _element = node.data().dom;
        if (node.data().autoProgress === true) {
            _element.classList.toggle("tone-blue", false);
            _element.classList.toggle("tone-violet", true);
        } else {
            _element.classList.toggle("tone-blue", true);
            _element.classList.toggle("tone-violet", false);
        }
    };
    const updateScriptIcon = (node) => {
        const scriptIconEl = node.data().dom.getElementsByClassName("script-icon")[0]
        scriptIconEl.hidden = (node.data().activateScript.length === 0);
    };
    return {element, domUpdaters: {
        updateTitle, updateDescription, updateData, updateAutoProgress, updateScriptIcon,
    }};
}

/// Create a new untitled state node.
function createStateNode(name, position) {
    const {element, domUpdaters} = createStateNodeElement(name);
    const node = cy.add({
        group: 'nodes',
        data: { 
            dom: element, 
            type: "state", 
            name: name,
            description: "",
            running: false,
            canActivate: (transientState.runInstances.length === 0),
            activateScript: '',
            userEnv: {},
        },
        position: position,
    });
    bindStateNodeActions(node, domUpdaters);
    return node;
}

function bindStateNodeActions(node, domUpdaters) {
    node.scratch('_domUpdaters', domUpdaters);
    const element = node.data().dom;
    element.querySelector("[data-action='activate']").addEventListener("click", (e) => {
        activateNode(node);
    });
    element.querySelector("[data-action='progress']").addEventListener("click", (e) => {
        progressToNextNode(node);
    });
    node.on("data", (e) => {
        const data = e.target.data();
        if (data.dom) {
            data.dom.classList.toggle("running", data.running);
            data.dom.classList.toggle("hide-progress", (!data.running || (data.autoProgress === true)));
            data.dom.classList.toggle("hide-activate", !data.canActivate);
            data.dom.classList.toggle("has-valid-edge-to", data.hasValidEdgeTo);
            data.dom.classList.toggle("has-invalid-edge-to", !data.hasValidEdgeTo);

            data.dom.classList.toggle("back-white", data.color === "white");
            data.dom.classList.toggle("back-blue", data.color === "blue");
            data.dom.classList.toggle("back-violet", data.color === "violet");
            data.dom.classList.toggle("back-green", data.color === "green");
            data.dom.classList.toggle("back-red", data.color === "red");
            data.dom.classList.toggle("back-gold", data.color === "gold");
        }
    });
    node.emit("data");
}

/// Create a new state node and restore its state from saved data.
function restoreStateNode(storedNode) {
    const {element, domUpdaters} = createStateNodeElement(storedNode.name);
    const node = cy.add({
        group: 'nodes',
        data: { 
            id: storedNode.id,
            parent: storedNode.parentId,
            dom: element, 
            type: "state", 
            name: storedNode.name,
            description: storedNode.description,
            color: storedNode.color,
            running: false,
            canActivate: (transientState.runInstances.length === 0),
            activateScript: storedNode.activateScript,
            autoProgress: storedNode.autoProgress,
            userEnv: {},
        },
        position: storedNode.position,
    });
    for (const name in domUpdaters) {
        domUpdaters[name](node);
    }
    bindStateNodeActions(node, domUpdaters);
    return node;
}

function resetAllUserVariables() {
    for (let name in userGlobalEnvProxy) {
        delete userGlobalEnvProxy[name];
    }
    document.getElementById("side-panel-data-output").innerHTML = "";
    cy.nodes().forEach((node) => {
        if (node.data().type === 'state') {
            for (let name in node.data().userEnv) {
                delete node.data().userEnv[name];
            }
            node.data("running", false);
            node.data("canActivate", true);
            node.data("hasValidEdgeTo", true);
            node.scratch('_domUpdaters').updateData(node);
        }
    });
    transientState.runInstances = [];
}

function resetAllUserVariablesButKeepRunning() {
    for (let name in userGlobalEnvProxy) {
        delete userGlobalEnvProxy[name];
    }
    document.getElementById("side-panel-data-output").innerHTML = "";
    cy.nodes('[type = "state"]').forEach((node) => {
        for (let name in node.data().userEnv) {
            delete node.data().userEnv[name];
        }
        node.scratch('_domUpdaters').updateData(node);
    });
}

function saveGraphToJson()  {
    // cull empty groups.
    const groups = cy.elements("node[type = 'group']");
    let culledGroupCount = 0;
    groups.forEach((group) => {
        if (group.isChildless()) {
            cy.remove(group);
            culledGroupCount += 1;
        }
    });
    if (culledGroupCount > 0) {
        console.log("Culled empty groups:", culledGroupCount);
    }

    let state = [];
    // save viewport
    state.push({
        type: 'viewport',
        version: 3,
        zoom: cy.zoom(),
        position: cy.pan(),
        title: graphState.title,
        description: graphState.description,
    });
    // Save groups first.
    cy.nodes().forEach((node) => {
        const data = node.data();
        if (data.type === "group") {
            state.push({
                type: 'group',
                id: node.id(),
                position: node.position(),
                color: node.data().color,
                label: node.data().label,
            });
        }
    });
    // Then save state and route nodes.
    cy.nodes().forEach((node) => {
        const data = node.data();
        if (data.type === "state") {
            state.push({
                type: 'node',
                id: node.id(),
                parentId: data.parent,
                name: data.name,
                description: data.description,
                color: data.color,
                activateScript: data.activateScript,
                autoProgress: data.autoProgress,
                position: node.position(),
            });
        } else if (data.type === "route") {
            state.push({
                type: 'route',
                id: node.id(),
                parentId: data.parent,
                position: node.position(),
            });
        }
    });
    // Then save edges.
    cy.edges().forEach((edge) => {
        state.push({
            type: 'edge',
            sourceId: edge.source().id(),
            targetId: edge.target().id(),
            weight: edge.data().weight,
            weightScript: edge.data().weightScript,
            activateScript: edge.data().activateScript,
            label: edge.data().label,
        });
    });
    return JSON.stringify(state, null, 2);
}

function loadGraphFromJson(jsonText) {
    const state = JSON.parse(jsonText);
    resetAllUserVariables();
    cy.remove(cy.edges());
    cy.remove(cy.nodes());
    for (let item of state) {
        if (item.type === 'viewport') {
            cy.viewport({
                zoom: item.zoom,
                pan: item.position,
            });
            graphState.title = item.title;
            graphState.description = item.description;
        } else if (item.type === 'node') {
            restoreStateNode(item);
        } else if (item.type === 'group') {
            cy.add({
                group: 'nodes',
                data: {
                    id: item.id,
                    type: 'group',
                    color: item.color,
                    label: item.label,
                },
                position: item.position,
            });
        } else if (item.type === 'route') {
            cy.add({
                group: 'nodes',
                data: {
                    id: item.id,
                    type: 'route',
                },
                position: item.position,
            });
        } else if (item.type === 'edge') {
            cy.add({
                group: 'edges',
                data: {
                    source: item.sourceId,
                    target: item.targetId,
                    weight: parseFloat(item.weight ?? '1'),
                    weightScript: item.weightScript,
                    activateScript: item.activateScript,
                    label: item.label,
                }
            });
        }
    }
    for (const bind of sidePanelBinds) {
        if (bind.functions.updateElementNoTarget) {
            const element = document.getElementById(bind.id);
            bind.functions.updateElementNoTarget(element);
        }
    }
}

function groupSelection() {
    var selectedGroups = cy.elements('node[type = "group"]:selected');
    selectedGroups.forEach((group) => {
        group.children().forEach((child) => {
            child.move({parent: null});
        });
        cy.remove(group);
    });

    var selectedIds = cy.elements('node[type = "state"]:selected');
    if (selectedIds.length === 1 && selectedIds[0].parent().length > 0) {
        const parent = selectedIds[0].parent();
        selectedIds[0].move({parent: null});
        if (parent.children().length === 0) {
            cy.remove(parent);
        }
    } else {
        const parentNode = cy.add({
            group: 'nodes',
            data: {
                type: "group" 
            },
        });
        selectedIds.forEach((node) => {
            node.move({parent: parentNode.id()});
        });
    }
}

function duplicateStateNode(node) {
    const dupeNode = node.clone();
    const data = dupeNode.data();
    const store = {
        type: 'node',
        id: undefined,
        name: data.name,
        position: dupeNode.position(),
        parentId: data.parent,
        description: data.description,
        activateScript: data.activateScript,
    };
    return restoreStateNode(store);
}

function duplicateSelection() {
    var selectedGroups = cy.elements('node[type = "group"]:selected');
    selectedGroups.forEach((group) => {
        const newGroup = cy.add({
            group: 'nodes',
            data: {
                type: 'group',
            },
        });
        let idMapping = {};
        let dupedNodes = [];
        const children = group.children();
        children.forEach((child) => {
            const dupe = duplicateStateNode(child);
            dupe.move({parent: newGroup.id()});
            dupe.shift('x', 25);
            idMapping[child.id()] = dupe;
            dupedNodes.push(dupe);
        });
        let closedEdgeIds = {};
        children.forEach((child) => {
            let childId = child.id();
            child.connectedEdges().forEach((edge) => {
                const edgeData = edge.data();
                const source = cy.$(`#${edge.data().source}`);
                const target = cy.$(`#${edge.data().target}`);
                if (!closedEdgeIds[edge.id()] && idMapping[edgeData.source] && idMapping[edgeData.target]) {
                    cy.add({
                        group: 'edges',
                        data: {
                            source: idMapping[edgeData.source].id(),
                            target: idMapping[edgeData.target].id(),
                        }
                    });
                    closedEdgeIds[edge.id()] = true;
                }
            });
        });
        newGroup.select();
    });
    selectedGroups.deselect();

    if (selectedGroups.length === 0) {
        var selectedNodes = cy.elements('node[type = "state"]:selected');
        let idMapping = {};
        let dupedNodes = [];
        selectedNodes.forEach((node) => {
            const dupe = duplicateStateNode(node);
            dupe.shift('x', 25);
            idMapping[node.id()] = dupe;
            dupedNodes.push(dupe);
            dupe.select();
        });
        let closedEdgeIds = {};
        selectedNodes.forEach((node) => {
            let childId = node.id();
            node.connectedEdges().forEach((edge) => {
                const edgeData = edge.data();
                const source = cy.$(`#${edge.data().source}`);
                const target = cy.$(`#${edge.data().target}`);
                if (!closedEdgeIds[edge.id()] && idMapping[edgeData.source] && idMapping[edgeData.target]) {
                    cy.add({
                        group: 'edges',
                        data: {
                            source: idMapping[edgeData.source].id(),
                            target: idMapping[edgeData.target].id(),
                        }
                    });
                    closedEdgeIds[edge.id()] = true;
                }
            });
        });
        setSidePanelData(dupedNodes[0]);
        selectedNodes.deselect();
    }
}

function renderDataToHtml(data) {
    let html = "";
    let sortedData = [];
    for (let name in data) {
        if (!name.startsWith("_")) {
            sortedData.push([name, data[name]]);
        }
    }
    sortedData.sort((a, b) => {
        const aName = a[0].toUpperCase();
        const bName = b[0].toUpperCase();
        if (aName < bName) return -1;
        if (aName > bName) return 1;
        return 0;
    });
    sortedData.forEach((d) => {
        html += `<code>${d[0]}</code> ${d[1]}<br/>`;
    });
    return html;
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

let sidePanelBinds = [];

function showSidePanelVariant(id) {
    Array.from(document.getElementsByClassName("side-panel-variant")).forEach((el) => el.hidden = true);
    document.getElementById(id).hidden = false;
}

function setSidePanelData(target) {
    transientState.sidePanelTarget = target;
    if (target === null) {
        showSidePanelVariant("side-panel-noselection");
    } else if (target.data().type === "state") {
        showSidePanelVariant("side-panel-node-details");
    } else if (target.group() === "edges") {
        showSidePanelVariant("side-panel-edge-details");
    } else if (target.data().type === 'group') {
        showSidePanelVariant("side-panel-group-details");
    }
    for (const bind of sidePanelBinds) {
        const element = document.getElementById(bind.id);
        if (bind.functions.updateElement && target) {
            bind.functions.updateElement(element, target);
        } else if (bind.functions.updateElementNoTarget) {
            bind.functions.updateElementNoTarget(element);
        }
    }
}

function splitEdge(edge, position) {
    // create route node
    const routeNode = cy.add({
        group: 'nodes',
        data: {
            type: 'route',
        },
        position: position,
    });
    // create edge in
    cy.add({
        group: 'edges',
        data: {
            source: edge.source().id(),
            target: routeNode.id(),
        }
    });
    // create edge out
    cy.add({
        group: 'edges',
        data: {
            source: routeNode.id(),
            target: edge.target().id(),
        }
    });
    // remove old edge
    cy.remove(edge);
}

// Create a new node when the user double-clicks on the graph.
// Or if the double click on an edge, split that edge into two.
cy.on('dblclick', (e) => {
    // Split an edge if its double clicked.
    if (e.target.group && (e.target.group() === "edges")) {
        splitEdge(e.target, e.position);
        return;
    }

    // Else create a new state node.
    let node = createStateNode("untitled", e.position);
    setTimeout(()=>{
        node.select();
        setSidePanelData(node);
        const inputEl = document.getElementById("side-panel-title");
        inputEl.focus();
        inputEl.select();
    }, 1);
});

// Create a new state node when the user drag-creates an edge but releases
// onto the empty graph rather than over a node.
cy.on('ehstop', (e, sourceNode, targetNodes) => {
    if (targetNodes.length == 0) {
        cy.elements().deselect();
        let node = createStateNode("untitled", e.position);
        setTimeout(()=>{
            node.select();
            setSidePanelData(node);
            const inputEl = document.getElementById("side-panel-title");
            inputEl.focus();
            inputEl.select();
        }, 1);
        cy.add({
            group: 'edges',
            data: {
                source: sourceNode.id(),
                target: node.id(),
            },
        });
    }
});

cy.on('ehdrawon', (e) => {
    document.body.style.cursor = 'crosshair';
});

cy.on('ehdrawoff', (e) => {
    document.body.style.cursor = 'default';
});

cy.on('tapselect', (e) => {
    setSidePanelData(e.target);
});

cy.on('tapunselect', (e) => {
    setSidePanelData(null);
});

function bindSidePanelElement(id, listenerEvent, functions) {
    if (listenerEvent) {
        document.getElementById(id).addEventListener(listenerEvent, (e) => {
            if (transientState.sidePanelTarget) {
                const domUpdaters = transientState.sidePanelTarget.scratch('_domUpdaters');
                functions.setData(transientState.sidePanelTarget, e.target, domUpdaters);
            }
            if (functions.setGraphData) {
                functions.setGraphData(graphState, e.target);
            }
        });
    }
    sidePanelBinds.push({
        id, functions
    });
}

function bindSidePanelNumberSetting(id, listenerEvent, settingFieldName) {
    const element = document.getElementById(id);
    element.value = userSettings[settingFieldName];
    element.addEventListener(listenerEvent, (e) => {
        const value = parseFloat(e.target.value);
        userSettings[settingFieldName] = value;
        localStorage.setItem(settingFieldName, value);
    });
}

function bindSidePanelCheckboxSetting(id, listenerEvent, settingFieldName) {
    const element = document.getElementById(id);
    element.checked = userSettings[settingFieldName];
    element.addEventListener(listenerEvent, (e) => {
        const value = (e.target.checked == true);
        userSettings[settingFieldName] = value;
        localStorage.setItem(settingFieldName, value.toString());
    });
}

bindSidePanelElement("side-panel-graph-title", "input", {
    updateElementNoTarget(element) {
        element.value = graphState.title;
        document.getElementById("graph-stage-title").innerText = element.value;
    },
    setGraphData(graphData, element) {
        graphData.title = element.value;
        document.getElementById("graph-stage-title").innerText = element.value;
    }
});
bindSidePanelElement("side-panel-graph-description", "input", {
    updateElementNoTarget(element) {
        element.value = graphState.description ?? "";
    },
    setGraphData(graphData, element) {
        graphData.description = element.value ?? "";
    }
});

bindSidePanelElement("side-panel-id", null, {
    updateElement(element, node) {
        element.innerText = node.id();
    },
});
bindSidePanelElement("side-panel-title", "input", {
    updateElement(element, node) {
        element.value = node.data().name;
    },
    setData(node, element, updaters) {
        node.data().name = element.value.toUpperCase();
        updaters.updateTitle(node);
    }
});
bindSidePanelElement("side-panel-description", "input", {
    updateElement(element, node) {
        element.value = node.data().description;
    },
    setData(node, element, updaters) {
        node.data().description = element.value;
        updaters.updateDescription(node);
    }
});
bindSidePanelElement("side-panel-node-color", "change", {
    updateElement(element, group) {
        element.value = group.data().color ?? "white";
    },
    setData(group, element, updaters) {
        group.data('color', element.value);
    }
});
bindSidePanelElement("side-panel-script1", "change", {
    updateElement(element, node) {
        element.value = node.data().activateScript;
    },
    setData(node, element, updaters) {
        node.data().activateScript = element.value;
        updaters.updateScriptIcon(node);
    }
});
bindSidePanelElement("side-panel-autoprogress", "change", {
    updateElement(element, node) {
        element.checked = node.data().autoProgress ?? false;
    },
    setData(node, element, updaters) {
        node.data().autoProgress = element.checked;
        updaters.updateAutoProgress(node);
    }
});
bindSidePanelElement("side-panel-node-visits", null, {
    updateElement(element, node) {
        if (node.data().userEnv) {
            element.innerText = node.data().userEnv._visits ?? 0;
        }
    }
});

bindSidePanelElement("side-panel-edge-id", null, {
    updateElement(element, edge) {
        element.innerText = edge.id();
    },
});
bindSidePanelElement("side-panel-edge-label", "input", {
    updateElement(element, edge) {
        element.value = edge.data().label ?? "";
    },
    setData(edge, element, updaters) {
        edge.data("label", element.value);
    }
});
bindSidePanelElement("side-panel-edge-weight", "input", {
    updateElement(element, edge) {
        element.value = edge.data().weight ?? 1;
    },
    setData(edge, element, updaters) {
        edge.data("weight", parseFloat(element.value));
    }
});
bindSidePanelElement("side-panel-edge-weight-script", "change", {
    updateElement(element, edge) {
        element.value = edge.data().weightScript ?? "";
    },
    setData(edge, element, updaters) {
        if (element.value.length > 0) {
            edge.data('weightScript', element.value);
        } else {
            edge.data('weightScript', null);
        }
    }
});
bindSidePanelElement("side-panel-edge-travel-script", "change", {
    updateElement(element, edge) {
        element.value = edge.data().activateScript ?? "";
    },
    setData(edge, element, updaters) {
        if (element.value.length > 0) {
            edge.data('activateScript', element.value);
        } else {
            edge.data('activateScript', null);
        }
    }
});
bindSidePanelElement("side-panel-group-id", null, {
    updateElement(element, group) {
        element.innerText = group.id();
    },
});
bindSidePanelElement("side-panel-group-label", "input", {
    updateElement(element, group) {
        element.value = group.data().label ?? "";
    },
    setData(group, element, updaters) {
        group.data('label', element.value);
    }
});
bindSidePanelElement("side-panel-group-color", "change", {
    updateElement(element, group) {
        element.value = group.data().color ?? "#000";
    },
    setData(group, element, updaters) {
        group.data('color', element.value);
    }
});

bindSidePanelNumberSetting("side-panel-global-autoprogress-seconds", "change", "autoProgressSecondsInterval");
bindSidePanelNumberSetting("side-panel-global-autosave-seconds", "change", "autosaveSecondsInterval");
bindSidePanelCheckboxSetting("side-panel-global-run-all-weightscripts", "change", "runAllWeightScriptAfterActivation");

showSidePanelVariant("side-panel-noselection");

document.addEventListener("keydown", (e) => {
    const inputFieldFocused = (e.target.type === "textarea" || e.target.type === "text");
    const altDown = (e.key === "Alt");
    const shiftDown = (e.key === "Shift");
    if ((e.target.type === "textarea") && e.key === "Tab") {
        e.preventDefault();
        const inputEl = e.target;
        const start = inputEl.selectionStart;
        const end = inputEl.selectionEnd;
        const tabStr = "  ";
        inputEl.value = inputEl.value.substring(0, start) + tabStr + inputEl.value.substring(end);
        inputEl.selectionStart = start + tabStr.length;
        inputEl.selectionEnd = start + tabStr.length;
        return true;
    }
    if (inputFieldFocused && !(altDown || shiftDown)) {
        return true;
    }
    if (e.key === "Delete") {
        var typeIds = cy.elements(':selected');
        cy.remove(typeIds);
    } else if (altDown) {
        edgeHandles.toggleDrawMode(true);
        e.preventDefault();
    } else if (shiftDown) {
        if (!transientState.heldShift) {
            transientState.heldShift = true;
            cy.nodes('[type = "state"]').forEach((n) => {
                if (!n.data().canActivate) n.data("canActivate", true);
            });
        }
    } else if (e.key === 'g') {
        groupSelection();
    } else if (e.key === 'd') {
        duplicateSelection();
    } else if (e.key === 'a') {
        let selectedNodes = cy.elements('node:selected');
        selectedNodes.forEach((node) => {
            node.data().autoProgress = !node.data().autoProgress;
            node.scratch('_domUpdaters').updateAutoProgress(node);
        });
    } else if (e.key === 'f') {
        if (transientState.runInstances.length > 0) {
            transientState.focusPressCount = transientState.focusPressCount ?? 0;
            const runInstance = transientState.runInstances[transientState.focusPressCount % transientState.runInstances.length];
            transientState.focusPressCount += 1;
            cy.fit(runInstance.runningNode, 550);
        }
    }
});

document.addEventListener("keyup", (e) => {
    const inputFieldFocused = (e.target.type === "textarea" || e.target.type === "text");
    const altUp = (e.key === "Alt");
    const shiftUp = (e.key === "Shift");
    if (inputFieldFocused && !(altUp || shiftUp)) {
        return true;
    }
    if (altUp) {
        edgeHandles.toggleDrawMode(false);
        cy.autoungrabify(false);
    } else if (shiftUp) {
        if (transientState.heldShift) {
            transientState.heldShift = false;
            if (transientState.runInstances.length > 0) {
                cy.nodes('[type = "state"]').forEach((n) => {
                    if (n.data().canActivate) n.data("canActivate", false);
                });
                for (const runInstance of transientState.runInstances) {
                    for (const nextNode of runInstance.nextNodes) {
                        nextNode.data("canActivate", true);
                    }
                }
            }
        }
    }
});

function onButtonClick(actionId, eventCallback) {
    document.querySelector(`[data-action="${actionId}"]`).addEventListener("click", eventCallback);
}

onButtonClick("reset-variables", (e) => {
    resetAllUserVariables();
});

onButtonClick("save", (e) => {
    const jsonText = saveGraphToJson();
    localStorage.setItem("workspace-graph", jsonText);
});

onButtonClick("load", (e) => {
    const jsonText = localStorage.getItem("workspace-graph");
    loadGraphFromJson(jsonText);
});

onButtonClick("export-clipboard", (e) => {
    const jsonText = saveGraphToJson();
    navigator.clipboard.writeText(jsonText);
});

onButtonClick("import-clipboard", (e) => {
    navigator.clipboard.readText().then((jsonText) => {
        try {
            loadGraphFromJson(jsonText);
        } catch (error) {
            showErrorToUser(`Failed to load graph from clipboard: ${error}`);
            console.log(error);
        }
    });
});

onButtonClick("clear-graph", (e) => {
    cy.remove(cy.elements());
    transientState = {
        sidePanelTarget: null,
        runInstances: [],
    };
});

function showInfoToUser(infoText) {
    const infoEl = document.getElementById("side-panel-info-message");
    infoEl.hidden = false;
    infoEl.innerText = infoText;
    setTimeout(() => { infoEl.hidden = true; }, 5_000);
}

function showErrorToUser(errorText) {
    const errorEl = document.getElementById("side-panel-error-message");
    errorEl.hidden = false;
    errorEl.innerText = errorText;
    setTimeout(() => { errorEl.hidden = true; }, 10_000);
}

function autosave() {
    const jsonText = saveGraphToJson();
    localStorage.setItem("workspace-graph", jsonText);
    console.log("auto saved");
    if (userSettings.autosaveSecondsInterval > 0) {
        setTimeout(autosave, userSettings.autosaveSecondsInterval * 1000);
    }
}

// Load last saved workspace, failing that load an example graph.
const loadedWorkspaceGraphJson = localStorage.getItem("workspace-graph");
if (loadedWorkspaceGraphJson) {
    loadGraphFromJson(loadedWorkspaceGraphJson);
} else {
    loadGraphFromJson(window.exampleGraphJson);
}
if (userSettings.autosaveSecondsInterval > 0) {
    autosave();
}
