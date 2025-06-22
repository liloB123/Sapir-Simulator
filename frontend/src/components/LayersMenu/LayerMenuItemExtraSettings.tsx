import { type FC } from "react";
import type { LayerName } from "../../contexts/LayersMenuContext";
import ExtraSettingsOptions from "./ExtraSettingsOptions";
import { extraSettingOptions } from "./consts";
import { useLayers } from "../../hooks/useLayers";

interface ExtraSettingsProps {
    name: LayerName;
}

const ExtraSettings: FC<ExtraSettingsProps> = ({ name }) => {
    const [layers, setLayers] = useLayers();

    return (
        <div className="mt-3 px-2 text-sm text-white space-y-2 transition-all text-center">
            <p className="text-s text-right">אלגוריתם אינטרפולציה</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-evenly">
                {extraSettingOptions.map((option) => (
                    <ExtraSettingsOptions key={option.lable} name={name} {...option} />
                ))}
            </div>
            {layers[name].selectedOption === "אקספוננציאלי" && (
                <>
                    <p className="text-right text-xs">:בסיס</p>
                    <input
                        className="w-full px-3 py-1 rounded bg-slate-800/30 text-white text-xs border border-white/10 focus:outline-none focus:border-gray-500 hover:border-white/20 text-right"
                        value={layers[name].base ?? ""}
                        onChange={(e) =>
                            setLayers((prev) => ({
                                ...prev,
                                [name]: {
                                    ...prev[name],
                                    base: parseFloat(e.target.value) || 0,
                                },
                            }))
                        }
                    />
                </>
            )}
        </div>
    );
};

export default ExtraSettings;
