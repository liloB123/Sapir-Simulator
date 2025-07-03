import { type FC } from "react";
import type { LayerName } from "../../contexts/LayersMenuContext";
import ExtraSettingsOptions from "./ExtraSettingsOptions";
import { defaultExponentialBase, extraSettingOptions } from "../LayersMenu/consts";
import { useLayers } from "../../hooks/useLayers";
import ExponentialBaseSlider from "./ExponentialBaseSlider";

type ExtraSettingsProps = {
    name: LayerName;
}

const ExtraSettings: FC<ExtraSettingsProps> = ({ name }) => {
    const [layers, setLayers] = useLayers();

    const selectLinear = () =>
        setLayers(prev => ({
            ...prev,
            [name]: { ...prev[name], selectedOption: "לינארי" },
        }));

    const selectExponential = () =>
        setLayers(prev => {
            const base =
                "base" in prev[name] && typeof prev[name].base === "number"
                    ? prev[name].base
                    : defaultExponentialBase;

            return {
                ...prev,
                [name]: { ...prev[name], selectedOption: "אקספוננציאלי", base },
            };
        });

    return (
        <div className="mt-3 px-2 text-sm text-white space-y-2 transition-all text-center">
            <p className="text-s text-right">אלגוריתם אינטרפולציה</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-evenly">
                <ExtraSettingsOptions
                    name={name}
                    label="לינארי"
                    Icon={extraSettingOptions.find(option => option.label === "לינארי")!.Icon}
                    onChange={selectLinear}
                />
                <ExtraSettingsOptions
                    name={name}
                    label="אקספוננציאלי"
                    Icon={extraSettingOptions.find(option => option.label === "אקספוננציאלי")!.Icon}
                    onChange={selectExponential}
                />
            </div>
            {
                layers[name].selectedOption === "אקספוננציאלי" && <ExponentialBaseSlider name={name} />
            }
        </div>
    );
};

export default ExtraSettings;
