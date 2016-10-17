## Geo and Topo formats

What's the difference between [TopoJSON](https://github.com/mbostock/topojson/wiki) and [GeoJSON](http://geojson.org/)?
> If you care about file size or topology, then use TopoJSON. If you don’t care about either, then use GeoJSON for simplicity’s sake.

What's [topology](https://en.wikipedia.org/wiki/Topology)? Is the same as [topography](https://en.wikipedia.org/wiki/Topography)?

> Topology (from the Greek τόπος, “place”, and λόγος, “study”) is a major area of mathematics concerned with spatial properties that are preserved under continuous deformations of objects, for example, deformations that involve stretching, but no tearing or gluing. It emerged through the development of concepts from geometry and set theory, such as space, dimension, and transformation.

more...

> [...] in the world of topology, a doughnut and coffee cup are the same, since both are three dimensional objects with a hole going through them. Similarly, two adjacent polygons that share a common border will still share a common border even if the border is bent or distorted.

On [topography](https://en.wikipedia.org/wiki/Topology):

> From the Greek τόπος (topos, "place") and -γραφία (-graphia, "writing"). Topography is the study of the shape and features of the surface of the Earth and other observable astronomical objects including planets, moons, and asteroids. The topography of an area could refer to the surface shapes and features themselves, or a description (especially their depiction in maps).

On map [projections](https://en.wikipedia.org/wiki/Map_projection)):

> [...] is a systematic transformation of the latitudes and longitudes of locations on the surface of a sphere or an ellipsoid into locations on a plane [...] any mathematical function transforming coordinates from the curved surface to the plane is a projection. Carl Friedrich Gauss's Theorema Egregium proved that a sphere's surface cannot be represented on a plane without distortion.

- [Raw api d3-geo](https://github.com/d3/d3-geo)
- [More than you ever wanted to know about GeoJSON](http://www.macwright.org/2015/03/23/geojson-second-bite.html)
- [Official spec](https://tools.ietf.org/html/rfc7946)

## Examples

```js
// Aruba GeoJson
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
```

Notice...

```js
// Aruba TopoJson
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
```

## TopoJson

## Data and tools

Lot's of data are available through [Natural Earth website](http://www.naturalearthdata.com/). The most common type is called [shapefile](https://en.wikipedia.org/wiki/Shapefile).

The best way to interprete the data and manipulate them is through [ogr2ogr](http://www.gdal.org/ogr2ogr.html). Once installed it will make available to command lines `ogr2ogr` and `ogrinfo`.

```sh
# to get some help
$ ogr2ogr --long-usage
```

To get the file data: `ogrinfo -al ne_110m_land.shp`. This will print to stdout the file content. Following an example of how it may look like.

```sh
$ ogrinfo -al ne_110m_admin_0_countries.shp
INFO: Open of `ne_110m_admin_0_countries.shp'
      using driver `ESRI Shapefile' successful.

Layer name: ne_110m_admin_0_countries
Geometry: Polygon
Feature Count: 177
Extent: (-180.000000, -90.000000) - (180.000000, 83.645130)
Layer SRS WKT:
GEOGCS["GCS_WGS_1984",
    DATUM["WGS_1984",
        SPHEROID["WGS_84",6378137.0,298.257223563]],
    PRIMEM["Greenwich",0.0],
    UNIT["Degree",0.0174532925199433]]
scalerank: Integer (4.0)
featurecla: String (30.0)
labelrank: Real (16.6)
sovereignt: String (254.0)
sov_a3: String (254.0)
adm0_dif: Real (16.6)
# ...
```

To transform the shapefile into a GeoJSON or TopoJSON use `ogr2ogr`. An example:

```sh
$ ogr2ogr -f GeoJSON output.json input.shp
# Other options can be passed
```