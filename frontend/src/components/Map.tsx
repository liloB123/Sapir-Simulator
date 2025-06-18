import { useState } from "react";
import Map, { Source, Layer, type LayerProps } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import type { SourceWithLayers } from "../types";

type MapProps = {
  sourcesAndLayers: SourceWithLayers[];
};

export default function MapComponent({ sourcesAndLayers }: MapProps) {
  const [viewport, setViewport] = useState({
    latitude: 51.5074,
  longitude: -0.1278,
  zoom: 12,
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
