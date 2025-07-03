import React from 'react';
import type { SimulationStatus } from '../../types/Simulation';

type SimulationItemProps = {
  title: string;
  subtitle: string;
  status: SimulationStatus;
  statusColor?: string;
  onView?: () => void;
};

const statusColors: Record<string, string> = {
  'הושלם': 'bg-green-100 text-green-700',
  'ממתין': 'bg-yellow-100 text-yellow-700',
  'רץ': 'bg-blue-100 text-blue-700',
};

const SimulationMenuItem: React.FC<SimulationItemProps> = ({
  title,
  subtitle,
  status,
  statusColor,
  onView,
}) => {
  const isClickable = status === 'הושלם';

  return (
    <div
      className={`flex justify-between items-center p-4 rounded-lg
        ${isClickable ? 'bg-gray-50 hover:bg-gray-100 cursor-pointer' : 'bg-gray-50 cursor-default'}`}
      dir="rtl"
      onClick={isClickable ? onView : undefined}
    >
      <div className="flex flex-col text-right">
        <span className="text-gray-800 font-medium">{title}</span>
        <span className="text-sm text-gray-500 mt-1">{subtitle}</span>
      </div>

      <div className="flex items-center gap-3">
        <span
          className={`text-xs px-2 py-0.5 rounded-full ${statusColors[status] || statusColor || 'bg-gray-200 text-gray-700'}`}
        >
          {status}
        </span>
        <div className={`text-sm whitespace-nowrap ${isClickable ? 'text-blue-500' : 'text-gray-400'}`}>
          ↗ צפה
        </div>
      </div>
    </div>
  );
};

export default SimulationMenuItem;
