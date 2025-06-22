import type { FC } from 'react';
import { LayersProvider, type LayerName, type LayerSettings } from './contexts/LayersMenuContext';
import MapContainer from './components/MapContainer';

const initialLayers: Record<LayerName, LayerSettings> = {
  border_distance: { isActive: false, isExpended: false, selectedOption: null },
  settlements_distance: { isActive: false, isExpended: false, selectedOption: null },
  israeli_polygons: { isActive: false, isExpended: false, selectedOption: null },
  cross_border_polygons: { isActive: false, isExpended: false, selectedOption: null },
  strategic_points: { isActive: false, isExpended: false, selectedOption: null }
};

const App: FC = () => {
  return (
    <LayersProvider initialLayers={initialLayers}>
      <MapContainer />
    </LayersProvider>
  );
};

export default App;
