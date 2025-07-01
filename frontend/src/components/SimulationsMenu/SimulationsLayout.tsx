import { Outlet } from "react-router-dom";
import SimulationsSidebar from "./SimulationsSidear";

const SimulationsLayout: React.FC = () => (
  <div className="">
    <SimulationsSidebar />
    <div className="w-[600vw]">
      <Outlet />
    </div>
  </div>
);

export default SimulationsLayout;
