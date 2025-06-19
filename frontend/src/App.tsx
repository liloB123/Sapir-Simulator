import React from "react";
import Map, {
  Layer,
  Source,
  type LayerProps,
  type SourceProps,
} from "react-map-gl/maplibre";

const rasterSource: SourceProps = {
  type: "raster",
  tiles: [
    "https://trailstash.github.io/naturalearthtiles/tiles/natural_earth_2.raster/{z}/{x}/{y}.webp",
  ],
  tileSize: 256,
};

const rasterLayer: LayerProps = {
  id: "distance-heat",
  type: "raster",
  paint: {
    "raster-opacity": 0.7,
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
      <Source id="uk-raster" {...rasterSource}>
        <Layer {...rasterLayer} />
      </Source>
    </Map>
  );
};

export default App;
