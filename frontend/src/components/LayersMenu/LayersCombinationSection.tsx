import type { FC } from "react";
import { layersCombintaionOptions } from "./consts";
import CombinationOption from "./CombinationsOption";
import { Play } from "lucide-react";

const LayersCombinationSection: FC = () => {
    return (
        <div className="p-2 border border-white/30 rounded-lg bg-slate-800/30 h-[45%] flex flex-col justify-evenly">
            <h2 className="text-l font-bold text-white self text-right">איחוד משטחים</h2>
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
            <button
                className="h-[20%] w-full bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-500 hover:to-blue-500 text-lg flex justify-center gap-2 items-center"
            >
                יצירת משטח מאוחד
                <Play className="w-5 h-5" />     
            </button>
        </div>
    )
}

export default LayersCombinationSection
