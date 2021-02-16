import Vector2 from "./dependencies/Vector2.js";
import Vector3 from "./dependencies/Vector3.js";

var canvas = document.querySelector("svg");
var rect = canvas.getBoundingClientRect();

let points = [
  {
    coord: [3, 0],
    colour: new Vector3([216, 17, 89]),
    pos: new Vector2([0, 0])
  },
  {
    coord: [1, 1],
    colour: new Vector3([143, 45, 86]),
    pos: new Vector2([0, 0])
  },
  {
    coord: [4, 2],
    colour: new Vector3([33, 131, 128]),
    pos: new Vector2([0, 0])
  },
  {
    coord: [0, 3],
    colour: new Vector3([251, 177, 60]),
    pos: new Vector2([0, 0])
  },
  {
    coord: [2, 4],
    colour: new Vector3([115, 210, 222]),
    pos: new Vector2([0, 0])
  },
  {
    coord: [5, 5],
    colour: new Vector3([209, 240, 177]),
    pos: new Vector2([0, 0])
  }
];

let client = new Vector2([0, 0]);
let offset = new Vector2([0, 0]);

let cell, grid, bounds, vertexes, radius;
updateClientSize();
setGridSize();
updateRadius();
drawPoints();

let triangles = [
  [
    {
      point: 5,
      wrap: [-1, -1]
    },
    {
      point: 4,
      wrap: [0, -1]
    },
    {
      point: 1,
      wrap: [0, 0]
    }
  ],
  [
    {
      point: 1,
      wrap: [0, 0]
    },
    {
      point: 4,
      wrap: [0, -1]
    },
    {
      point: 0,
      wrap: [0, 0]
    }
  ],
  [
    {
      point: 4,
      wrap: [0, -1]
    },
    {
      point: 0,
      wrap: [0, 0]
    },
    {
      point: 5,
      wrap: [0, -1]
    }
  ],
  [
    {
      point: 0,
      wrap: [0, 0]
    },
    {
      point: 5,
      wrap: [0, -1]
    },
    {
      point: 2,
      wrap: [0, 0]
    }
  ],
  [
    {
      point: 5,
      wrap: [0, -1]
    },
    {
      point: 2,
      wrap: [0, 0]
    },
    {
      point: 1,
      wrap: [1, 0]
    }
  ],
  [
    {
      point: 2,
      wrap: [0, 0]
    },
    {
      point: 1,
      wrap: [1, 0]
    },
    {
      point: 3,
      wrap: [1, 0]
    }
  ],
  [
    {
      point: 2,
      wrap: [0, 0]
    },
    {
      point: 3,
      wrap: [1, 0]
    },
    {
      point: 5,
      wrap: [0, 0]
    }
  ],
  [
    {
      point: 3,
      wrap: [1, 0]
    },
    {
      point: 5,
      wrap: [0, 0]
    },
    {
      point: 4,
      wrap: [1, 0]
    }
  ],
  [
    {
      point: 5,
      wrap: [0, 0]
    },
    {
      point: 4,
      wrap: [1, 0]
    },
    {
      point: 1,
      wrap: [1, 1]
    }
  ],
  [
    {
      point: 5,
      wrap: [0, 0]
    },
    {
      point: 1,
      wrap: [1, 1]
    },
    {
      point: 2,
      wrap: [0, 1]
    }
  ],
  [
    {
      point: 5,
      wrap: [0, 0]
    },
    {
      point: 2,
      wrap: [0, 1]
    },
    {
      point: 0,
      wrap: [0, 1]
    }
  ],
  [
    {
      point: 5,
      wrap: [0, 0]
    },
    {
      point: 0,
      wrap: [0, 1]
    },
    {
      point: 4,
      wrap: [0, 0]
    }
  ],
  [
    {
      point: 0,
      wrap: [0, 1]
    },
    {
      point: 4,
      wrap: [0, 0]
    },
    {
      point: 1,
      wrap: [0, 1]
    }
  ],
  [
    {
      point: 4,
      wrap: [0, 0]
    },
    {
      point: 1,
      wrap: [0, 1]
    },
    {
      point: 5,
      wrap: [-1, 0]
    }
  ],
  [
    {
      point: 4,
      wrap: [0, 0]
    },
    {
      point: 5,
      wrap: [-1, 0]
    },
    {
      point: 3,
      wrap: [0, 0]
    }
  ],
  [
    {
      point: 5,
      wrap: [-1, 0]
    },
    {
      point: 3,
      wrap: [0, 0]
    },
    {
      point: 2,
      wrap: [-1, 0]
    }
  ],
  [
    {
      point: 3,
      wrap: [0, 0]
    },
    {
      point: 2,
      wrap: [-1, 0]
    },
    {
      point: 1,
      wrap: [0, 0]
    }
  ],
  [
    {
      point: 2,
      wrap: [-1, 0]
    },
    {
      point: 1,
      wrap: [0, 0]
    },
    {
      point: 5,
      wrap: [-1, -1]
    }
  ],
  [
    {
      point: 1,
      wrap: [0, 0]
    },
    {
      point: 0,
      wrap: [0, 0]
    },
    {
      point: 2,
      wrap: [0, 0]
    }
  ],
  [
    {
      point: 1,
      wrap: [0, 0]
    },
    {
      point: 2,
      wrap: [0, 0]
    },
    {
      point: 4,
      wrap: [0, 0]
    }
  ],
  [
    {
      point: 1,
      wrap: [0, 0]
    },
    {
      point: 4,
      wrap: [0, 0]
    },
    {
      point: 3,
      wrap: [0, 0]
    }
  ],
  [
    {
      point: 2,
      wrap: [0, 0]
    },
    {
      point: 4,
      wrap: [0, 0]
    },
    {
      point: 5,
      wrap: [0, 0]
    }
  ]
].map(def => ({ def }));

