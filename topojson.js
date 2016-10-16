'use strict';

var util = require('util');
var fs = require('fs');
var topojson = require('topojson');
var world = require('./data/world.json');

var geoAruba = {
  'type':'FeatureCollection',
  'features':[{
    'type':'Feature',
    'properties':{'ADMIN':'Aruba','ISO_A3':'ABW'},
    'geometry':{
      'type':'Polygon',
      'coordinates':[[
        [-69.996937628999916,12.577582098000036],
        [-69.936390753999945,12.531724351000051],
        [-69.924672003999945,12.519232489000046],
        [-69.915760870999918,12.497015692000076],
        [-69.880197719999842,12.453558661000045],
        [-69.876820441999939,12.427394924000097],
        [-69.888091600999928,12.417669989000046],
        [-69.908802863999938,12.417792059000107],
        [-69.930531378999888,12.425970770000035],
        [-69.945139126999919,12.44037506700009],
        [-69.924672003999945,12.44037506700009],
        [-69.924672003999945,12.447211005000014],
        [-69.958566860999923,12.463202216000099],
        [-70.027658657999922,12.522935289000088],
        [-70.048085089999887,12.531154690000079],
        [-70.058094855999883,12.537176825000088],
        [-70.062408006999874,12.546820380000057],
        [-70.060373501999948,12.556952216000113],
        [-70.051096157999893,12.574042059000064],
        [-70.048736131999931,12.583726304000024],
        [-70.052642381999931,12.600002346000053],
        [-70.059641079999921,12.614243882000054],
        [-70.061105923999975,12.625392971000068],
        [-70.048736131999931,12.632147528000104],
        [-70.00715084499987,12.5855166690001],
        [-69.996937628999916,12.577582098000036]
      ]]
    }
  }]
};

// topojson.topology({collection:geoAruba});
var topoAruba = {
  type:'Topology',
  objects:{
    collection:{
      type:'GeometryCollection',
      geometries:[{type:'Polygon',arcs:[[0]]}]
    }
  },
  arcs:[[
    [3527,7455],
    [3262,-2138],
    [632,-582],
    [480,-1036],
    [1916,-2026],
    [182,-1220],
    [-607,-453],
    [-1116,6],
    [-1171,381],
    [-787,672],
    [1103,0],
    [0,318],
    [-1826,746],
    [-3723,2784],
    [-1100,384],
    [-540,280],
    [-232,450],
    [110,472],
    [499,797],
    [128,452],
    [-211,758],
    [-377,664],
    [-79,520],
    [667,315],
    [2240,-2174],
    [550,-370]
  ]],
  transform:{
    scale:[0.000018560612561249607,0.00002144989888989474],
    translate:[-70.06240800699987,12.417669989000046]},
  bbox:[
    -70.06240800699987,
    12.417669989000046,
    -69.87682044199994,
    12.632147528000104
  ]
};

// var writeFile = topojson.topology({collection:world});

var writeFile = topojson.simplify(
  topojson.topology(
    {collection:world},
    {
      'property-transform':(obj) => obj.properties
    }
  ),
  {'minimum-area':1,'coordinate-system':'spherical'}
);
// console.log(topojson.feature(topoAruba,topoAruba.objects.collection));

// console.log(Math.random());
// console.log(require('util').inspect(simpleTopoAruba,{depth:null}));


fs.writeFileSync(
  __dirname+'/data/simple_topo_world.json',
  JSON.stringify(writeFile,null,'\t'),
  {encoding:'utf-8'}
);

fs.writeFileSync(
  __dirname+'/data/simple_geo_world.json',
  JSON.stringify(topojson.feature(writeFile,writeFile.objects.collection),null,'\t'),
  {encoding:'utf-8'}
);

console.log('done');