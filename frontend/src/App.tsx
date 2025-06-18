import type { FC } from 'react';
import { LayerProvider, type LayerState } from './contexts/LayersMenuContext';
import MapContainer from './components/MapContainer';

const initialLayers: LayerState = {
  "מרחק מקו הגבול": false,
  "מרחק מיישובים מרכזיים": false,
  "פוליגונים בשטח ישראלי": false,
  "פוליגונים חוצי גבולות": false,
  "נקודות אסטרטגיות": false
};

const App: FC = () => {
  return (
    <LayerProvider initialLayers={initialLayers}>
      <MapContainer />
    </LayerProvider>
  );
};

export default App;
