import React, { useState } from 'react';
import SimulationMenuItem from './SimulationMenuItem';
import type { Simulation } from '../../types/Simulation';
import { simulationsMenuItems } from '../../tempData/Simulations';

const SimulationsMenu: React.FC = () => {
  const [items, setItems] = useState<Simulation[]>(simulationsMenuItems);

  const handleRefresh = () => {
    setItems([...simulationsMenuItems]);
  };

  return (
    <div className="pt-16 p-2 flex justify-center" dir="rtl">
      <div className="w-full max-w-2xl bg-white p-5 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-6" dir="rtl">
          <h1 className="!text-xl font-bold text-gray-800">סימולציות אחרונות</h1>
          <button
            onClick={handleRefresh}
            className="flex items-center text-black gap-2 text-sm !border-gray-50 !border-[1px] px-3 py-1.5 rounded-md hover:bg-gray-50 !bg-white"
          >
            🔄 רענן
          </button>
        </div>

        <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto pr-1">
          {items.map((item, idx) => (
            <SimulationMenuItem
              key={idx}
              title={item.title}
              subtitle={item.subtitle}
              status={item.status}
              onView={() => console.log('View', item.title)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimulationsMenu;
