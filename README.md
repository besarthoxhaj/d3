## Geo

What's the difference between [TopoJSON](https://github.com/mbostock/topojson/wiki) and [GeoJSON](http://geojson.org/)?
> If you care about file size or topology, then use TopoJSON. If you don’t care about either, then use GeoJSON for simplicity’s sake.

What's topology? Is the same as topography?

> Topology (from the Greek τόπος, “place”, and λόγος, “study”) is a major area of mathematics concerned with spatial properties that are preserved under continuous deformations of objects, for example, deformations that involve stretching, but no tearing or gluing. It emerged through the development of concepts from geometry and set theory, such as space, dimension, and transformation.

more...

> [...] in the world of topology, a doughnut and coffee cup are the same, since both are three dimensional objects with a hole going through them. Similarly, two adjacent polygons that share a common border will still share a common border even if the border is bent or distorted.

On topography:

> From the Greek τόπος (topos, "place") and -γραφία (-graphia, "writing"). Topography is the study of the shape and features of the surface of the Earth and other observable astronomical objects including planets, moons, and asteroids. The topography of an area could refer to the surface shapes and features themselves, or a description (especially their depiction in maps).

## Links

[Cartograms with d3 & TopoJSON](http://prag.ma/code/d3-cartogram/#popchange/2011) with [cartogram.js](http://prag.ma/code/d3-cartogram/cartogram.js).
![us-by-population-growth](/images/carto.png)

## Tools

[GDAL - Geospatial Data Abstraction Library](http://www.gdal.org/index.html)
> GDAL is a translator library for raster and vector geospatial data formats that is released under an X/MIT style Open Source license by the Open Source Geospatial Foundation.

## Tutorials

[Interactive Data Visualization for the Web](http://alignedleft.com/tutorials/d3/)

## Concepts

These are some fundamental concepts of D3.

**[Selections](https://github.com/d3/d3/blob/master/API.md#selections-d3-selection)**
```js
d3.selectAll('p').style('color','white');
d3.select('body').style('background-color','black');
```

**Dynamic properties**
> [...] attributes, and other properties can be specified as functions of data in D3, not just simple constants.

```js
d3.selectAll('p').style('color', () => `hsl(${Math.random()*360},100%,50%)`);

/**
 * Callback passed for each data point.
 * @param  {Void} bound data; in this case undefined
 * @param  {Number} index
 * @return {Any} color in this instance
 */
const simpleCallback = (d,i) => {
  return i % 2 ? '#fff' : '#eee';
};

d3.selectAll('p').style('color',simpleCallback);

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
> Transitions gradually interpolate styles and attributes over time [...] D3’s interpolators support both primitives, such as numbers and numbers embedded within strings (font sizes, path data, etc.), and compound values. You can even extend D3’s interpolator registry to support complex properties and data structures.

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
