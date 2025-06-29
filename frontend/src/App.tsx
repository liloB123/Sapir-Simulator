import type { FC } from 'react';
import { LayersProvider, type LayerName } from './contexts/LayersMenuContext';
import MapContainer from './components/map/MapContainer';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import SimulationsMenu from './components/SimulationsMenu/SimulationsMenu';
import SimulationsLayout from './components/SimulationsMenu/SimulationsLayout';


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
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<MapContainer />} />
          <Route path="/simulations" element={<SimulationsLayout />}>
            <Route index element={<SimulationsMenu />} /> 
          </Route>
        </Routes>
      </Router>
    </LayersProvider>
  );
};

export default App;
