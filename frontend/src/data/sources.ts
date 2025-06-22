import type { SourceWithLayers } from "../types";

export const sourcesAndLayers: SourceWithLayers[] = [
  {
    "id": "parks",
    "type": "geojson",
    "data": "/geojson/parks.geojson",
    "layers": [
      {
        "id": "park-layer",
        "type": "circle",
        paint: {
          // Style 1: Simple green circles (original)
          // "circle-radius": 6,
          // "circle-color": "#34D399",

          // Style 2: Larger yellow circles
          // "circle-radius": 10,
          // "circle-color": "#facc15",

          // Style 3: Circle radius based on zoom (complex style)
          // "circle-radius": [
          //   "interpolate",
          //   ["linear"],
          //   ["zoom"],
          //   10, 2,
          //   14, 10
          // ],
          // "circle-color": "#10b981",

          // Style 4: Color by actual size (numeric area in m²)
          // "circle-color": [
          //   "interpolate",
          //   ["linear"],
          //   ["get", "area_m2"], // must be in your GeoJSON properties
          //   0, "#d1fae5",
          //   10000, "#6ee7b7",
          //   50000, "#10b981",
          //   100000, "#047857"
          // ],
          // "circle-radius": 8,

          // Style 5: Radius based on estimated yearly visitors
          // "circle-radius": [
          //   "interpolate",
          //   ["linear"],
          //   ["get", "visitors"],
          //   0, 3,
          //   100000, 6,
          //   500000, 10,
          //   1000000, 14
          // ],
          // "circle-color": "#2563eb"
        },
        "layout": {},
      }
    ]
  },
  {
    id: "trails",
    type: "geojson",
    data: "/geojson/trails.geojson",
    layers: [
      {
        id: "trail-layer",
        type: "line",
        paint: { "line-color": "#3B82F6", "line-width": 3 },
        layout: {},
      },
    ],
  },
  {
    id: "neighborhoods",
    type: "geojson",
    data: "/geojson/neighborhoods.geojson",
    layers: [
      {
        id: "neighborhood-fill-layer",
        type: "fill",
        paint: { "fill-color": "#000000", "fill-opacity": 0.1 },
        layout: {},
      },
      {
        id: "neighborhood-border-layer",
        type: "line",
        paint: { "line-color": "#000000", "line-width": 1 },
        layout: {},
      },
    ],
  },
  {
    id: "simulated-heatmap",
    type: "geojson", // ✅ source is geojson — required
    data: "/geojson/heatmapPoints.geojson",
    layers: [
      {
        id: "simulated-heatmap-layer",
        type: "circle",
        paint: {
          "circle-radius": [
            "interpolate",
            ["linear"],
            ["zoom"],
            0, 1,
            22, 30
          ],
          "circle-color": [
            "interpolate",
            ["linear"],
            ["get", "value"],
            1, "rgba(255, 255, 0, 0.4)",   // yellow
            100, "rgba(255, 0, 0, 0.6)"    // red
          ],
          "circle-blur": 1.5,
          "circle-opacity": 0.7
        },
        layout: {}
      }
    ]
  }
];