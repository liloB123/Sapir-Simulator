import type { FC } from 'react';
import LayerMenuItem from "./LayerMenuItem"
import ActiveLayersCounter from "./ActiveLayersCounter";
import { useLayers } from '../../hooks/useLayers';
import type { LayerName } from '../../contexts/LayersMenuContext';

type LayersMenuProps = {
  isOpen: boolean;
}

const LayersMenu: FC<LayersMenuProps> = ({ isOpen }) => {
  const [layers,] = useLayers()

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed top-5 right-25 z-40 bg-black rounded-lg shadow-lg p-6 w-92 h-[60vh] transform transition-all duration-300 ease-out"
      >
        <div className="flex flex-col h-full space-y-4">
          <div className="flex justify-between">
            <ActiveLayersCounter />
            <h2 className="text-lg font-bold text-white mb-4 self text-right">שכבות גאורפיות</h2>
          </div>
          <div className="overflow-y-auto space-y-4 pr-1 flex-1">
            {(Object.keys(layers) as LayerName[]).map((layer) => (
              <LayerMenuItem
                key={layer}
                name={layer}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LayersMenu
