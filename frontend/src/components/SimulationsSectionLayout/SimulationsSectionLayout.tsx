import { Outlet } from "react-router-dom";
import SimulationsSidebar from "./SimulationsSidear";

const SimulationsSectionLayout: React.FC = () => (
  <div className="">
    <SimulationsSidebar />
    <div className="h-screen w-screen flex items-center justify-center bg-slate-100">
      <Outlet />
    </div>
  </div>
);

export default SimulationsSectionLayout;
