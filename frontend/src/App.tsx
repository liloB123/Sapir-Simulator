import type { FC } from 'react';
import { LayersProvider } from './contexts/LayersMenuContext';
import MapContainer from './components/MapContainer';
import type { layerMenuItemName } from './components/layerMenuConsts';

const initialLayers: Record<layerMenuItemName, boolean> = {
  "border_distance": false,
  "settlements_distance": false,
  "israeli_polygons": false,
  "cross_border_polygons": false,
  "strategic_points": false
};

const App: FC = () => {
  return (
    <LayersProvider initialLayers={initialLayers}>
      <MapContainer
        layersNames={Object.keys(initialLayers) as layerMenuItemName[]} />
    </LayersProvider>
  );
};

export default App;
