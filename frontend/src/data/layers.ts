export const parkLayerStyles: { label: string; paint: Record<string, any> }[] = [
  {
    label: "Simple Green Circles",
    paint: {
      "circle-radius": 6,
      "circle-color": "#34D399",
    },
  },
  {
    label: "Larger Yellow Circles",
    paint: {
      "circle-radius": 10,
      "circle-color": "#facc15",
    },
  },
  {
    label: "Zoom-Based Radius",
    paint: {
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["zoom"],
        10, 2,
        14, 10,
      ],
      "circle-color": "#10b981",
    },
  },
  {
    label: "Color by Area (m²)",
    paint: {
      "circle-color": [
        "interpolate",
        ["linear"],
        ["get", "area_m2"],
        0, "#d1fae5",
        10000, "#6ee7b7",
        50000, "#10b981",
        100000, "#047857",
      ],
      "circle-radius": 8,
    },
  },
  {
    label: "Radius by Visitors",
    paint: {
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["get", "visitors"],
        0, 3,
        100000, 6,
        500000, 10,
        1000000, 14,
      ],
      "circle-color": "#2563eb",
    },
  },
];
