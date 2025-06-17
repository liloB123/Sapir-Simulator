import React from 'react';
import { LayerProvider, type LayerState } from './contexts/LayersMenuContext';
import MapContainer from './components/MapContainer';

const App: React.FC = () => {
  const initialLayers: LayerState = {
    "מרחק מקו הגבול": false,
    "מרחק מיישובים מרכזיים": false,
    "פוליגונים בשטח ישראלי": false,
    "פוליגונים חוצי גבולות": false,
    "נקודות אסטרטגיות": false
  };

  return (
    <LayerProvider initialLayers={initialLayers}>
      <MapContainer />
    </LayerProvider>
  );
};

export default App;
