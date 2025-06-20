import { type FC } from "react";
import type { LayerName } from "../../contexts/LayersMenuContext";
import ExtraSettingsOptions from "./ExtraSettingsOptions";
import { extraSettingOptions } from "./consts";

interface ExtraSettingsProps {
    name: LayerName;
}

const ExtraSettings: FC<ExtraSettingsProps> = ({ name }) =>
    <div className="mt-3 px-2 text-sm text-white space-y-2 transition-all flex-col text-center">
        <p className="text-xs text-right">אלגוריתם אינטרפולציה</p>
        <div className="flex gap-4">
            {extraSettingOptions.map((option) => {
                return (
                    <ExtraSettingsOptions
                        name={name}
                        {...option} />
                )
            })}
        </div>
    </div>;

export default ExtraSettings;