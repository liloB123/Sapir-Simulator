import type { FC } from 'react';
import { LayersProvider, type LayersState } from './contexts/LayersMenuContext';
import MapContainer from './components/MapContainer';

const initialLayers: LayersState = {
  "מרחק מקו הגבול": false,
  "מרחק מיישובים מרכזיים": false,
  "פוליגונים בשטח ישראלי": false,
  "פוליגונים חוצי גבולות": false,
  "נקודות אסטרטגיות": false
};

const App: FC = () => {
  return (
    <LayersProvider initialLayers={initialLayers}>
      <MapContainer />
    </LayersProvider>
  );
};

export default App;
