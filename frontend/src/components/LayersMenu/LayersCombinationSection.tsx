import type { FC } from "react";
import { layersCombintaionOptions } from "./consts";
import CombinationOption from "./CombinationsOption";

const LayersCombinationSection: FC = () => {
    return (
        <div className="p-2 border border-white/30 rounded-lg bg-slate-800/30 h-[35%] flex flex-col justify-evenly">
            <h2 className="text-l font-bold text-white self text-right">שיטת איחוד מפות החום</h2>
            <div className="border rounded-md p-4">
                <div className="flex flex-col items-center gap-3">
                    {layersCombintaionOptions.map((option) => (
                        <CombinationOption
                            key={option.label}
                            label={option.label}
                            description={option.description}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LayersCombinationSection
