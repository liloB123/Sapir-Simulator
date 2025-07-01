import type { FC } from 'react';
import { LayersProvider, type LayerName } from './contexts/LayersMenuContext';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import SimulationsMenu from './components/SimulationsMenu/SimulationsMenu';
import SimulationsLayout from './components/SimulationsMenu/SimulationsLayout';
import SimulationWizard from './components/SimulationsMenu/SimulationsWizard';
import { type LayerSettings } from './contexts/LayersMenuContext';
import MapContainer from './components/MapContainer';

const initialLayers: Record<LayerName, LayerSettings> = {
  border_distance: { isActive: false, isExpanded: false, selectedOption: "לינארי" },
  settlements_distance: { isActive: false, isExpanded: false, selectedOption: "לינארי" },
  israeli_polygons: { isActive: false, isExpanded: false, selectedOption: "לינארי" },
  cross_border_polygons: { isActive: false, isExpanded: false, selectedOption: "לינארי" },
  strategic_points: { isActive: false, isExpanded: false, selectedOption: "לינארי" }
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
            <Route path='wizard' element={<SimulationWizard/>} />
          </Route>
        </Routes>
      </Router>
    </LayersProvider>
  );
};

export default App;
