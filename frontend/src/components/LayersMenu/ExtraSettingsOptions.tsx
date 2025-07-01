import type { FC } from "react";
import { useLayers } from "../../hooks/useLayers";
import { defaultExponentialBase, type ExtraSettingOptionsConfig } from "./consts";
import type { LayerName, LayerSettings } from "../../contexts/LayersMenuContext";

type ExtraSettingsOptionsProps = ExtraSettingOptionsConfig & { name: LayerName }

const ExtraSettingsOptions: FC<ExtraSettingsOptionsProps> = ({ label, Icon, name }) => {
    const [layers, setLayers] = useLayers()

    const hasBase = (layer: LayerSettings): layer is LayerSettings & { base: number } =>
        "base" in layer;

    const handleChange = () => {
        setLayers(prev => {
            const shouldInitBase = label === "אקספוננציאלי" && (!hasBase(prev[name]) || typeof prev[name].base !== "number");

            return {
                ...prev,
                [name]: {
                    ...prev[name],
                    selectedOption: label,
                    ...(shouldInitBase ? { base: defaultExponentialBase } : {})
                }
            };
        });
    }

    return (
        <label className="p-2 border bg-slate-800/30 rounded-lg gap-1 min-w-0 flex flex-1 items-center justify-between border-white/10 hover:border-white/20">
            <input
                type="radio"
                name={name + '-option'}
                value={label}
                checked={layers[name].selectedOption === label}
                onChange={handleChange}
                className="appearance-none w-3 h-3 border-2 border-cyan-100 rounded-full checked:bg-cyan-500 transition-all duration-200 shadow-sm"
            />
            <div className="flex gap-1 items-center">
                <Icon />
                <p className="text-xs">{label}</p>
            </div>
        </label>
    )
}

export default ExtraSettingsOptions
