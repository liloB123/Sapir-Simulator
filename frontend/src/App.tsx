import React, { useState } from "react";
import Map from "react-map-gl/maplibre";

const HeatmapComponent = () => {
  const [viewState, setViewState] = useState({
    longitude: 34.7818,
    latitude: 32.0853,
    zoom: 6,
  });

  // מפת חום מבוססת גובה ללא API key
  const heatmapStyle = {
    version: 8,
    sources: {
      osm: {
        type: "raster",
        tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
        tileSize: 256,
        attribution: "© OpenStreetMap contributors",
      },
      terrain: {
        type: "raster",
        tiles: ["https://tile.opentopomap.org/{z}/{x}/{y}.png"],
        tileSize: 256,
        attribution: "© OpenTopoMap (CC-BY-SA)",
      },
    },
    layers: [
      {
        id: "base-layer",
        type: "raster",
        source: "osm",
      },
      {
        id: "heat-layer",
        type: "raster",
        source: "terrain",
        paint: {
          "raster-opacity": 0.8,
          "raster-hue-rotate": 0, // in degrees
          //   "raster-saturation": 0.2,
          "raster-contrast": 0.3,
          "raster-brightness-min": 0.2,
          "raster-brightness-max": 0.8,
        },
      },
    ],
  };

  return (
    <Map
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      mapStyle={heatmapStyle}
      style={{ width: "100%", height: "100vh" }}
    />
  );
};

export default HeatmapComponent;