updateTriangles();
setCanvasSize();

onMove({ clientX: 0, clientY: 0 });

canvas.addEventListener("mousemove", onMove, true);
window.addEventListener("resize", onResize);

function getTriangleVertexes(triangle, points, gridBounds) {
  return triangle.map(
    ({ point, wrap }) =>
      new Vector2(
        points[point].pos.add(
          wrap.map(v => v * gridBounds),
          true
        )
      )
  );
}
function translateTriangle(triangle, [cell, gridBounds]) {
  var vertexes = getTriangleVertexes(triangle, points, gridBounds);
  var bounds = getBounds(vertexes, gridBounds);

  return { v: vertexes, b: bounds };
}
function updateTriangles() {
  triangles = triangles.map(({ def }) => ({
    def,
    ...translateTriangle(def, grid)
  }));
  bounds = triangles.map(({ b }) => b);
  vertexes = triangles.map(({ v }) => v);
}

function getBarycentricWeights(
  { v: [x, y] },
  { v: [v1x, v1y] },
  { v: [v2x, v2y] },
  { v: [v3x, v3y] }
) {
  var w1 =
    (x * (v3y - v2y) + v2x * (y - v3y) + v3x * (v2y - y)) /
    (v1x * (v3y - v2y) + v2x * (v1y - v3y) + v3x * (v2y - v1y));
  var w2 =
    -(x * (v3y - v1y) + v1x * (y - v3y) + v3x * (v1y - y)) /
    (v1x * (v3y - v2y) + v2x * (v1y - v3y) + v3x * (v2y - v1y));
  var w3 = 1.0 - w1 - w2;

  return new Vector3([w1, w2, w3]);
}

function getPalette({ def }) {
  return def.map(({ point }) => points[point].colour);
}
function getColour({ v: weights }, palette) {
  return palette
    .reduce(
      (p, c, i) => {
        var currentWeighted = c.multiply(weights[i], true);
        return p.map((v, s) => v + currentWeighted[s]);
      },
      [0, 0, 0]
    )
    .map(v => constrain(v, 0, 255));
}
function constrain(val, min, max) {
  return Math.max(Math.min(val, max), min);
}

function getBounds(vertexes, gridBounds) {
  var min = vertexes.reduce(
    ([pX, pY], { v: [cX, cY] }) => [pX < cX ? pX : cX, pY < cY ? pY : cY],
    [gridBounds * 2, gridBounds * 2]
  );
  var max = vertexes.reduce(
    ([pX, pY], { v: [cX, cY] }) => [pX > cX ? pX : cX, pY > cY ? pY : cY],
    [-gridBounds, -gridBounds]
  );

  return [min, max];
}
function isInBounds(p, [min, max]) {
  return p.v
    .map((v, dim) => v >= min[dim] && v <= max[dim])
    .reduce((p, c) => p && c, true);
}
function findInBounds(p, bounds) {
  return bounds
    .map((b, i) => (isInBounds(p, b) ? i : false))
    .filter(v => v !== false);
}
function isInTriangle(p, inBounds) {
  return inBounds
    .map(i => (pointInTriangle(p, vertexes[i]) ? i : false))
    .filter(v => v !== false)[0];
}
function sign(p1, p2, p3) {
  return (p1[0] - p3[0]) * (p2[1] - p3[1]) - (p2[0] - p3[0]) * (p1[1] - p3[1]);
}
function pointInTriangle({ v: p }, [{ v: v1 }, { v: v2 }, { v: v3 }]) {
  var d1 = sign(p, v1, v2);
  var d2 = sign(p, v2, v3);
  var d3 = sign(p, v3, v1);

  var has_neg = d1 < 0 || d2 < 0 || d3 < 0;
  var has_pos = d1 > 0 || d2 > 0 || d3 > 0;

  return !(has_neg && has_pos);
}
function getNearestVertexIndex(p, triangleIndex) {
  var triangleVertexes = vertexes[triangleIndex];
  var distances = triangleVertexes.map(v => v.distance(p));
  var vertexIndex = distances.reduce((p, c, i, a) => (a[p] < c ? p : i), 0);

  return vertexIndex;
  // return triangleVertexes[vertexIndex];
}

