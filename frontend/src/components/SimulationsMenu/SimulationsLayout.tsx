import { Outlet } from "react-router-dom";
import SimulationsSidebar from "./SimulationsSidear";

const SimulationsLayout: React.FC = () => (
  <div className="flex">
    <SimulationsSidebar />
    <div className="flex-1">
      <Outlet />
    </div>
  </div>
);

export default SimulationsLayout;
