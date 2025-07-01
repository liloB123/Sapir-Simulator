import { Play } from "lucide-react";
import { useLayers } from "../../hooks/useLayers";
import { useState, type FC } from "react";
import HeatMapSavingModal from "./HeatMapSavingModal";

const HeatMapSavingButton: FC = () => {
    const [layers] = useLayers()
    const [isModalOpen, setIsModalOpen] = useState(false);

    const hasNoActiveLayers = !Object.values(layers).some(layer => layer.isActive);

    return (
        <>
            <button
                disabled={hasNoActiveLayers}
                onClick={() => { setIsModalOpen(true) }}
                style={{
                    cursor: hasNoActiveLayers ? 'not-allowed' : 'pointer',
                    background: hasNoActiveLayers ? '#d1d5db' : undefined
                }}
                className={`h-[7%] w-full text-lg flex justify-center gap-2 items-center ${hasNoActiveLayers
                    ? 'text-gray-500'
                    : 'bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-500 hover:to-blue-500'
                    }`}
            >
                שמירת מפת החום
                <Play className="w-5 h-5" />
            </button>

            {isModalOpen && <HeatMapSavingModal onClose={() => setIsModalOpen(false)} />}
        </>
    )
}

export default HeatMapSavingButton
