import React, { useState } from 'react';
import URLResponse from './components/urlResponse';
import type { SourceWithLayers } from './types';
import { sourcesAndLayers } from './data/sources';
import SourceTogglePanel from './components/SourceTogglePanel';
import MapComponent from './components/Map';
import ParkLayerStyleSelector from './components/ParkLayerStyleSelector';

const App: React.FC = () => {
  const [visibleSources, setVisibleSources] = useState<SourceWithLayers[]>(sourcesAndLayers);
  
  const handleStyleChange = (newPaint: Record<string, any>) => {
  setVisibleSources(prev =>
      prev.map(source => {
        if (source.id !== "parks") return source;

        return {
          ...source,
          layers: source.layers.map(layer =>
            layer.id === "park-layer"
              ? { ...layer, paint: newPaint }
              : layer
          )
        };
      })
    );
  };


  return (
    <>
      <MapComponent sourcesAndLayers={visibleSources} />
      <SourceTogglePanel
        sources={sourcesAndLayers}
        onChange={setVisibleSources}
      />
      <ParkLayerStyleSelector onStyleChange={handleStyleChange} />
      <URLResponse/>
    </>
  );
};

export default App;
