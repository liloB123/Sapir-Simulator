import type { FC } from 'react';
import { LayersProvider, type LayerName } from './contexts/LayersMenuContext';
import MapContainer from './components/MapContainer';

const initialLayers: Record<LayerName, boolean> = {
  "border_distance": false,
  "settlements_distance": false,
  "israeli_polygons": false,
  "cross_border_polygons": false,
  "strategic_points": false
};

const App: FC = () => {
  return (
    <LayersProvider initialLayers={initialLayers}>
      <MapContainer/>
    </LayersProvider>
  );
};

export default App;
