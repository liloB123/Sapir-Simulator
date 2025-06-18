/* eslint-disable @typescript-eslint/no-unused-vars */
import type { FC } from 'react';
import { Settings2 } from "lucide-react";
import { useLayers } from "../hooks/useLayers";

interface LayerMenuItemDetailsProps {
  name: string;
  description: string;
}

const LayerMenuItemDetails: FC<LayerMenuItemDetailsProps> = ({ name, description }) => {
  return (
    <div className="flex flex-col items-end text-right">
      <span className="text-xs font-medium text-white cursor-default">
        {name}
      </span>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  );
};


interface LayerMenuItemToggleProps {
  name: string;
  isActive: boolean;
}

const LayerMenuItemToggle: FC<LayerMenuItemToggleProps> = ({ name, isActive }) => {
  const [_, setLayers] = useLayers()

  const setLayer = (key: string, value: boolean) => {
    setLayers(prev => ({ ...prev, [key]: value }));
  }

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        onChange={() => setLayer(name, !isActive)}
        checked={isActive}
      />
      <div
        className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none
                  dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full
                  rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute
                  after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full
                  after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-cyan-500 dark:peer-checked:bg-blue-600"
      ></div>
    </label>
  )
}


const LayerMenuItemExtraSettingsButton: FC = () => {
  return (
    <button
      aria-label="Settings"
      type="button"
      style={{ background: 'transparent', padding: 0, border: 'none' }}
    >
      <Settings2 className="text-white w-4 h-4" />
    </button>
  )
}


interface LayerMenuItemProps {
  name: string;
  Icon: FC;
  description: string
}

const LayerMenuItem: FC<LayerMenuItemProps> = ({ name, Icon, description }) => {
  const [layers, _] = useLayers()
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
      <div className="flex items-center gap-3">
        <LayerMenuItemDetails
          name={name}
          description={description} />
        <Icon/>
      </div>
    </div>
  );
};

export default LayerMenuItem