import type { FC } from "react";
import type { LayersCombinationOptionConfig } from "./consts";
import { useLayers } from "../../hooks/useLayers";

type CombinationOptionProps = LayersCombinationOptionConfig

const CombinationOption: FC<CombinationOptionProps> = ({ label, description }) => {
    const [, , combinationMethod, setCombinationMethod] = useLayers()

    return (
        <label className="w-[100%] h-12 px-3 py-1 border bg-slate-800/30 rounded-md flex items-center justify-between border-white/10 hover:border-white/20 mx-auto text-xs">
            <input
                type="radio"
                name={`v-option`}
                checked={combinationMethod === label}
                value={label}
                onChange={() =>
                    setCombinationMethod(label)
                }
                className="appearance-none w-3 h-3 border-2 border-cyan-100 rounded-full checked:bg-cyan-500 transition-all duration-200 shadow-sm mr-2"
            />
            <div className="flex-row">
                <p className="text-base font-semibold text-white text-right">{label}</p>
                <p className="text-xs text-gray-500 text-right">{description}</p>
            </div>
        </label>
    );
}

export default CombinationOption
