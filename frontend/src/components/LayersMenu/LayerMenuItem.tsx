import type { FC } from 'react';
import { Settings2 } from "lucide-react";
import { useLayers } from "../../hooks/useLayers";
import LayerMenuItemToggle from './LayerMenuItemToggle';
import type { LayerName } from '../../contexts/LayersMenuContext';
import { layerMenuItems, type LayerMenuItemDetailsConfig } from './layerMenuConsts';

const LayerMenuItemDetails: FC<LayerMenuItemDetailsConfig> = ({ displayName, Icon, description }) =>
  <div className="flex items-center gap-3">
    <div className="flex flex-col items-end text-right">
      <span className="text-xs font-medium text-white cursor-default">
        {displayName}
      </span>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
    <Icon />
  </div>


const LayerMenuItemExtraSettingsButton: FC = () =>
  <button
    aria-label="Settings"
    type="button"
    style={{ background: 'transparent', padding: 0, border: 'none' }}
  >
    <Settings2 className="text-white w-4 h-4" />
  </button>;

export type LayerMenuItemProps = {
  name: LayerName;
}

const LayerMenuItem: FC<LayerMenuItemProps> = ({ name }) => {
  const [layers,] = useLayers()
  const isActive = layers[name];

  return (
    <div
      className={`p-3 border bg-slate-800/30 rounded-lg flex justify-between items-center h-22 gap-4 ${isActive
        ? "border-cyan-500/30 shadow-lg shadow-cyan-500/10"
        : "border-white/10 hover:border-white/20"
        }`}
    >
      <div className="flex items-center gap-4 w-20 justify-between">
        <LayerMenuItemExtraSettingsButton />
        <LayerMenuItemToggle
          name={name}
          isActive={isActive} />
      </div>
      <LayerMenuItemDetails {...layerMenuItems[name]} />
    </div>
  );
};

export default LayerMenuItem
