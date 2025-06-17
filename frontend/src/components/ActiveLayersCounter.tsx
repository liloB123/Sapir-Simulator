import type React from "react"
import { useActiveLayersCount, useLayer } from "../contexts/LayersMenuContext"

const ActiveLayersCounter: React.FC = () => {
    const activeLayersCounter = useActiveLayersCount()

    const { layers: layers } = useLayer();
    const layersAmount = Object.entries(layers).length

    return (
        <div className="border rounded-2xl self-center pr-2 pl-2 p-1">
            <p className="text-white text-sm">פעילות {activeLayersCounter}/{layersAmount}</p>
        </div>
    )
}

export default ActiveLayersCounter