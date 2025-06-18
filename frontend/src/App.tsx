import React, { useState } from 'react';
import URLResponse from './components/urlResponse';
import type { SourceWithLayers } from './types';
import { sourcesAndLayers } from './data/sources';
import SourceTogglePanel from './components/SourceTogglePanel';
import MapComponent from './components/Map';

const App: React.FC = () => {
  const [visibleSources, setVisibleSources] = useState<SourceWithLayers[]>(sourcesAndLayers);
  
  return (
    <>
      <MapComponent sourcesAndLayers={visibleSources} />
      <SourceTogglePanel
        sources={sourcesAndLayers}
        onChange={setVisibleSources}
      />
      <URLResponse/>
    </>
  );
};

export default App;
