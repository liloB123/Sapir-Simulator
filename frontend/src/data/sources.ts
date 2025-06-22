export const sourcesAndLayers: {
  id: string;
  type: "geojson";
  data: string;
  layers: {
    id: string;
    type: "circle" | "line" | "fill" | "symbol" | "custom";
    paint?: Record<string, any>;
    layout?: Record<string, any>;
  }[];
}[] = [
  {
    id: "parks",
    type: "geojson",
    data: "/geojson/parks.geojson",
    layers: [
      {
        id: "park-layer",
        type: "circle",
        paint: {
          "circle-radius": 6,
          "circle-color": "#34D399"
        },
        layout: {},
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
        paint: {
          "line-color": "#3B82F6",
          "line-width": 3,
        },
        layout: {},
      }
    ]
  },
  {
    id: "neighborhoods",
    type: "geojson",
    data: "/geojson/neighborhoods.geojson",
    layers: [
      {
        id: "neighborhood-fill-layer",
        type: "fill",
        paint: {
          "fill-color": "#000000",
          "fill-opacity": 0.1,
        },
        layout: {},
      },
      {
        id: "neighborhood-border-layer",
        type: "line",
        paint: {
          "line-color": "#000000",
          "line-width": 1,
        },
        layout: {},
      }
    ]
  }
];
