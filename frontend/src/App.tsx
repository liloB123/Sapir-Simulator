import type { FC } from 'react';
import { LayersProvider, type LayerName, type LayerSettings } from './contexts/LayersMenuContext';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import SimulationsMenu from './components/SimulationsMenu/SimulationsMenu';
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
      <Router>
        <Navbar />
          <Routes>
            <Route path='/' element={<MapContainer />} />
            <Route path='/simulations' element={<SimulationsMenu />} />
          </Routes>
      </Router>
    </LayersProvider>
  );
};

export default App;
