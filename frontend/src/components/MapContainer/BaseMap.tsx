import { useState } from "react";
import type { FC } from 'react';
import Map from "react-map-gl/maplibre";
import { useLayers } from "../../hooks/useLayers";
import type { ViewState } from 'react-map-gl/mapbox';

const BaseMap: FC = () => {
  const [viewport, setViewport] = useState<ViewState>({
    latitude: 31.771959,
    longitude: 35.217018,
    zoom: 6,
    bearing: 0,
    pitch: 0,
    padding: { top: 0, bottom: 0, left: 0, right: 0 },
  });

  const [layers,] = useLayers();

  return (
    <>
      <div className="w-screen h-screen inset-0 overflow-hidden">
        <Map
          {...viewport}
          style={{ width: "100%", height: "100%" }}
          mapStyle="https://api.maptiler.com/maps/streets/style.json?key=sv1aPMPj3scmsnN1HtxP"
          onMove={({ viewState }) => setViewport(viewState)}
        >
        </Map>
      </div>
      <div className="fixed top-4 left-4 z-20 bg-white bg-opacity-90 p-4 rounded shadow-md max-w-xs">
        <h4 className="font-semibold mb-2 text-right">:שכבות שנבחרו</h4>
        <div className="text-sm space-y-2 text-right">
          {Object.entries(layers).map(([key, value]) => (
            <div key={key} className="text-gray-800">
              <div className={value.isActive ? 'text-green-600' : 'text-red-600'}>
                {key} — {value.isActive ? 'ON' : 'OFF'}
              </div>
              <div className="text-blue-600 text-xs">
                {value.isExpanded ? `⚙️ פתוח | נבחר: ${value.selectedOption}` : '⚙️ סגור'}
              </div>
              <div className="text-blue-600 text-xs">
                {value.selectedOption === "אקספוננציאלי" && value.base}
                {value.selectedOption === "אקספוננציאלי" && typeof value.base}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default BaseMap
