import {
  bbox,
  booleanPointInPolygon,
  pointGrid,
  polygon,
  distance,
  point,
} from "@turf/turf";
import React from "react";
import Map, { Layer, Source } from "react-map-gl/maplibre";

// נניח שיש לנו פוליגון (ריבוע סביב תל אביב)
const poly = polygon([
  [
    [34.77, 32.07],
    [34.81, 32.07],
    [34.81, 32.11],
    [34.77, 32.11],
    [34.77, 32.07],
  ],
]);

const grid = pointGrid(bbox(poly), 0.1, { units: "kilometers" });
const filtered = grid.features.filter((pt) => booleanPointInPolygon(pt, poly));
const origin = point([34.79, 32.09]);

const features = filtered.map((pt) => {
  return {
    ...pt,
    properties: {
      ...pt.properties,
      dist: distance(origin, pt, { units: "kilometers" }),
    },
  };
});

const App: React.FC = () => {
  const circleLayer = {
    id: "circles-by-distance",
    type: "circle",
    source: "points",
    paint: {
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["zoom"],
        10,
        10, // בזום 10 → רדיוס 5 פיקסלים
        14,
        30, // בזום 14 → רדיוס 15 פיקסלים
      ],
      "circle-color": [
        "interpolate",
        ["linear"],
        ["get", "dist"],
        0,
        "#ff0000", // אדום - 0 ק"מ
        1,
        "#ffa500", // כתום - 1 ק"מ
        2,
        "#ffff00", // צהוב - 2 ק"מ
        5,
        "#00ff00", // ירוק - רחוק יותר
      ],
      "circle-opacity": 0.5,
    },
  };

  const data = { type: "FeatureCollection", features };

  return (
    <Map
      initialViewState={{
        latitude: 32.0853,
        longitude: 34.7818,
        zoom: 13,
      }}
      style={{ width: "100%", height: "100vh" }}
      mapStyle="https://demotiles.maplibre.org/style.json"
    >
      <Source id="points" type="geojson" data={data}>
        <Layer {...circleLayer} />
      </Source>
    </Map>
  );
};

export default App;
