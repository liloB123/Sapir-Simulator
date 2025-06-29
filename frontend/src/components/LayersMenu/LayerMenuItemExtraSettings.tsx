import { type FC } from "react";
import type { LayerName } from "../../contexts/LayersMenuContext";
import ExtraSettingsOptions from "./ExtraSettingsOptions";
import { extraSettingOptions } from "./consts";
import { useLayers } from "../../hooks/useLayers";
import BaseSlider from "./ExponentialBaseSlider";

type ExtraSettingsProps = {
    name: LayerName;
}

const ExtraSettings: FC<ExtraSettingsProps> = ({ name }) => {
    const [layers, ] = useLayers();

    return (
        <div className="mt-3 px-2 text-sm text-white space-y-2 transition-all text-center">
            <p className="text-s text-right">אלגוריתם אינטרפולציה</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-evenly">
                {extraSettingOptions.map((option) => (
                    <ExtraSettingsOptions key={option.label} name={name} {...option} />
                ))}
            </div>
            {
                layers[name].selectedOption === "אקספוננציאלי" && <BaseSlider name={name}/>
            }
        </div>
    );
};

export default ExtraSettings;
