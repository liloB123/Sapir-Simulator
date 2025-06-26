import { type FC } from 'react';
import LayerMenuItem from "./LayerMenuItem"
import ActiveLayersCounter from "./ActiveLayersCounter";
import { useLayers } from '../../hooks/useLayers';
import type { LayerName } from '../../contexts/LayersMenuContext';
import LayersCombinationSection from './LayersCombinationSection';
import HeatMapSavingButton from './HeatMapSavingButton';

const LayersSelectionSection: FC = () => {
  const [layers,] = useLayers()

  return (
    <div className="border border-white/30 rounded-lg p-2 flex-1 flex flex-col min-h-0 bg-slate-800/30">
      <div className="flex justify-between mb-4 i items-center">
        <ActiveLayersCounter />
        <h2 className="text-l font-bold text-white self text-right">שכבות גאוגרפיות</h2>
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
  )
}

type LayersMenuProps = {
  isOpen: boolean;
}

const LayersMenu: FC<LayersMenuProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed top-5 right-25 z-40 bg-black rounded-lg shadow-lg p-6 w-95 h-[95vh] transform transition-all duration-300 ease-out"
      >
        <div className="flex flex-col h-full gap-4">
          <LayersCombinationSection />
          <LayersSelectionSection />
          <HeatMapSavingButton />
        </div>
      </div>
    </>
  );
};

export default LayersMenu
