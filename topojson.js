'use strict';

var util = require('util');
var fs = require('fs');
var topojson = require('topojson');
var request = require('request');
var world = require('./data/world.json');
var topoWorld = require('./data/topo_world.json');

// request('http://bl.ocks.org/mbostock/raw/4090846/world-50m.json', (err,data) => {
//   fs.writeFileSync(__dirname+'/data/topo_world.json',data.body,{encoding:'utf-8'});
// });

// var writeFile = topojson.topology({collection:world});

var writeFile = topojson.simplify(
  topojson.topology(
    {collection: world},
    {'property-transform': (obj) => obj.properties}
  ),
  {'minimum-area':1,'coordinate-system':'spherical'}
);
// console.log(topojson.feature(topoAruba,topoAruba.objects.collection));

// console.log(Math.random());
// console.log(require('util').inspect(simpleTopoAruba,{depth:null}));

fs.writeFileSync(
  __dirname + '/data/simple_topo_world.json',
  JSON.stringify(writeFile, null, '\t'),
  {encoding: 'utf-8'}
);

fs.writeFileSync(
  __dirname + '/data/simple_geo_world.json',
  JSON.stringify(
    topojson.feature(writeFile,writeFile.objects.collection),
    null,
    '\t'
  ),
  {encoding: 'utf-8'}
);

console.log('done');
