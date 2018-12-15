define({ main: { id: 'G', class: 'digraph', shapes: [
  { shape: 'polygon', points: [
    [ 0, 1 ],
    [ 0, 400 ],
    [ 217, 400 ],
    [ 217, 1 ]
  ], style: [
    { key: 'stroke', value: 'rgba(255,255,255,1)' },
    { key: 'fill', value: 'rgba(255,255,255,1)' }
  ] }
], labels: [  ] }, groups: [
  { id: 'cluster_0', class: 'subgraph', shapes: [
    { shape: 'polygon', points: [
      [ 8, 64 ],
      [ 8, 356 ],
      [ 98, 356 ],
      [ 98, 64 ]
    ], style: [
      { key: 'stroke', value: 'rgba(211,211,211,1)' },
      { key: 'fill', value: 'rgba(211,211,211,1)' }
    ] }
  ], labels: [
    { x: 53, y: 338, text: 'process #1', style: [
      { key: 'font-family', value: "'Times-Roman',serif" },
      { key: 'font-size', value: 14 },
      { key: 'stroke', value: 'rgba(0,0,0,1)' }
    ] }
  ] },
  { id: 'a0', class: 'node', shapes: [
    { shape: 'ellipse', cx: 63, cy: 306, rx: 27, ry: 18, style: [
      { key: 'stroke', value: 'rgba(255,255,255,1)' },
      { key: 'fill', value: 'rgba(255,255,255,1)' }
    ] }
  ], labels: [
    { x: 63, y: 300, text: 'a0', style: [
      { key: 'font-family', value: "'Times-Roman',serif" },
      { key: 'font-size', value: 14 },
      { key: 'stroke', value: 'rgba(0,0,0,1)' }
    ] }
  ] },
  { id: 'a1', class: 'node', shapes: [
    { shape: 'ellipse', cx: 63, cy: 234, rx: 27, ry: 18, style: [
      { key: 'stroke', value: 'rgba(255,255,255,1)' },
      { key: 'fill',
        value: 'rgba(255,255,255,1)' }
    ] }
  ], labels: [
    { x: 63, y: 228, text: 'a1', style: [
      { key: 'font-family', value: "'Times-Roman',serif" },
      { key: 'font-size', value: 14 },
      { key: 'stroke', value: 'rgba(0,0,0,1)' }
    ] }
  ] },
  { id: 'a2', class: 'node', shapes: [
    { shape: 'ellipse', cx: 63, cy: 162, rx: 27, ry: 18, style: [
      { key: 'stroke', value: 'rgba(255,255,255,1)' },
      { key: 'fill', value: 'rgba(255,255,255,1)' }
    ] }
  ], labels: [
    { x: 63, y: 156, text: 'a2', style: [
      { key: 'font-family', value: "'Times-Roman',serif" },
      { key: 'font-size', value: 14 },
      { key: 'stroke', value: 'rgba(0,0,0,1)' }
    ] }
  ] },
  { id: 'a3', class: 'node', shapes: [
    { shape: 'ellipse', cx: 63, cy: 90, rx: 27, ry: 18, style: [
      { key: 'stroke', value: 'rgba(255,255,255,1)' },
      { key: 'fill', value: 'rgba(255,255,255,1)' }
    ] }
  ], labels: [
    { x: 63, y: 84, text: 'a3', style: [
      { key: 'font-family', value: "'Times-Roman',serif" },
      { key: 'font-size', value: 14 },
      { key: 'stroke', value: 'rgba(0,0,0,1)' }
    ] }
  ] },
  { id: 'a0-a1', class: 'relation', shapes: [
    { shape: 'bspline', points: [
      [ 63, 288 ],
      [ 63, 280 ],
      [ 63, 271 ],
      [ 63, 262 ]
    ], style: [
      { key: 'stroke', value: 'rgba(0,0,0,1)' }
    ] },
    { shape: 'polygon', points: [
      [ 67, 262 ],
      [ 63, 252 ],
      [ 60, 262 ]
    ], style: [
      { key: 'style', value: 'solid' },
      { key: 'stroke', value: 'rgba(0,0,0,1)' },
      { key: 'fill', value: 'rgba(0,0,0,1)' }
    ] }
  ], labels: [  ] },
  { id: 'a1-a2', class: 'relation', shapes: [
    { shape: 'bspline', points: [
      [ 63, 216 ],
      [ 63, 208 ],
      [ 63, 199 ],
      [ 63, 190 ]
    ], style: [
      { key: 'stroke', value: 'rgba(0,0,0,1)' }
    ] },
    { shape: 'polygon', points: [
      [ 67, 190 ],
      [ 63, 180 ],
      [ 60, 190 ]
    ], style: [
      { key: 'style', value: 'solid' },
      { key: 'stroke', value: 'rgba(0,0,0,1)' },
      { key: 'fill', value: 'rgba(0,0,0,1)' }
    ] }
  ], labels: [  ] },
  { id: 'a2-a3', class: 'relation', shapes: [
    { shape: 'bspline', points: [
      [ 63, 144 ],
      [ 63, 136 ],
      [ 63, 127 ],
      [ 63, 118 ]
    ], style: [
      { key: 'stroke', value: 'rgba(0,0,0,1)' }
    ] },
    { shape: 'polygon', points: [
      [ 67, 118 ],
      [ 63, 108 ],
      [ 60, 118 ]
    ], style: [
      { key: 'style', value: 'solid' },
      { key: 'stroke', value: 'rgba(0,0,0,1)' },
      { key: 'fill', value: 'rgba(0,0,0,1)' }
    ] }
  ], labels: [  ] },
  { id: 'a3-a0', class: 'relation', shapes: [
    { shape: 'bspline', points: [
      [ 49, 106 ],
      [ 41, 116 ],
      [ 31, 130 ],
      [ 27, 144 ],
      [ 13, 190 ],
      [ 13, 206 ],
      [ 27, 252 ],
      [ 30, 263 ],
      [ 37, 273 ],
      [ 43, 282 ]
    ], style: [
      { key: 'stroke', value: 'rgba(0,0,0,1)' }
    ] },
    { shape: 'polygon', points: [
      [ 40, 284 ],
      [ 49, 290 ],
      [ 46, 280 ]
    ], style: [
      { key: 'style', value: 'solid' },
      { key: 'stroke', value: 'rgba(0,0,0,1)' },
      { key: 'fill', value: 'rgba(0,0,0,1)' }
    ] }
  ], labels: [  ] },
  { id: 'cluster_1', class: 'subgraph', shapes: [
    { shape: 'polygon', points: [
      [ 133, 64 ],
      [ 133, 356 ],
      [ 208, 356 ],
      [ 208, 64 ]
    ], style: [
      { key: 'stroke', value: 'rgba(0,0,255,1)' }
    ] }
  ], labels: [
    { x: 171, y: 338, text: 'process #2', style: [
      { key: 'font-family', value: "'Times-Roman',serif" },
      { key: 'font-size', value: 14 },
      { key: 'stroke', value: 'rgba(0,0,0,1)' }
    ] }
  ] },
  { id: 'b0', class: 'node', shapes: [
    { shape: 'ellipse', cx: 170, cy: 306, rx: 27, ry: 18, style: [
      { key: 'stroke', value: 'rgba(0,0,0,1)' },
      { key: 'fill', value: 'rgba(211,211,211,1)' }
    ] }
  ], labels: [
    { x: 170, y: 300, text: 'b0', style: [
      { key: 'font-family', value: "'Times-Roman',serif" },
      { key: 'font-size', value: 14 },
      { key: 'stroke', value: 'rgba(0,0,0,1)' }
    ] }
  ] },
  { id: 'b1', class: 'node', shapes: [
    { shape: 'ellipse', cx: 171, cy: 234, rx: 27, ry: 18, style: [
      { key: 'stroke', value: 'rgba(0,0,0,1)' },
      { key: 'fill', value: 'rgba(211,211,211,1)' }
    ] }
  ], labels: [
    { x: 171, y: 228, text: 'b1', style: [
      { key: 'font-family', value: "'Times-Roman',serif" },
      { key: 'font-size', value: 14 },
      { key: 'stroke', value: 'rgba(0,0,0,1)' }
    ] }
  ] },
  { id: 'b2', class: 'node', shapes: [
    { shape: 'ellipse', cx: 173, cy: 162, rx: 27, ry: 18, style: [
      { key: 'stroke', value: 'rgba(0,0,0,1)' },
      { key: 'fill', value: 'rgba(211,211,211,1)' }
    ] }
  ], labels: [
    { x: 173, y: 156, text: 'b2', style: [
      { key: 'font-family', value: "'Times-Roman',serif" },
      { key: 'font-size', value: 14 },
      { key: 'stroke', value: 'rgba(0,0,0,1)' }
    ] }
  ] },
  { id: 'b3', class: 'node', shapes: [
    { shape: 'ellipse', cx: 168, cy: 90, rx: 27, ry: 18, style: [
      { key: 'stroke', value: 'rgba(0,0,0,1)' },
      { key: 'fill', value: 'rgba(211,211,211,1)' }
    ] }
  ], labels: [
    { x: 168, y: 84, text: 'b3', style: [
      { key: 'font-family', value: "'Times-Roman',serif" },
      { key: 'font-size', value: 14 },
      { key: 'stroke', value: 'rgba(0,0,0,1)' }
    ] }
  ] },
  { id: 'b0-b1', class: 'relation', shapes: [
    { shape: 'bspline', points: [
      [ 170, 288 ],
      [ 170, 280 ],
      [ 170, 271 ],
      [ 171, 262 ]
    ], style: [
      { key: 'stroke', value: 'rgba(0,0,0,1)' }
    ] },
    { shape: 'polygon', points: [
      [ 174, 262 ],
      [ 171, 252 ],
      [ 167, 262 ]
    ], style: [
      { key: 'style', value: 'solid'
      },
      { key: 'stroke', value: 'rgba(0,0,0,1)' },
      { key: 'fill', value: 'rgba(0,0,0,1)' }
    ] }
  ], labels: [  ] },
  { id: 'b1-b2', class: 'relation', shapes: [
    { shape: 'bspline', points: [
      [ 171, 216 ],
      [ 172, 208 ],
      [ 172, 199 ],
      [ 172, 190 ]
    ], style: [
      { key: 'stroke', value: 'rgba(0,0,0,1)' }
    ] },
    { shape: 'polygon', points: [
      [ 176, 190 ],
      [ 173, 180 ],
      [ 169, 190 ]
    ], style: [
      { key: 'style', value: 'solid' },
      { key: 'stroke', value: 'rgba(0,0,0,1)' },
      { key: 'fill', value: 'rgba(0,0,0,1)' }
    ] }
  ], labels: [  ] },
  { id: 'b2-b3', class: 'relation', shapes: [
    { shape: 'bspline', points: [
      [ 172, 144 ],
      [ 171, 136 ],
      [ 171, 127 ],
      [ 170, 118 ]
    ], style: [
      { key: 'stroke', value: 'rgba(0,0,0,1)' }
    ] },
    { shape: 'polygon', points: [
      [ 173, 118 ],
      [ 169, 108 ],
      [ 166, 118 ]
    ], style: [
      { key: 'style', value: 'solid' },
      { key: 'stroke', value: 'rgba(0,0,0,1)' },
      { key: 'fill', value: 'rgba(0,0,0,1)' }
    ] }
  ], labels: [  ] },
  { id: 'start', class: 'node', shapes: [
    { shape: 'polygon', points: [
      [ 116, 400 ],
      [ 77, 382 ],
      [ 116, 364 ],
      [ 155, 382 ]
    ], style: [
      { key: 'stroke', value: 'rgba(0,0,0,1)' }
    ] },
    { shape: 'polyline', points: [
      [ 88, 387 ],
      [ 88, 377 ]
    ], style: [
      { key: 'stroke', value: 'rgba(0,0,0,1)' }
    ] },
    { shape: 'polyline', points: [
      [ 105, 369 ],
      [ 127, 369 ]
    ], style: [
      { key: 'stroke', value: 'rgba(0,0,0,1)' }
    ] },
    { shape: 'polyline', points: [
      [ 144, 377 ],
      [ 144, 387 ]
    ], style: [
      { key: 'stroke', value: 'rgba(0,0,0,1)' }
    ] },
    { shape: 'polyline', points: [
      [ 127, 395 ],
      [ 105, 395 ]
    ], style: [
      { key: 'stroke', value: 'rgba(0,0,0,1)' }
    ] }
  ], labels: [
    { x: 116, y: 376, text: 'start', style: [
      { key: 'font-family', value: "'Times-Roman',serif" },
      { key: 'font-size', value: 14 },
      { key: 'stroke', value: 'rgba(0,0,0,1)' }
    ] }
  ] },
  { id: 'end', class: 'node', shapes: [
    { shape: 'polygon', points: [
      [ 133, 36 ],
      [ 97, 36 ],
      [ 97, 0 ],
      [ 133, 0 ]
    ], style: [
      { key: 'stroke', value: 'rgba(0,0,0,1)' }
    ] },
    { shape: 'polyline', points: [
      [ 109, 36 ],
      [ 97, 24 ]
    ], style: [
      { key: 'stroke', value: 'rgba(0,0,0,1)' }
    ] },
    { shape: 'polyline', points: [
      [ 97, 12 ],
      [ 109, 0 ]
    ], style: [
      { key: 'stroke', value: 'rgba(0,0,0,1)' }
    ] },
    { shape: 'polyline', points: [
      [ 121, 0 ],
      [ 133, 12 ]
    ], style: [
      { key: 'stroke', value: 'rgba(0,0,0,1)' }
    ] },
    { shape: 'polyline', points: [
      [ 133, 24 ],
      [ 121, 36 ]
    ], style: [
      { key: 'stroke', value: 'rgba(0,0,0,1)' }
    ] }
  ], labels: [
    { x: 115, y: 12, text: 'end', style: [
      { key: 'font-family', value: "'Times-Roman',serif" },
      { key: 'font-size', value: 14 },
      { key: 'stroke', value: 'rgba(0,0,0,1)' }
    ] }
  ] },
  { id: 'start-a0', class: 'relation', shapes: [
    { shape: 'bspline', points: [
      [ 107, 368 ],
      [ 99, 358 ],
      [ 89, 343 ],
      [ 80, 331 ]
    ], style: [
      { key: 'stroke', value: 'rgba(0,0,0,1)' }
    ] },
    { shape: 'polygon', points: [
      [ 83, 329 ],
      [ 74, 323 ],
      [ 77, 333 ]
    ],
      style: [
        { key: 'style', value: 'solid' },
        { key: 'stroke', value: 'rgba(0,0,0,1)' },
        { key: 'fill', value: 'rgba(0,0,0,1)' }
      ] }
  ], labels: [  ] },
  { id: 'start-b0',
    class: 'relation', shapes: [
    { shape: 'bspline', points: [
      [ 125, 368 ],
      [ 133, 358 ],
      [ 144, 343 ],
      [ 153, 331 ]
    ], style: [
      { key: 'stroke', value: 'rgba(0,0,0,1)' }
    ] },
    { shape: 'polygon', points: [
      [ 156, 333 ],
      [ 159, 323 ],
      [ 150, 329 ]
    ], style: [
      { key: 'style', value: 'solid' },
      { key: 'stroke', value: 'rgba(0,0,0,1)' },
      { key: 'fill', value: 'rgba(0,0,0,1)' }
    ] }
  ], labels: [  ] },
  { id: 'a1-b3', class: 'relation', shapes: [
    { shape: 'bspline', points: [
      [ 74, 218
      ],
      [ 93, 193 ],
      [ 129, 144 ],
      [ 150, 115 ]
    ], style: [
      { key: 'stroke', value: 'rgba(0,0,0,1)' }
    ] },
    { shape: 'polygon', points: [
      [ 153, 117 ],
      [ 157,
        106 ],
      [ 148, 112 ]
    ], style: [
      { key: 'style', value: 'solid' },
      { key: 'stroke', value: 'rgba(0,0,0,1)' },
      { key: 'fill', value: 'rgba(0,0,0,1)' }
    ] }
  ], labels: [  ] },
  { id: 'b2-a3', class: 'relation', shapes: [
    { shape: 'bspline', points: [
      [ 154, 149 ],
      [ 136, 138 ],
      [ 110, 121 ],
      [ 91, 109 ]
    ], style: [
      { key: 'stroke', value: 'rgba(0,0,0,1)' }
    ] },
    { shape: 'polygon', points: [
      [ 92, 105 ],
      [ 82, 103 ],
      [ 88, 111 ]
    ], style: [
      { key: 'style', value: 'solid' },
      { key: 'stroke', value: 'rgba(0,0,0,1)' },
      { key: 'fill', value: 'rgba(0,0,0,1)' }
    ] }
  ], labels: [  ] },
  { id: 'a3-end', class: 'relation', shapes: [
    { shape: 'bspline', points: [
      [ 75, 73 ],
      [ 81, 65 ],
      [ 89, 54 ],
      [ 96, 45 ]
    ], style: [
      { key: 'stroke', value: 'rgba(0,0,0,1)' }
    ] },
    { shape: 'polygon', points: [
      [ 99, 47 ],
      [ 102, 36 ],
      [ 93, 42 ]
    ], style: [
      { key: 'style', value: 'solid' },
      { key: 'stroke', value: 'rgba(0,0,0,1)' },
      { key: 'fill', value: 'rgba(0,0,0,1)' }
    ]
    }
  ], labels: [  ] },
  { id: 'b3-end', class: 'relation', shapes: [
    { shape: 'bspline', points: [
      [ 156, 73 ],
      [ 150, 65 ],
      [ 142, 54 ],
      [ 134, 45 ]
    ], style: [
      { key: 'stroke', value: 'rgba(0,0,0,1)' }
    ] },
    { shape: 'polygon', points: [
      [ 137, 42 ],
      [ 128, 36 ],
      [ 131, 47 ]
    ], style: [
      { key: 'style', value: 'solid' },
      { key: 'stroke', value: 'rgba(0,0,0,1)' },
      { key: 'fill', value: 'rgba(0,0,0,1)' }
    ] }
  ], labels: [  ] }
] });