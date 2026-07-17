# strangeloops
A design tool for simulating and exploring game progression and choices.

It's an interactive hybrid of a [State Machine](https://en.wikipedia.org/wiki/Finite-state_machine) and a [Markov Chain](https://en.wikipedia.org/wiki/Markov_chain).

Example usecases of this tool could be:
- Finding soft locks in your progression systems.
- Getting a vibe of your game's systems before they are all fully implemented.
- Mocking up narrative and dialogue trees.
- Predicting how many hours of gameplay a non-linear game takes to complete.
- Getting a bigger holistic picture of how all your "locks and gates" fit together.

# Technical Details
Strange Loops is made with very few dependencies, just [Cytoscape.js](https://js.cytoscape.org/) and a couple Cytoscape extensions for the core graph logic and rendering the graph, and [lodash](https://lodash.com/) as a 
sub-dependency for one of those extensions (I don't use lodash in my own code). Everything else fits in `js/main.js` and should be somewhat simple to follow along and modify. There's no React, Vue, JSQuery, or whatnot.

I encourage designers familiar with JavaScript to take Strange Loops and modify it to fit their own workflows. There's no server/cloud component either, which makes this suitable for use in more
secure/secrecy-sensitive environments.
