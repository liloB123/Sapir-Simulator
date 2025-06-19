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
    "https://api.maptiler.com/tiles/uk-osgb1919/{z}/{x}/{y}.jpg?key=sv1aPMPj3scmsnN1HtxP",
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
