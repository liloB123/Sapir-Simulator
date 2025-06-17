import React, { useState } from "react";
import Map from "react-map-gl/maplibre";
import { useLayer } from "../contexts/LayersMenuContext";

const BaseMap: React.FC = () => {
  const [viewport, setViewport] = useState({
    latitude: 31.771959,
    longitude: 35.217018,
    zoom: 6,
  });

  const { layers: layers } = useLayer();

  return (
    <div>
      <div className="fixed inset-0 overflow-hidden">
        <Map
          {...viewport}
          style={{ width: "100%", height: "100%" }}
          mapStyle="https://api.maptiler.com/maps/streets/style.json?key=sv1aPMPj3scmsnN1HtxP"
          onMove={(e) => {
            setViewport(e.viewState);
          }}
        >
        </Map>
      </div>
      <div className="fixed top-4 left-4 z-20 bg-white bg-opacity-90 p-4 rounded shadow-md max-w-xs">
        <h4 className="font-semibold mb-2">:שכבות שנבחרו</h4>
        <div className="text-sm space-y-1">
          {Object.entries(layers).map(([key, value]) => (
            <div key={key} className={value ? 'text-green-600' : 'text-red-600'}>
              {key}: {value ? 'ON' : 'OFF'}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BaseMap
