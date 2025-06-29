// SimulationsSidebar.tsx
import { NavLink } from 'react-router-dom';

const SimulationsSidebar = () => {
  return (
    <div className="fixed right-0 top-12 w-40 px-3 py-4 flex flex-col gap-4 text-sm text-right bg-gray-100 h-full">
      <NavLink
        to="/simulations"
        className={({ isActive }) =>
          isActive ? "text-cyan-500! font-bold" : "text-gray-500! hover:text-cyan-400"
        }
      >
        סימולציות אחרונות
      </NavLink>

      <NavLink
        to="/simulations/another"
        className={({ isActive }) =>
          isActive ? "text-cyan-500! font-bold" : "text-gray-500! hover:text-cyan-400"
        }
      >
        עוד אפשרות
      </NavLink>
    </div>
  );
};

export default SimulationsSidebar;
