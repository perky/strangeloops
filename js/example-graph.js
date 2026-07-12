window.exampleGraphJson = JSON.stringify([
  {
    "type": "viewport",
    "zoom": 0.5754399373371625,
    "position": {
      "x": 1909.398219610307,
      "y": 843.6097584363516
    }
  },
  {
    "type": "group",
    "id": "a0ea37c1-e447-4a03-8cec-a81faa87184e",
    "position": {
      "x": -1378.692655877304,
      "y": -1275.0548236314057
    },
    "color": "#8cd067",
    "label": "Start here, hold shift and press play on \"OPENING AREA\""
  },
  {
    "type": "group",
    "id": "633e58c7-a610-48dc-9dcb-4d8cdbb09380",
    "position": {
      "x": -198.02235247202813,
      "y": -319.8982882946668
    },
    "color": "#be8523",
    "label": "kingdom's edge"
  },
  {
    "type": "node",
    "id": "a5ba2a9a-6e4b-453b-8fd0-27c6c1b804c8",
    "parentId": "a0ea37c1-e447-4a03-8cec-a81faa87184e",
    "name": "OPENING AREA",
    "description": "Tutorial",
    "activateScript": "",
    "position": {
      "x": -1592.2265257232573,
      "y": -1192.3775111400812
    }
  },
  {
    "type": "node",
    "id": "0451afcc-ba63-4fa0-b892-581ae45ec302",
    "parentId": "a0ea37c1-e447-4a03-8cec-a81faa87184e",
    "name": "DIRTMOUTH",
    "description": "",
    "activateScript": "",
    "position": {
      "x": -1255.2130299255707,
      "y": -1192.9494767295796
    }
  },
  {
    "type": "node",
    "id": "264dac8a-34c2-4819-a323-68b93377c277",
    "name": "FORGOTTEN CROSSROADS",
    "description": "",
    "activateScript": "g.foundMapmaker = true",
    "position": {
      "x": -1252.271791659349,
      "y": -796.4658221476881
    }
  },
  {
    "type": "node",
    "id": "7ea4ad57-3682-4fcd-8ca6-868018f231e1",
    "name": "👺BOSS: FALSE KNIGHT",
    "description": "Gain City Crest",
    "activateScript": "g.cityCrest = true\nself.done = true",
    "position": {
      "x": -1472.2538831480374,
      "y": -932.4228425706976
    }
  },
  {
    "type": "node",
    "id": "9fb6cb12-eb57-44b3-84de-8490f0ad29a9",
    "name": "GREENPATH EAST",
    "description": "",
    "activateScript": "",
    "position": {
      "x": -1859.2766969538457,
      "y": -789.8145862096526
    }
  },
  {
    "type": "node",
    "id": "d96e03df-24c0-4400-ab3d-d26760b59fe2",
    "name": "SNAIL SHAMAN",
    "description": "Gain Vengeful Spirit",
    "activateScript": "g.vengefulSpirit = true\nself.done = true",
    "position": {
      "x": -1603.6860187730424,
      "y": -666.3082252419243
    }
  },
  {
    "type": "node",
    "id": "9c8a79ff-2c86-444c-a1e4-45f70fc1cfa6",
    "name": "CRYSTAL PEAK",
    "description": "",
    "activateScript": "",
    "position": {
      "x": -671.0721259057926,
      "y": -1046.072556456263
    }
  },
  {
    "type": "node",
    "id": "a51e8cf7-e44f-4cfc-b2c8-bf950a693e91",
    "name": "HALLOWNEST'S CROWN",
    "description": "Has Pale Ore",
    "activateScript": "g.paleOre += 1",
    "position": {
      "x": -398.00204034195224,
      "y": -1472.4964747806728
    }
  },
  {
    "type": "node",
    "id": "384eb72d-2bb3-4d1f-9aad-359efce6622d",
    "name": "👺BOSS: CRYSTAL GUARDIAN",
    "description": "",
    "activateScript": "",
    "position": {
      "x": -392.9619419910258,
      "y": -1062.7456315168602
    }
  },
  {
    "type": "node",
    "id": "6ab3f65d-9417-40c0-bd11-c3b5cc1a7640",
    "name": "GREENPATH WEST",
    "description": "",
    "activateScript": "",
    "position": {
      "x": -2132.595678319081,
      "y": -794.0845020239326
    }
  },
  {
    "type": "node",
    "id": "42423985-3a9a-47b1-8566-f40d83ac825d",
    "parentId": "a0ea37c1-e447-4a03-8cec-a81faa87184e",
    "name": "SLY'S SHOP",
    "description": "",
    "activateScript": "",
    "position": {
      "x": -1393.5694999058574,
      "y": -1364.3644072971342
    }
  },
  {
    "type": "node",
    "id": "6dad4e55-c772-4c68-b73b-fc7d42a613f1",
    "parentId": "a0ea37c1-e447-4a03-8cec-a81faa87184e",
    "name": "MAPMAKER'S SHOP",
    "description": "",
    "activateScript": "",
    "position": {
      "x": -1165.158786031351,
      "y": -1365.73213612273
    }
  },
  {
    "type": "node",
    "id": "e9fbb775-c9a8-43a5-8d5c-d31509e71b45",
    "name": "👺BOSS: HORNET",
    "description": "Gain Mothwing Cloak",
    "activateScript": "g.mothwingCloak = true\nself.done = true",
    "position": {
      "x": -2360.2160429771843,
      "y": -787.3364838321697
    }
  },
  {
    "type": "node",
    "id": "3cb29816-001b-4d14-88a4-808db67e7653",
    "name": "LAKE OF UNN",
    "description": "",
    "activateScript": "",
    "autoProgress": false,
    "position": {
      "x": -2841.370298147587,
      "y": -790.4102950467686
    }
  },
  {
    "type": "node",
    "id": "e771ff15-87b4-4776-ac57-852c334748e6",
    "name": "OVERGROWN MOUND",
    "description": "",
    "activateScript": "",
    "position": {
      "x": -2186.2771713300576,
      "y": -449.2708383005402
    }
  },
  {
    "type": "node",
    "id": "d2320c83-91e5-4ed7-a12e-3a3c45978336",
    "name": "QUEEN'S GARDEN",
    "description": "",
    "activateScript": "g.visitedQueensGarden = true",
    "position": {
      "x": -2544.3309514327398,
      "y": -332.03820679905306
    }
  },
  {
    "type": "node",
    "id": "d28532c2-bcea-4c37-95e1-aad99e10f05d",
    "name": "FOG CANYON",
    "description": "",
    "activateScript": "",
    "position": {
      "x": -1892.3111720870374,
      "y": -297.6895642688567
    }
  },
  {
    "type": "node",
    "id": "11a5aae6-fbc0-4737-9c07-0ef7959c8e15",
    "name": "DEEPNEST",
    "description": "",
    "activateScript": "",
    "position": {
      "x": -2146.831618398692,
      "y": 228.1327078306314
    }
  },
  {
    "type": "node",
    "id": "3b0b7f78-c9db-4866-9d84-e41e30fd9afb",
    "name": "STONE SANCTUARY",
    "description": "",
    "activateScript": "g.visitedStoneSanctuary = true",
    "position": {
      "x": -1889.1606643270054,
      "y": -600.058057935786
    }
  },
  {
    "type": "node",
    "id": "ecdf64ec-5824-4ba5-ae62-b3247080cd6a",
    "name": "SHORTCUT",
    "description": "",
    "activateScript": "",
    "position": {
      "x": -2453.7094965038805,
      "y": -597.8591963421698
    }
  },
  {
    "type": "node",
    "id": "c067f8ae-ab70-4c72-bf54-6b864bb3adaf",
    "name": "FUNGAL WASTES",
    "description": "",
    "activateScript": "",
    "position": {
      "x": -1611.7136950909203,
      "y": -307.7792005593428
    }
  },
  {
    "type": "node",
    "id": "66514992-ea86-4bee-be26-68084159f75f",
    "name": "CITY OF TEARS",
    "description": "",
    "activateScript": "",
    "position": {
      "x": -1172.9617076334757,
      "y": -312.3515996513711
    }
  },
  {
    "type": "node",
    "id": "f1684edb-2461-44fe-968e-4cb5e132902b",
    "name": "ROYAL WATERWAYS",
    "description": "",
    "activateScript": "if (!self.open) {\n  self.open = true\n  g.simpleKey -= 1\n}",
    "position": {
      "x": -1402.2810785946274,
      "y": -131.68981279471606
    }
  },
  {
    "type": "node",
    "id": "d5fbcb65-7873-4859-8fd2-345f581a0fd1",
    "name": "ANCIENT BASIN",
    "description": "Has Simple Key",
    "activateScript": "g.simpleKey += 1",
    "position": {
      "x": -1218.9882443222018,
      "y": 245.61684748777992
    }
  },
  {
    "type": "node",
    "id": "65113f6b-cf76-4b00-91ad-51d187bf60fe",
    "name": "THE ABYSS",
    "description": "Gain Shade Cloak",
    "activateScript": "g.shadeCloak = true",
    "position": {
      "x": -1345.9168494480866,
      "y": 673.073279472427
    }
  },
  {
    "type": "node",
    "id": "e97708eb-fe88-44c9-b96d-0585325ff931",
    "name": "ISMA'S GROVE",
    "description": "Gain Isma's Tear",
    "activateScript": "g.ismasTear = true",
    "position": {
      "x": -806.545408597925,
      "y": -44.62070357745233
    }
  },
  {
    "type": "node",
    "id": "d9b6da28-1688-45fe-ad7e-9af1b9a67e63",
    "parentId": "633e58c7-a610-48dc-9dcb-4d8cdbb09380",
    "name": "KINGDOM'S EDGE",
    "description": "",
    "activateScript": "",
    "position": {
      "x": -433.56892082057306,
      "y": -314.1011568454532
    }
  },
  {
    "type": "route",
    "id": "bca02eb9-1527-4fa7-a5fa-6b7526364e62",
    "position": {
      "x": -497.9770648338358,
      "y": 231.86875296363732
    }
  },
  {
    "type": "route",
    "id": "0249c350-4e17-4552-9a20-e9d65c631338",
    "position": {
      "x": -539.2213484062642,
      "y": 198.26229968239977
    }
  },
  {
    "type": "route",
    "id": "e778265b-2751-4d3f-9814-db3e1e3ddec1",
    "position": {
      "x": -1065.4674938340588,
      "y": 204.55909377292576
    }
  },
  {
    "type": "route",
    "id": "23fd68f0-d375-4e9f-a03c-720d23ea6440",
    "position": {
      "x": -373.7046337426022,
      "y": -194.31529253137188
    }
  },
  {
    "type": "node",
    "id": "c95d303f-ac43-41f2-b17d-61005bfe6c8c",
    "parentId": "633e58c7-a610-48dc-9dcb-4d8cdbb09380",
    "name": "THE HIVE",
    "description": "",
    "activateScript": "",
    "position": {
      "x": -67.37075149463777,
      "y": -88.65198523654966
    }
  },
  {
    "type": "node",
    "id": "33526852-f7a7-4891-a46c-bdf76fec2cfd",
    "parentId": "633e58c7-a610-48dc-9dcb-4d8cdbb09380",
    "name": "COLOSSEUM OF FOOLS",
    "description": "Has Pale Ore",
    "activateScript": "g.paleOre += 1",
    "position": {
      "x": -263.4339858068979,
      "y": -520.644591352784
    }
  },
  {
    "type": "node",
    "id": "b2a67fa7-c175-4496-8479-0322a65024d9",
    "name": "WATCHER'S SPIRE",
    "description": "",
    "activateScript": "",
    "position": {
      "x": -857.4850981515942,
      "y": -468.59961302832966
    }
  },
  {
    "type": "node",
    "id": "ff74fe96-5acd-49d7-ac34-4c051ba94262",
    "name": "👺BOSS: WATCHER",
    "description": "",
    "activateScript": "",
    "position": {
      "x": -762.0090717394719,
      "y": -654.2556276645329
    }
  },
  {
    "type": "node",
    "id": "5dc9325d-3455-4cde-82fe-cce34000c089",
    "name": "RESTING GROUNDS",
    "description": "",
    "activateScript": "",
    "position": {
      "x": -435.65585658853325,
      "y": -798.9953336669869
    }
  },
  {
    "type": "node",
    "id": "6781fbc2-ed9a-4444-8804-c17323fe768b",
    "name": "HOWLING CLIFFS",
    "description": "",
    "activateScript": "",
    "position": {
      "x": -2192.8277849915276,
      "y": -1384.8493297083633
    }
  },
  {
    "type": "node",
    "id": "15e1fda5-6527-48f2-9790-0ff643dc2146",
    "name": "KING'S PASS",
    "description": "",
    "activateScript": "",
    "position": {
      "x": -1891.9691421485472,
      "y": -1384.849329708363
    }
  },
  {
    "type": "node",
    "id": "9314680d-c198-4650-bd14-c053ce8b4439",
    "name": "👺BOSS: XERO",
    "description": "",
    "activateScript": "",
    "position": {
      "x": -171.95956079037455,
      "y": -933.609407778327
    }
  },
  {
    "type": "node",
    "id": "496d0234-2ab4-4c60-a3f8-68167d60c9ed",
    "name": "👺BOSS: REVEK",
    "description": "",
    "activateScript": "",
    "position": {
      "x": -166.33380291069128,
      "y": -788.9801188974279
    }
  },
  {
    "type": "node",
    "id": "3cd04ca1-cbbc-42e3-8d47-800285453f2c",
    "parentId": "633e58c7-a610-48dc-9dcb-4d8cdbb09380",
    "name": "👺BOSS: HARKOTH",
    "description": "",
    "activateScript": "",
    "position": {
      "x": 37.52421587651686,
      "y": -241.05617243017664
    }
  },
  {
    "type": "node",
    "id": "c98c7625-b297-4c15-81f5-8a3afbd2fad8",
    "parentId": "633e58c7-a610-48dc-9dcb-4d8cdbb09380",
    "name": "👺BOSS: HORNET",
    "description": "Gain King's Brand",
    "activateScript": "g.kingsBrand",
    "position": {
      "x": -35.29647579047469,
      "y": -441.7080536498179
    }
  },
  {
    "type": "node",
    "id": "6e789d8e-0ae6-4e68-864d-98e9f3459c09",
    "name": "👺BOSS: GRUZ MOTHER",
    "description": "Rescue Sly",
    "activateScript": "g.foundSly = true\nself.done = true",
    "position": {
      "x": -1016.7344079743876,
      "y": -660.7907232998082
    }
  },
  {
    "type": "node",
    "id": "ce3291b2-36f6-4fc1-becc-ae4e3c73fd49",
    "name": "MANTIS VILLAGE",
    "description": "Gain Mantis Claw",
    "activateScript": "g.mantisClaw = true",
    "position": {
      "x": -1727.762219906652,
      "y": -121.3203871970421
    }
  },
  {
    "type": "node",
    "id": "ca41aa9d-b0fd-4e80-bb6b-498acbdab098",
    "name": "👺👺👺BOSS: MANTIS LORDS",
    "description": "",
    "activateScript": "self.done = true",
    "position": {
      "x": -1839.1892392831696,
      "y": 78.7112499969464
    }
  },
  {
    "type": "node",
    "id": "39b3d7a7-6595-430f-b7ab-3cbd86134fa9",
    "name": "FAILED TRAMWAY",
    "description": "Gain Tram Pass",
    "activateScript": "g.tramPass = true",
    "position": {
      "x": -2517.86386447514,
      "y": 317.27069399606603
    }
  },
  {
    "type": "node",
    "id": "82961aca-38e1-428a-92fd-222472172ff0",
    "name": "BUY LUMAFLY LANTERN",
    "description": "",
    "activateScript": "g.lumaflyLantern = true",
    "position": {
      "x": -1586.4248201423939,
      "y": -1592.6703640416206
    }
  },
  {
    "type": "node",
    "id": "eaa0b284-c156-4c86-85dd-9b8eef4fdec9",
    "name": "BUY SIMPLE KEY",
    "description": "",
    "activateScript": "g.simpleKey += 1",
    "position": {
      "x": -1396.3869313799962,
      "y": -1595.6798654023212
    }
  },
  {
    "type": "node",
    "id": "184e70ed-77ef-4e65-b2b1-d8d7cccb26ed",
    "name": "👺BOSS: GORB",
    "description": "",
    "activateScript": "",
    "position": {
      "x": -2241.0348953526914,
      "y": -1549.5799861472299
    }
  },
  {
    "type": "node",
    "id": "58e13fd5-dccf-4f0f-b36a-9f328af38b1e",
    "name": "👺BOSS: GALIEN",
    "description": "",
    "activateScript": "",
    "position": {
      "x": -2184.0470022229883,
      "y": 428.58358768771524
    }
  },
  {
    "type": "node",
    "id": "19bc1ec4-19ff-421e-a9df-7b58462de223",
    "name": "DISTANT VILLAGE",
    "description": "",
    "activateScript": "",
    "position": {
      "x": -2842.5948043781877,
      "y": 176.0833941152551
    }
  },
  {
    "type": "node",
    "id": "eb247d1e-4776-469b-beeb-cd80246a9a7d",
    "name": "BEAST'S DEN",
    "description": "",
    "activateScript": "",
    "position": {
      "x": -2851.1252163232066,
      "y": -131.01143590530455
    }
  },
  {
    "type": "node",
    "id": "396a1ec3-2d03-4432-9bb3-a42c1bf5d7a6",
    "name": "👺BOSS: DREAMER HERRAH",
    "description": "",
    "activateScript": "",
    "position": {
      "x": -2852.8312987122094,
      "y": -334.03524019667464
    }
  },
  {
    "type": "node",
    "id": "cf498501-9fe0-41d8-925b-29dd1826c712",
    "name": "👺BOSS: BROKEN VESSEL",
    "description": "Gain Monarch Wings",
    "activateScript": "g.monarchWings = true",
    "position": {
      "x": -1548.3476966361086,
      "y": 416.97549718845215
    }
  },
  {
    "type": "edge",
    "sourceId": "5dc9325d-3455-4cde-82fe-cce34000c089",
    "targetId": "d9b6da28-1688-45fe-ad7e-9af1b9a67e63",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "cf498501-9fe0-41d8-925b-29dd1826c712",
    "targetId": "d5fbcb65-7873-4859-8fd2-345f581a0fd1",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "a5ba2a9a-6e4b-453b-8fd0-27c6c1b804c8",
    "targetId": "0451afcc-ba63-4fa0-b892-581ae45ec302",
    "weight": 1,
    "label": ""
  },
  {
    "type": "edge",
    "sourceId": "0451afcc-ba63-4fa0-b892-581ae45ec302",
    "targetId": "264dac8a-34c2-4819-a323-68b93377c277",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "264dac8a-34c2-4819-a323-68b93377c277",
    "targetId": "7ea4ad57-3682-4fcd-8ca6-868018f231e1",
    "weight": 0,
    "weightScript": "!g.cityCrest"
  },
  {
    "type": "edge",
    "sourceId": "264dac8a-34c2-4819-a323-68b93377c277",
    "targetId": "9fb6cb12-eb57-44b3-84de-8490f0ad29a9",
    "weight": 1,
    "weightScript": "g.vengefulSpirit",
    "label": "Requires Vengeful Spirit"
  },
  {
    "type": "edge",
    "sourceId": "264dac8a-34c2-4819-a323-68b93377c277",
    "targetId": "d96e03df-24c0-4400-ab3d-d26760b59fe2",
    "weight": 0,
    "weightScript": "!g.vengefulSpirit",
    "label": ""
  },
  {
    "type": "edge",
    "sourceId": "264dac8a-34c2-4819-a323-68b93377c277",
    "targetId": "9c8a79ff-2c86-444c-a1e4-45f70fc1cfa6",
    "weight": 0,
    "weightScript": "g.lantern",
    "label": "Requires Lumafly Lantern"
  },
  {
    "type": "edge",
    "sourceId": "264dac8a-34c2-4819-a323-68b93377c277",
    "targetId": "9c8a79ff-2c86-444c-a1e4-45f70fc1cfa6",
    "weight": 0,
    "weightScript": "g.desolateDive && g.mothwingCloak",
    "label": "Requires Desolate Dive & Mothwing Cloak"
  },
  {
    "type": "edge",
    "sourceId": "9c8a79ff-2c86-444c-a1e4-45f70fc1cfa6",
    "targetId": "a51e8cf7-e44f-4cfc-b2c8-bf950a693e91",
    "weight": 0,
    "weightScript": "g.monarchWings",
    "label": "Requires Monarch wings"
  },
  {
    "type": "edge",
    "sourceId": "a51e8cf7-e44f-4cfc-b2c8-bf950a693e91",
    "targetId": "0451afcc-ba63-4fa0-b892-581ae45ec302",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "7ea4ad57-3682-4fcd-8ca6-868018f231e1",
    "targetId": "264dac8a-34c2-4819-a323-68b93377c277",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "d96e03df-24c0-4400-ab3d-d26760b59fe2",
    "targetId": "264dac8a-34c2-4819-a323-68b93377c277",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "384eb72d-2bb3-4d1f-9aad-359efce6622d",
    "targetId": "9c8a79ff-2c86-444c-a1e4-45f70fc1cfa6",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "9c8a79ff-2c86-444c-a1e4-45f70fc1cfa6",
    "targetId": "384eb72d-2bb3-4d1f-9aad-359efce6622d",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "9c8a79ff-2c86-444c-a1e4-45f70fc1cfa6",
    "targetId": "264dac8a-34c2-4819-a323-68b93377c277",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "9fb6cb12-eb57-44b3-84de-8490f0ad29a9",
    "targetId": "6ab3f65d-9417-40c0-bd11-c3b5cc1a7640",
    "weight": 1,
    "weightScript": null,
    "label": ""
  },
  {
    "type": "edge",
    "sourceId": "6ab3f65d-9417-40c0-bd11-c3b5cc1a7640",
    "targetId": "9fb6cb12-eb57-44b3-84de-8490f0ad29a9",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "9fb6cb12-eb57-44b3-84de-8490f0ad29a9",
    "targetId": "264dac8a-34c2-4819-a323-68b93377c277",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "0451afcc-ba63-4fa0-b892-581ae45ec302",
    "targetId": "42423985-3a9a-47b1-8566-f40d83ac825d",
    "weight": 1,
    "weightScript": "g.foundSly"
  },
  {
    "type": "edge",
    "sourceId": "42423985-3a9a-47b1-8566-f40d83ac825d",
    "targetId": "0451afcc-ba63-4fa0-b892-581ae45ec302",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "6dad4e55-c772-4c68-b73b-fc7d42a613f1",
    "targetId": "0451afcc-ba63-4fa0-b892-581ae45ec302",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "0451afcc-ba63-4fa0-b892-581ae45ec302",
    "targetId": "6dad4e55-c772-4c68-b73b-fc7d42a613f1",
    "weight": 1,
    "weightScript": "g.foundMapmaker"
  },
  {
    "type": "edge",
    "sourceId": "6ab3f65d-9417-40c0-bd11-c3b5cc1a7640",
    "targetId": "e9fbb775-c9a8-43a5-8d5c-d31509e71b45",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "e9fbb775-c9a8-43a5-8d5c-d31509e71b45",
    "targetId": "6ab3f65d-9417-40c0-bd11-c3b5cc1a7640",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "e9fbb775-c9a8-43a5-8d5c-d31509e71b45",
    "targetId": "3cb29816-001b-4d14-88a4-808db67e7653",
    "weight": 0,
    "weightScript": "g.ismasTears",
    "label": "Requires Isma's Tears"
  },
  {
    "type": "edge",
    "sourceId": "3cb29816-001b-4d14-88a4-808db67e7653",
    "targetId": "e9fbb775-c9a8-43a5-8d5c-d31509e71b45",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "e771ff15-87b4-4776-ac57-852c334748e6",
    "targetId": "d2320c83-91e5-4ed7-a12e-3a3c45978336",
    "weight": 0,
    "weightScript": "g.shadeCloak",
    "label": "Requires Shade Cloak"
  },
  {
    "type": "edge",
    "sourceId": "d28532c2-bcea-4c37-95e1-aad99e10f05d",
    "targetId": "d2320c83-91e5-4ed7-a12e-3a3c45978336",
    "weight": 0,
    "weightScript": "g.ismasTears",
    "label": "Requires Isma's Tears"
  },
  {
    "type": "edge",
    "sourceId": "11a5aae6-fbc0-4737-9c07-0ef7959c8e15",
    "targetId": "d2320c83-91e5-4ed7-a12e-3a3c45978336",
    "weight": 1,
    "weightScript": "g.mothwingCloak",
    "label": "Requies Mothwing Cloak"
  },
  {
    "type": "edge",
    "sourceId": "d2320c83-91e5-4ed7-a12e-3a3c45978336",
    "targetId": "11a5aae6-fbc0-4737-9c07-0ef7959c8e15",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "d2320c83-91e5-4ed7-a12e-3a3c45978336",
    "targetId": "d28532c2-bcea-4c37-95e1-aad99e10f05d",
    "weight": 0,
    "weightScript": "g.ismasTears",
    "label": "Requires Isma's Tears"
  },
  {
    "type": "edge",
    "sourceId": "d28532c2-bcea-4c37-95e1-aad99e10f05d",
    "targetId": "e771ff15-87b4-4776-ac57-852c334748e6",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "d2320c83-91e5-4ed7-a12e-3a3c45978336",
    "targetId": "e771ff15-87b4-4776-ac57-852c334748e6",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "9fb6cb12-eb57-44b3-84de-8490f0ad29a9",
    "targetId": "3b0b7f78-c9db-4866-9d84-e41e30fd9afb",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "3b0b7f78-c9db-4866-9d84-e41e30fd9afb",
    "targetId": "9fb6cb12-eb57-44b3-84de-8490f0ad29a9",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "3b0b7f78-c9db-4866-9d84-e41e30fd9afb",
    "targetId": "d28532c2-bcea-4c37-95e1-aad99e10f05d",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "d28532c2-bcea-4c37-95e1-aad99e10f05d",
    "targetId": "3b0b7f78-c9db-4866-9d84-e41e30fd9afb",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "d2320c83-91e5-4ed7-a12e-3a3c45978336",
    "targetId": "ecdf64ec-5824-4ba5-ae62-b3247080cd6a",
    "weight": 0,
    "weightScript": "g.visitedQueensGarden && g.visitedStoneSanctuary"
  },
  {
    "type": "edge",
    "sourceId": "ecdf64ec-5824-4ba5-ae62-b3247080cd6a",
    "targetId": "3b0b7f78-c9db-4866-9d84-e41e30fd9afb",
    "weight": 1,
    "weightScript": null
  },
  {
    "type": "edge",
    "sourceId": "3b0b7f78-c9db-4866-9d84-e41e30fd9afb",
    "targetId": "ecdf64ec-5824-4ba5-ae62-b3247080cd6a",
    "weight": 0,
    "weightScript": "g.visitedQueensGarden && g.visitedStoneSanctuary && g.mothwingCloak && g.mantisClaw",
    "label": "Requires Mothwing Cloak & Mantis Claw"
  },
  {
    "type": "edge",
    "sourceId": "ecdf64ec-5824-4ba5-ae62-b3247080cd6a",
    "targetId": "d2320c83-91e5-4ed7-a12e-3a3c45978336",
    "weight": 1,
    "weightScript": null
  },
  {
    "type": "edge",
    "sourceId": "e771ff15-87b4-4776-ac57-852c334748e6",
    "targetId": "d28532c2-bcea-4c37-95e1-aad99e10f05d",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "264dac8a-34c2-4819-a323-68b93377c277",
    "targetId": "d28532c2-bcea-4c37-95e1-aad99e10f05d",
    "weight": 0,
    "weightScript": "g.ismaTears",
    "label": "Requires Isma's Tears"
  },
  {
    "type": "edge",
    "sourceId": "d28532c2-bcea-4c37-95e1-aad99e10f05d",
    "targetId": "c067f8ae-ab70-4c72-bf54-6b864bb3adaf",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "264dac8a-34c2-4819-a323-68b93377c277",
    "targetId": "c067f8ae-ab70-4c72-bf54-6b864bb3adaf",
    "weight": 1,
    "weightScript": "g.mothwingCloak",
    "label": "Requires Mothwing Cloak"
  },
  {
    "type": "edge",
    "sourceId": "c067f8ae-ab70-4c72-bf54-6b864bb3adaf",
    "targetId": "66514992-ea86-4bee-be26-68084159f75f",
    "weight": 1,
    "weightScript": "g.mantisClaw && g.cityCrest",
    "label": "Requires Matis Claw & City Crest "
  },
  {
    "type": "edge",
    "sourceId": "c067f8ae-ab70-4c72-bf54-6b864bb3adaf",
    "targetId": "264dac8a-34c2-4819-a323-68b93377c277",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "66514992-ea86-4bee-be26-68084159f75f",
    "targetId": "f1684edb-2461-44fe-968e-4cb5e132902b",
    "weight": 0,
    "weightScript": "g.simpleKey > 0",
    "label": "Needs key"
  },
  {
    "type": "edge",
    "sourceId": "f1684edb-2461-44fe-968e-4cb5e132902b",
    "targetId": "c067f8ae-ab70-4c72-bf54-6b864bb3adaf",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "66514992-ea86-4bee-be26-68084159f75f",
    "targetId": "c067f8ae-ab70-4c72-bf54-6b864bb3adaf",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "264dac8a-34c2-4819-a323-68b93377c277",
    "targetId": "0451afcc-ba63-4fa0-b892-581ae45ec302",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "66514992-ea86-4bee-be26-68084159f75f",
    "targetId": "d5fbcb65-7873-4859-8fd2-345f581a0fd1",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "d5fbcb65-7873-4859-8fd2-345f581a0fd1",
    "targetId": "11a5aae6-fbc0-4737-9c07-0ef7959c8e15",
    "weight": 0,
    "weightScript": "g.tramPass",
    "label": "tramway"
  },
  {
    "type": "edge",
    "sourceId": "11a5aae6-fbc0-4737-9c07-0ef7959c8e15",
    "targetId": "d5fbcb65-7873-4859-8fd2-345f581a0fd1",
    "weight": 0,
    "weightScript": "g.tramPass",
    "label": "tramway"
  },
  {
    "type": "edge",
    "sourceId": "d5fbcb65-7873-4859-8fd2-345f581a0fd1",
    "targetId": "65113f6b-cf76-4b00-91ad-51d187bf60fe",
    "weight": 0,
    "weightScript": "g.kingsBrand",
    "label": "Requires King's Brand"
  },
  {
    "type": "edge",
    "sourceId": "65113f6b-cf76-4b00-91ad-51d187bf60fe",
    "targetId": "d5fbcb65-7873-4859-8fd2-345f581a0fd1",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "66514992-ea86-4bee-be26-68084159f75f",
    "targetId": "e97708eb-fe88-44c9-b96d-0585325ff931",
    "weight": 0,
    "weightScript": "g.crystalHeart",
    "label": "Requires Crystal Heart"
  },
  {
    "type": "edge",
    "sourceId": "66514992-ea86-4bee-be26-68084159f75f",
    "targetId": "d9b6da28-1688-45fe-ad7e-9af1b9a67e63",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "d9b6da28-1688-45fe-ad7e-9af1b9a67e63",
    "targetId": "66514992-ea86-4bee-be26-68084159f75f",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "e97708eb-fe88-44c9-b96d-0585325ff931",
    "targetId": "66514992-ea86-4bee-be26-68084159f75f",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "e97708eb-fe88-44c9-b96d-0585325ff931",
    "targetId": "d9b6da28-1688-45fe-ad7e-9af1b9a67e63",
    "weight": 0,
    "weightScript": "g.crystalHeart",
    "label": "Requires Crystal Heart"
  },
  {
    "type": "edge",
    "sourceId": "23fd68f0-d375-4e9f-a03c-720d23ea6440",
    "targetId": "d9b6da28-1688-45fe-ad7e-9af1b9a67e63",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "d5fbcb65-7873-4859-8fd2-345f581a0fd1",
    "targetId": "bca02eb9-1527-4fa7-a5fa-6b7526364e62",
    "weight": 0,
    "weightScript": "g.tramPass",
    "label": "tramway"
  },
  {
    "type": "edge",
    "sourceId": "e778265b-2751-4d3f-9814-db3e1e3ddec1",
    "targetId": "d5fbcb65-7873-4859-8fd2-345f581a0fd1",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "d9b6da28-1688-45fe-ad7e-9af1b9a67e63",
    "targetId": "0249c350-4e17-4552-9a20-e9d65c631338",
    "weight": 0,
    "weightScript": "g.tramPass"
  },
  {
    "type": "edge",
    "sourceId": "0249c350-4e17-4552-9a20-e9d65c631338",
    "targetId": "e778265b-2751-4d3f-9814-db3e1e3ddec1",
    "weight": 0,
    "weightScript": "g.tramPass",
    "label": "tramway"
  },
  {
    "type": "edge",
    "sourceId": "bca02eb9-1527-4fa7-a5fa-6b7526364e62",
    "targetId": "23fd68f0-d375-4e9f-a03c-720d23ea6440",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "d9b6da28-1688-45fe-ad7e-9af1b9a67e63",
    "targetId": "c95d303f-ac43-41f2-b17d-61005bfe6c8c",
    "weight": 0,
    "weightScript": "g.monarchWings",
    "label": "Require's Monarch Wings"
  },
  {
    "type": "edge",
    "sourceId": "c95d303f-ac43-41f2-b17d-61005bfe6c8c",
    "targetId": "d9b6da28-1688-45fe-ad7e-9af1b9a67e63",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "d9b6da28-1688-45fe-ad7e-9af1b9a67e63",
    "targetId": "33526852-f7a7-4891-a46c-bdf76fec2cfd",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "33526852-f7a7-4891-a46c-bdf76fec2cfd",
    "targetId": "d9b6da28-1688-45fe-ad7e-9af1b9a67e63",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "66514992-ea86-4bee-be26-68084159f75f",
    "targetId": "b2a67fa7-c175-4496-8479-0322a65024d9",
    "weight": 0,
    "weightScript": "g.monarchWings",
    "label": "Requires Monarch Wings"
  },
  {
    "type": "edge",
    "sourceId": "b2a67fa7-c175-4496-8479-0322a65024d9",
    "targetId": "66514992-ea86-4bee-be26-68084159f75f",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "b2a67fa7-c175-4496-8479-0322a65024d9",
    "targetId": "ff74fe96-5acd-49d7-ac34-4c051ba94262",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "ff74fe96-5acd-49d7-ac34-4c051ba94262",
    "targetId": "b2a67fa7-c175-4496-8479-0322a65024d9",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "5dc9325d-3455-4cde-82fe-cce34000c089",
    "targetId": "264dac8a-34c2-4819-a323-68b93377c277",
    "weight": 0,
    "weightScript": "g.tramPass",
    "label": "Tramway"
  },
  {
    "type": "edge",
    "sourceId": "264dac8a-34c2-4819-a323-68b93377c277",
    "targetId": "5dc9325d-3455-4cde-82fe-cce34000c089",
    "weight": 0,
    "weightScript": "g.tramPass",
    "label": "Tramway"
  },
  {
    "type": "edge",
    "sourceId": "6ab3f65d-9417-40c0-bd11-c3b5cc1a7640",
    "targetId": "6781fbc2-ed9a-4444-8804-c17323fe768b",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "6781fbc2-ed9a-4444-8804-c17323fe768b",
    "targetId": "6ab3f65d-9417-40c0-bd11-c3b5cc1a7640",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "6781fbc2-ed9a-4444-8804-c17323fe768b",
    "targetId": "15e1fda5-6527-48f2-9790-0ff643dc2146",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "15e1fda5-6527-48f2-9790-0ff643dc2146",
    "targetId": "6781fbc2-ed9a-4444-8804-c17323fe768b",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "15e1fda5-6527-48f2-9790-0ff643dc2146",
    "targetId": "a5ba2a9a-6e4b-453b-8fd0-27c6c1b804c8",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "5dc9325d-3455-4cde-82fe-cce34000c089",
    "targetId": "9314680d-c198-4650-bd14-c053ce8b4439",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "9314680d-c198-4650-bd14-c053ce8b4439",
    "targetId": "5dc9325d-3455-4cde-82fe-cce34000c089",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "5dc9325d-3455-4cde-82fe-cce34000c089",
    "targetId": "496d0234-2ab4-4c60-a3f8-68167d60c9ed",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "496d0234-2ab4-4c60-a3f8-68167d60c9ed",
    "targetId": "5dc9325d-3455-4cde-82fe-cce34000c089",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "d9b6da28-1688-45fe-ad7e-9af1b9a67e63",
    "targetId": "3cd04ca1-cbbc-42e3-8d47-800285453f2c",
    "weight": 0,
    "weightScript": "g.shadeCloak",
    "label": "Requires Shade Cloak"
  },
  {
    "type": "edge",
    "sourceId": "3cd04ca1-cbbc-42e3-8d47-800285453f2c",
    "targetId": "d9b6da28-1688-45fe-ad7e-9af1b9a67e63",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "d9b6da28-1688-45fe-ad7e-9af1b9a67e63",
    "targetId": "c98c7625-b297-4c15-81f5-8a3afbd2fad8",
    "weight": 0,
    "weightScript": "g.monarchWings",
    "label": "Requires Monarch Wings"
  },
  {
    "type": "edge",
    "sourceId": "c98c7625-b297-4c15-81f5-8a3afbd2fad8",
    "targetId": "d9b6da28-1688-45fe-ad7e-9af1b9a67e63",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "264dac8a-34c2-4819-a323-68b93377c277",
    "targetId": "6e789d8e-0ae6-4e68-864d-98e9f3459c09",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "6e789d8e-0ae6-4e68-864d-98e9f3459c09",
    "targetId": "264dac8a-34c2-4819-a323-68b93377c277",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "c067f8ae-ab70-4c72-bf54-6b864bb3adaf",
    "targetId": "ce3291b2-36f6-4fc1-becc-ae4e3c73fd49",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "ce3291b2-36f6-4fc1-becc-ae4e3c73fd49",
    "targetId": "c067f8ae-ab70-4c72-bf54-6b864bb3adaf",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "ce3291b2-36f6-4fc1-becc-ae4e3c73fd49",
    "targetId": "ca41aa9d-b0fd-4e80-bb6b-498acbdab098",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "ca41aa9d-b0fd-4e80-bb6b-498acbdab098",
    "targetId": "ce3291b2-36f6-4fc1-becc-ae4e3c73fd49",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "66514992-ea86-4bee-be26-68084159f75f",
    "targetId": "264dac8a-34c2-4819-a323-68b93377c277",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "f1684edb-2461-44fe-968e-4cb5e132902b",
    "targetId": "66514992-ea86-4bee-be26-68084159f75f",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "d5fbcb65-7873-4859-8fd2-345f581a0fd1",
    "targetId": "66514992-ea86-4bee-be26-68084159f75f",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "11a5aae6-fbc0-4737-9c07-0ef7959c8e15",
    "targetId": "39b3d7a7-6595-430f-b7ab-3cbd86134fa9",
    "weight": 0,
    "weightScript": "g.lumaflyLantern",
    "label": "Requires Lumafly Lantern"
  },
  {
    "type": "edge",
    "sourceId": "39b3d7a7-6595-430f-b7ab-3cbd86134fa9",
    "targetId": "11a5aae6-fbc0-4737-9c07-0ef7959c8e15",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "42423985-3a9a-47b1-8566-f40d83ac825d",
    "targetId": "82961aca-38e1-428a-92fd-222472172ff0",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "82961aca-38e1-428a-92fd-222472172ff0",
    "targetId": "42423985-3a9a-47b1-8566-f40d83ac825d",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "42423985-3a9a-47b1-8566-f40d83ac825d",
    "targetId": "eaa0b284-c156-4c86-85dd-9b8eef4fdec9",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "eaa0b284-c156-4c86-85dd-9b8eef4fdec9",
    "targetId": "42423985-3a9a-47b1-8566-f40d83ac825d",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "184e70ed-77ef-4e65-b2b1-d8d7cccb26ed",
    "targetId": "6781fbc2-ed9a-4444-8804-c17323fe768b",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "6781fbc2-ed9a-4444-8804-c17323fe768b",
    "targetId": "184e70ed-77ef-4e65-b2b1-d8d7cccb26ed",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "11a5aae6-fbc0-4737-9c07-0ef7959c8e15",
    "targetId": "58e13fd5-dccf-4f0f-b36a-9f328af38b1e",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "58e13fd5-dccf-4f0f-b36a-9f328af38b1e",
    "targetId": "11a5aae6-fbc0-4737-9c07-0ef7959c8e15",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "11a5aae6-fbc0-4737-9c07-0ef7959c8e15",
    "targetId": "19bc1ec4-19ff-421e-a9df-7b58462de223",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "19bc1ec4-19ff-421e-a9df-7b58462de223",
    "targetId": "eb247d1e-4776-469b-beeb-cd80246a9a7d",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "eb247d1e-4776-469b-beeb-cd80246a9a7d",
    "targetId": "19bc1ec4-19ff-421e-a9df-7b58462de223",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "19bc1ec4-19ff-421e-a9df-7b58462de223",
    "targetId": "11a5aae6-fbc0-4737-9c07-0ef7959c8e15",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "eb247d1e-4776-469b-beeb-cd80246a9a7d",
    "targetId": "396a1ec3-2d03-4432-9bb3-a42c1bf5d7a6",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "396a1ec3-2d03-4432-9bb3-a42c1bf5d7a6",
    "targetId": "eb247d1e-4776-469b-beeb-cd80246a9a7d",
    "weight": 1
  },
  {
    "type": "edge",
    "sourceId": "d5fbcb65-7873-4859-8fd2-345f581a0fd1",
    "targetId": "cf498501-9fe0-41d8-925b-29dd1826c712",
    "weight": 1
  }
]);