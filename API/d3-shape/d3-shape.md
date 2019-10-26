# d3-shape

- Source: https://github.com/d3/d3-shape
- Observable: https://observablehq.com/collection/@d3/d3-shape
- DOM: **no**

This module provides a variety of shape generators for your convenience.

### Lines

Lines are the building blocks of most shapes.

```js
var points = [
  [0, 0],
  [100, 100],
  [200, 100],
  [300, 50]
];

d3.line()(points) // M0, 0L100, 100L200, 100
```

The output draw can be used inside path element:

```html
<svg width="600" height="300">
  <path stroke="black" fill="none" d="M0,0L100,100L200,100"></path>
</svg>
```

The above data points are overly simplified, especially since they are nicely
proportional to the SVG width and height. Let's generalise it using scales.

```js
var svgArea = { width: 400, height: 200 };
var points = [ 0, 5, 7, 4, 2, 6, 10, 7, 8, 4];
var pointMax = d3.max(points);

var xScale = d3.scaleLinear()
  .domain([0, points.length - 1])
  .range([0, svgArea['width']]);

var yScale = d3.scaleLinear()
  .domain([0, points.length])
  .range([svgArea['height'], 0]);

var dPath = d3.line()
  .x((d, i) => xScale(i))
  .y((d, i) => yScale(d))
(points);
```

![line](/images/line.png)

### Areas

As code as above but instead of `.line()` use `.area()`. Notice we just need
one path element where the drawn attribue `d` is enough to perform the drawing.

```js
var area = d3.area()
  .x((d, i) => xScale(i))
  .y0(yScale(0))
  .y1((d, i) => yScale(d));

var dPath = area(points);

svg.append('path')
  .datum(points)
  .attr('fill', 'steelblue')
  .attr('d', dPath);
```

![area](/images/area.png)

### Stacks

To understand stacks its important to understand the data structure returned by
the **d3.stack()** function.

```js
var data = [
  { a: 20, b: 80 },
  { a: 50, b: 50 },
  { a: 40, b: 60 },
];

var stack = d3.stack().keys(['a', 'b'])(data);

/*
  [
    [
      [0, 20],
      [0, 50],
      [0, 40]
    ],
    [
      [20, 100],
      [50, 100],
      [40, 100]
    ]
  ]
*/

var area = d3.area()
  .x((d, i) => xScale(i))
  .y0(d => yScale(d[0]))
  .y1(d => yScale(d[1]));

svg.append('g')
  .selectAll('path')
  .data(stack)
  .join('path')
    .attr('fill', (d) => colors[d.key])
    .attr('d', area);
```

![area](/images/stacked-area.png)
