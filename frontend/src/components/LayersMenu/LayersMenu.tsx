import { type FC } from 'react';
import LayerMenuItem from "./LayerMenuItem"
import ActiveLayersCounter from "./ActiveLayersCounter";
import { useLayers } from '../../hooks/useLayers';
import type { LayerName } from '../../contexts/LayersMenuContext';
import LayersCombinationSection from './LayersCombinationSection';
import { Play } from 'lucide-react';

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

export const ButtonToSimulationPage: FC = () => {
  const [layers] = useLayers()

  const hasNoActiveLayers = !Object.values(layers).some(layer => layer.isActive);

  return (
    <button
      disabled={hasNoActiveLayers}
      onClick={() => console.log("Clicked")}
      style={{
        cursor: hasNoActiveLayers ? 'not-allowed' : 'pointer',
        background: hasNoActiveLayers ? '#d1d5db' : undefined
      }}
      className={`h-[7%] w-full text-lg flex justify-center gap-2 items-center ${
        hasNoActiveLayers 
          ? 'text-gray-500' 
          : 'bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-500 hover:to-blue-500'
      }`}
    >
      מעבר לדף הסימולציות
      <Play className="w-5 h-5" />
    </button>
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
          <ButtonToSimulationPage />
        </div>
      </div>
    </>
  );
};

export default LayersMenu
