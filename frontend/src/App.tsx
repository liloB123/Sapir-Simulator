import type { FeatureCollection } from "geojson";
import React from "react";
import Map, { Layer, Source, type LayerProps } from "react-map-gl/maplibre";

const parks: FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Tel Aviv" },
      geometry: {
        type: "Point",
        coordinates: [34.7818, 32.0853],
      },
    },
    {
      type: "Feature",
      properties: { name: "Jerusalem" },
      geometry: {
        type: "Point",
        coordinates: [35.2137, 31.7683],
      },
    },
    {
      type: "Feature",
      properties: { name: "Haifa" },
      geometry: {
        type: "Point",
        coordinates: [34.9896, 32.794],
      },
    },
  ],
};

const parksLayer: LayerProps = {
  id: "parksLayer",
  type: "circle",
  paint: {
    "circle-radius": 10,
    "circle-color": "#FF0000",
  },
};

const trails: FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Trail A" },
      geometry: {
        type: "LineString",
        coordinates: [
          [34.9, 32.086],
          [34.7, 32.187],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "Trail B" },
      geometry: {
        type: "LineString",
        coordinates: [
          [35.3137, 31.7683],
          [35.3145, 31.969],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "Trail C" },
      geometry: {
        type: "LineString",
        coordinates: [
          [34.8, 32.794],
          [34.7, 32.996],
        ],
      },
    },
  ],
};

const trailsLayer: LayerProps = {
  id: "trailsLayer",
  type: "line",
  paint: {
    "line-color": "#00FF00",
    "line-width": 4,
  },
};

const neighborhoods: FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Neighborhood A" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [34.9, 32.3],
            [34.9, 32.11],
            [34.81, 32.11],
          ],
        ],
      },
    },
  ],
};

const neighborhoodsLayer: LayerProps = {
  id: "neighborhoodsLayer",
  type: "fill",
  paint: {
    "fill-opacity": 1,
    "fill-color": "#0000FF",
  },
};

const App: React.FC = () => {
  return (
    <Map
      initialViewState={{
        latitude: 32.0853,
        longitude: 34.7818,
        zoom: 13,
      }}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="https://demotiles.maplibre.org/style.json"
    >
      <Source id="parks" type="geojson" data={parks}>
        <Layer {...parksLayer} />
      </Source>
      <Source id="trails" type="geojson" data={trails}>
        <Layer {...trailsLayer} />
      </Source>
      <Source id="neighborhoods" type="geojson" data={neighborhoods}>
        <Layer {...neighborhoodsLayer} />
      </Source>
    </Map>
  );
};

export default App;
