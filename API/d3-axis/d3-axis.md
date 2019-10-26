# d3-scale

- Source: https://github.com/d3/d3-axis
- Observable: https://observablehq.com/collection/@d3/d3-axis
- DOM: **yes**

```js
var svgArea = { width: 400, height: 100 };
var data = [ 15, 4, 55, 31 ];

var dataMin = d3.min(data);
var dataMax = d3.max(data);

var xScale = d3.scaleLinear()
  .domain([dataMin, dataMax])
  .range([0, svgArea['width']]);

var xAxis = d3.axisBottom(xScale);

d3.select('body').append('svg')
  .attr('width', svgArea['width'])
  .attr('height', svgArea['height'])
.append('g')
  .attr('transform', 'translate(0, 30)')
  .call(xAxis);
```
