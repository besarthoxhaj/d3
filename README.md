## Data Driven Documents

```sh
$ npm start
```

**Drawing**

D3 makes extensive use of Scalable Vector Graphics (SVG). You can find more at
https://www.w3.org/TR/SVG11/. Worth noting that there are some SVG implementation
version for mobile.

For more about SVG check https://developer.mozilla.org/en-US/docs/Web/SVG.

The coordinate system is this:

![svg-coordinate-system](/images/svg-coordinate-system.png)

```html
  <svg>
  <g>
  <d>
  <path>
  <!-- ... -->
```

**[Position]()**
```
[longitude, latitude, elevation]

longitude https://media1.britannica.com/eb-media/06/64906-004-55117002.jpg
  - are known as medidians (Greenwich)
  - run in a north-south direction
  - measure distance east or west of the prime meridian
  - are farthest apart at the Equator and meet at the poles
  - cross the Equator at right angles
  - lie in planes that pass through the Earth's axis
  - are equal in length
  - are halves of great circles

latitude https://media1.britannica.com/eb-media/07/64907-004-870197D7.jpg
  - are known as parallels
  - run in an east-west direction
  - measure distance north or south from the Equator
  - are parallel to one another and never meet
  - cross the prime meridian at right angles
  - lie in planes that cross the Earth's axis at right angles
  - get shorter toward the poles, with only the Equator, the longest, a great circle
```

**[GeoJSON]()**

GeoJSON always consists of a single object, this object may represents either a
`Geometry`, `Feature` or `Collection of Features`. Let's look at them:

```js
// a Geometry is always:
{
  /*
    [
      'Point',
      'MultiPoint',
      'LineString',
      'MultiLineString',
      'Polygon',
      'MultiPolygon',
      'GeometryCollection'
    ]
   */
  type: @String
  coordinates: @Array
}
```

**[Geometry:Points]()**

```js
// with a single position, we can make the simplest geometry: the point.
{
  'type': 'Point',
  'coordinates': [0, 0]
}
```

**[Geometry:LineStrings]()**

```js
// to represent a line, you’ll need at least two places to connect.
{
  'type': 'LineString',
  'coordinates':[[0, 0], [10, 10]]
}
```

**[Geometry:Polygons]()**

```js
// to represent a line, you’ll need at least two places to connect.
{
  'type':'Polygon',
  'coordinates':[
    [
      [0, 0],
      [10, 10],
      [10, 0],
      [0, 0]
    ]
  ]
}
```

**[Features]()**

```js
// features are this combination of geometry and properties.
{
  'type':'Feature',
  'geometry':@Geometry,
  'properties':@Object|null
}
```

**[Multi Geometries]()**

```js
{
  'type': 'Feature',
  'geometry': {
    'type': 'GeometryCollection',
    'geometries': [{
      'type': 'Point',
      'coordinates': [0, 0]
    }, {
      'type': 'LineString',
      'coordinates': [
        [0,0],
        [1,0]
      ]
    }]
  },
  'properties': {
    'name': 'null island'
  }
}
```

**[FeatureCollection]()**
```js
{
  'type': 'FeatureCollection',
  'features': [@Feature]
}
```

**[Projections]()**

Projections are function who maps spherical coordinates to one another set of
coordinates in a two dimensional plane (projected coordinates).

```js
// Albers projection
var albersProj = d3.geoAlbers();
var london = [‎-0.118092,‎ 51.509865];
albersProj(london); // [1447.4743359084398, -518.063483693071]
```

