# d3-scale

- Source: https://github.com/d3/d3-scale
- Observable: https://observablehq.com/collection/@d3/d3-scale
- DOM: **no**

```js
var svgArea = { width: 400, height: 100 };
var data = [ 15, 4, 55, 31 ];

var dataMin = d3.min(data);
var dataMax = d3.max(data);

var xScale = d3.scaleLinear()
  .domain([dataMin, dataMax])
  .range([0, svgArea['width']]);

xScale(4); //  0
xScale(5); //  7.8
xScale(3); // -7.8

var yScale = d3.scaleLinear()
  .domain([dataMin, dataMax])
  .range([0, svgArea['height']]);

yScale(4); //  0
yScale(5); //  1.9
yScale(3); // -1.9

var attachedKeys = Object.keys(xScale);
console.log(attachedKeys);
/**
 * [
 *  "invert",
 *  "domain",
 *  "range",
 *  "rangeRound",
 *  "clamp",
 *  "interpolate",
 *  "unknown",
 *  "copy",
 *  "ticks",
 *  "tickFormat",
 *  "nice"
 * ]
 */

xScale.domain(); // [4, 55]

xScale.ticks();
/**
 * [
 *  5,
 *  10,
 *  15,
 *  20,
 *  25,
 *  30,
 *  35,
 *  40,
 *  45,
 *  50,
 *  55
 * ]
 */

xScale.ticks(2);
/**
 * [
 *  20,
 *  40
 * ]
 */


```
