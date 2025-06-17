import type React from "react"
import { useActiveLayersCount } from "../contexts/LayersMenuContext"

const ActiveLayersCounter: React.FC = () => {
    const activeLayersCounte = useActiveLayersCount()

    return (
        <div className="border rounded-2xl self-center pr-2 pl-2 p-1">
            <p className="text-white text-sm">פעילות {activeLayersCounte}/5</p>
        </div>
    )
}

export default ActiveLayersCounter