**[Paths](https://github.com/d3/d3-path)**

It's a function that returns a path. Check it out:

```js
// https://d3js.org/d3-path.v1.min.js

var geoJson = {
  'type':'FeatureCollection',
  'features':[{
    'type':'Feature',
    'properties':null,
    'geometry':{
      'type':'Polygon',
      'coordinates':[
        [
          [0, 0],
          [50, 50],
          [50, 0],
          [0, 0]
        ]
      ]
    }
  }]
};
var path = d3.geoPath();
var pathString = path(geoJson); // 'M0,0L50,50L50,0Z'

// view it
d3.select('body')
  .append('svg')
    .attr('width', 200)
    .attr('height', 200)
  .append('path')
    .attr('d', pathString);
```

**[Geo Paths]()**

```js
var renderPath = d3.getPath()
  .projection(d3.geoAlbers());
```

**[Put it together]()**

```js
d3.select('body')
  .append('svg')
    .attr('width',width)
    .attr('height',height)
  .append('g')
    .selectAll('path')
    .data(/* GeoJSON */)
    .enter()
    .append('path')
      .attr('fill','#ccc')
      .attr('d',d3.getPath().projection(d3.geoAlbers()))
```

## Super simple examples

```js
var line = {
  'type': 'LineString',
  'coordinates': [
    [-4.1397, 50.3706],
    [-43.2436, -22.9083],
    [-67.2717, -55.9797],
    [-149.4500, -17.6667],
    [172.1936, -41.4395],
    [151.1667, -34],
    [147.70, -18.3],
    [106.7, -6],
    [18.4719, -34.3],
    [-5, -15],
    [-25.6, 37.7],
    [-4.1397, 50.3706]
  ]
};
```

## Links

[Cartograms with d3 & TopoJSON](http://prag.ma/code/d3-cartogram/#popchange/2011) with [cartogram.js](http://prag.ma/code/d3-cartogram/cartogram.js).
![us-by-population-growth](/images/carto.png)
[Tutorial from Maptime Seattle](http://maptimesea.github.io/2015/01/07/d3-mapping.html)

## Tools

[GDAL - Geospatial Data Abstraction Library](http://www.gdal.org/index.html)
> GDAL is a translator library for raster and vector geospatial data formats
  that is released under an X/MIT style Open Source license by the Open Source
  Geospatial Foundation.

[GeoJSONLint](http://geojsonlint.com/)
https://www.dashingd3js.com/

## Tutorials

[Interactive Data Visualization for the Web](http://alignedleft.com/tutorials/d3/)
[Drawing with GeoJSON](http://mikefowler.me/2014/06/10/drawing-geojson-in-a-canvas/)

## Concepts and APIs

These are some fundamental concepts of D3.

**[Selections](https://github.com/d3/d3/blob/master/API.md#selections-d3-selection)**
```js
d3.selectAll('p').style('color','white');
d3.select('body').style('background-color','black');
```

**Dynamic properties**
> [...] attributes, and other properties can be specified as functions of data
  in D3, not just simple constants.

```js
d3.selectAll('p')
  .style('color', () => `hsl(${Math.random()*360},100%,50%)`);

/**
 * Callback passed for each data point.
 * @param  {Void} bound data; in this case undefined
 * @param  {Number} index
 * @return {Any} color in this instance
 */
const simpleCallback = (d,i) => {
  return i % 2 ? '#fff' : '#eee';
};

d3.selectAll('p')
  .style('color', simpleCallback);

// ------------

/**
 * Callback passed for each data point.
 * @param  {Number} bound data; in this case undefined
 * @param  {Number} index
 * @return {String} color in this instance
 */
const dataCallback = (d,i) => `${d}px`;
d3.selectAll('p')
  .data([4,8,15,16,23,42])
  .style('font-size',dataCallback);
```

- [Thinking with Joins](https://bost.ocks.org/mike/join/)

**Enter and Exit**

```js
d3.select('body')
  .selectAll('p')
  .data([4, 8, 15, 16, 23, 42])
  .enter().append('p')
    .text(d => `I’m number ${d}!`);
```

**[Transitions](https://github.com/d3/d3-transition/blob/master/README.md)**

> Transitions gradually interpolate styles and attributes over time [...] D3’s
  interpolators support both primitives, such as numbers and numbers embedded
  within strings (font sizes, path data, etc.), and compound values. You can
  even extend D3’s interpolator registry to support complex properties and data
  structures.

```js
d3.select('body').transition()
  .duration(1750)
  .style('background-color','black')
  .transition()
  .duration(1750)
  .style('background-color','white')

// or

const bodyElm = d3.select('body');
function animate(elm,color) {
  elm.transition()
    .duration(700)
    .style('background-color',color)
    .on('end',() => animate(elm,(color==='white'?'black':'white')))
}
animate(bodyElm,'black');
```

- [Working with Transitions](https://bost.ocks.org/mike/transition/)
