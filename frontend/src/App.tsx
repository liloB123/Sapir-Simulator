import type { FC } from 'react';
import { LayersProvider, type LayerName, type LayerSettings } from './contexts/LayersMenuContext';
import MapContainer from './components/MapContainer';

const initialLayers: Record<LayerName, LayerSettings> = {
  border_distance: { isActive: false, isExpended: false, selectedOption: "לינארי" },
  settlements_distance: { isActive: false, isExpended: false, selectedOption: "לינארי" },
  israeli_polygons: { isActive: false, isExpended: false, selectedOption: "לינארי" },
  cross_border_polygons: { isActive: false, isExpended: false, selectedOption: "לינארי" },
  strategic_points: { isActive: false, isExpended: false, selectedOption: "לינארי" }
};

const App: FC = () => {
  return (
    <LayersProvider initialLayers={initialLayers}>
      <MapContainer />
    </LayersProvider>
  );
};

export default App;
