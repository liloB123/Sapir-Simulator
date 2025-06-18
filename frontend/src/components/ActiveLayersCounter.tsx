/* eslint-disable @typescript-eslint/no-unused-vars */
import type { FC } from 'react';
import { useLayers } from "../hooks/useLayer";

const ActiveLayersCounter: FC = () => {
    const [layers, _] = useLayers();

    const activeLayersAmount = (): number => {
        return Object.values(layers).filter(Boolean).length;
    }

    const layersAmount = Object.entries(layers).length

    return (
        <div className="border rounded-2xl self-center pr-2 pl-2 p-1">
            <p className="text-white text-sm" dir="rtl">{activeLayersAmount()}/{layersAmount} פעילות</p>
        </div>
    )
}

export default ActiveLayersCounter