function updateClientSize() {
  var { clientWidth: vW, clientHeight: vH } = document.documentElement;

  client.set([vW, vH]);
}
function translateOffset() {
  offset.divide(grid[1]);

  setGridSize();

  offset.multiply(grid[1]);
}
function setGridSize() {
  var {
    v: [vW, vH]
  } = client;
  var vMin = vW < vH ? vW : vH;
  cell = Math.floor(vMin / points.length);
  grid = [cell, cell * points.length];

  points.forEach(({ coord, pos }) =>
    pos.set(coord.map(v => Math.floor((v + 0.5) * grid[0])))
  );
}
function updateRadius() {
  var [cell] = grid;
  radius = Math.floor(cell * 0.65);
}
function drawPoints() {
  points.forEach(({ pos, colour }, index) => drawCircle(index, pos, colour));
}
function drawCircle(index, { v: [x, y] }, { v: [r, g, b] }) {
  var circle = document.querySelector(`#circle--${index + 1}`);
  circle.setAttribute("cx", x);
  circle.setAttribute("cy", y);
  circle.setAttribute("r", radius);
  // circle.setAttribute("fill", `rgb(${r},${g},${b})`);
}
function setCanvasSize() {
  var [, gridBounds] = grid;
  canvas.setAttribute("width", `${gridBounds}px`);
  canvas.setAttribute("height", `${gridBounds}px`);
  canvas.setAttribute("viewBox", `0 0 ${gridBounds} ${gridBounds}`);
}
function fadeWeights(index, distance, { v: weights }) {
  if (distance >= radius) return { v: weights };

  var rest = 1 - weights[index];
  var progress = (radius - distance) / radius;
  var threshold = 0.65;
  var weighted =
    progress >= threshold
      ? 1
      : constrain(
          weights[index] + (1 - weights[index]) * (progress / threshold),
          0,
          1
        );

  return new Vector3(
    weights.map((v, i) =>
      i === index ? weighted : (v / rest) * (1 - weighted)
    )
  );
}

function clientTranslator(e) {
  var { clientX: cX, clientY: cY, changedTouches } = e;
  if (changedTouches != null) {
    var {
      changedTouches: [{ clientX: cX, clientY: cY }]
    } = e;
    e.clientX = cX;
    e.clientY = cY;
  }

  return e;
}
function onMove(e) {
  var { clientX: cX, clientY: cY } = clientTranslator(e);

  var x = cX - rect.left;
  var y = cY - rect.top;
  offset.set([x, y]);

  // find boundaries that point sits in
  var inBounds = findInBounds(offset, bounds);

  // get index of triangle
  var triangleIndex = isInTriangle(offset, inBounds);

  // get weights
  var [v0, v1, v2] = vertexes[triangleIndex];
  var weights = getBarycentricWeights(offset, v0, v1, v2);

  // get nearest vertex
  var nearestVertexIndex = getNearestVertexIndex(offset, triangleIndex);
  var nearestVertex = vertexes[triangleIndex][nearestVertexIndex];
  var distanceToNearest = offset.distance(nearestVertex);
  weights = fadeWeights(nearestVertexIndex, distanceToNearest, weights);

  // get palette
  var palette = getPalette(triangles[triangleIndex]);

  // get colour using weights
  // assign colour
  var [r, g, b] = getColour(weights, palette);
  canvas.style.backgroundColor = `rgb(${r},${g},${b})`;
}
function onResize() {
  updateClientSize();
  translateOffset();
  updateRadius();
  drawPoints();
  updateTriangles();
  setCanvasSize();
}
