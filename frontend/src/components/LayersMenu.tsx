import type React from "react";
import Layer from "./Layer"
import type { LucideIcon } from "lucide-react";
import ActiveLayersCounter from "./ActiveLayersCounter";

interface LayersMenuProps {
  isOpen: boolean;
  onClose: () => void
  layers: Array<{ name: string; icon: LucideIcon; color: string; description: string }>;
}

const LayersMenu: React.FC<LayersMenuProps> = ({ isOpen, onClose, layers: layers }) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        onClick={onClose}
      />
      <div
        className="fixed top-5 right-25 z-40 bg-black rounded-lg shadow-lg p-6 w-90 transform transition-all duration-300 ease-out"
      >
        <div className="space-y-4">
          <div className="flex justify-between">
            <ActiveLayersCounter />
            <h2 className="text-lg font-bold text-white mb-4 self text-right">שכבות גאורפיות</h2>
          </div>
          {layers.map((item) => (
            <Layer
              key={item.name}
              name={item.name}
              icon={item.icon}
              color={item.color}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default LayersMenu