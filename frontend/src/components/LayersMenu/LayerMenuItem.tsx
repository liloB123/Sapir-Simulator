import { type FC } from 'react';
import { useLayers } from "../../hooks/useLayers";
import LayerMenuItemToggle from './LayerMenuItemToggle';
import type { LayerName } from '../../contexts/LayersMenuContext';
import { layerMenuItems, type LayerMenuItemDetailsConfig } from './consts';
import ExtraSettings from './LayerMenuItemExtraSettingsButton';
import LayerMenuItemExtraSettingsButton from './LayerMenuExtraSettings';

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


export type LayerMenuItemProps = {
  name: LayerName;
}

const LayerMenuItem: FC<LayerMenuItemProps> = ({ name }) => {
  const [layers] = useLayers();
  const { isActive, isExpended } = layers[name];

  return (
    <div
      className={`p-3 border bg-slate-800/30 rounded-lg flex flex-col gap-2 justify-center min-h-20 ${
        isActive
          ? "border-cyan-500/30 shadow-lg shadow-cyan-500/10"
          : "border-white/10 hover:border-white/20"
      }`}
    >
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-4 w-20 justify-between">
          <LayerMenuItemExtraSettingsButton name={name} />
          <LayerMenuItemToggle name={name} isActive={isActive} />
        </div>
        <LayerMenuItemDetails {...layerMenuItems[name]} />
      </div>
      {isExpended && (
          <ExtraSettings name={name} />
      )}
    </div>
  );
};

export default LayerMenuItem
