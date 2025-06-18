import { useState } from "react";
import Map, { Source, Layer, type LayerProps } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import type { SourceWithLayers } from "../models/sourceWithLayers";

type MapProps = {
  sourcesAndLayers: SourceWithLayers[];
};

export default function App({ sourcesAndLayers }: MapProps) {
  const [viewport, setViewport] = useState({
    latitude: 40.78,
    longitude: -73.96,
    zoom: 13,
  });

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Map
        initialViewState={viewport}
        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=sv1aPMPj3scmsnN1HtxP"
        style={{ width: "100%", height: "100%" }}
        onMove={(e) => setViewport(e.viewState)}
      >
        {sourcesAndLayers.map(({ id, type, data, layers }) => (
          <Source key={id} id={id} type={type} data={data}>
            {layers.map(({ id: layerId, ...rest }) => (
              <Layer key={layerId} id={layerId} {...(rest as LayerProps)} />
            ))}
          </Source>
        ))}
      </Map>
    </div>
  );
}
