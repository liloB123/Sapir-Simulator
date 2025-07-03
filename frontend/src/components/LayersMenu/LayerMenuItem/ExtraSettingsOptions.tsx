import type { ChangeEventHandler, FC } from "react";
import { useLayers } from "../../../hooks/useLayers";
import { type ExtraSettingOptionsConfig } from "../consts";
import type { LayerName } from "../../../contexts/LayersMenuContext";

type ExtraSettingsOptionsProps = ExtraSettingOptionsConfig & { name: LayerName, onChange: ChangeEventHandler<HTMLInputElement> }

const ExtraSettingsOptions: FC<ExtraSettingsOptionsProps> = ({ label, Icon, name, onChange }) => {
    const [layers,] = useLayers()

    return (
        <label className="p-2 border bg-slate-800/30 rounded-lg gap-2 min-w-0 flex flex-1 items-center justify-end border-white/10 hover:border-white/20">
            <div className="flex gap-1 items-center flex-right">
                <Icon />
                <p className="text-xs">{label}</p>
            </div>
            <input
                type="radio"
                name={name + '-option'}
                value={label}
                checked={layers[name].selectedOption === label}
                onChange={onChange}
                className="appearance-none w-3 h-3 border-2 border-cyan-100 rounded-full checked:bg-cyan-500 transition-all duration-200 shadow-sm"
            />
        </label>
    )
}

export default ExtraSettingsOptions
