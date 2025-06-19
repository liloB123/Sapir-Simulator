import { createContext, useState } from "react";
import type { FC, PropsWithChildren, Dispatch, SetStateAction } from 'react';
import type { layerMenuItemName } from "../components/layerMenuConsts";

export type LayersContextType = [
    Record<layerMenuItemName, boolean>,
    Dispatch<SetStateAction<Record<layerMenuItemName, boolean>>>
];

export const LayersContext = createContext<LayersContextType | undefined>(undefined);

type LayersProviderProps = PropsWithChildren<{ initialLayers: Record<layerMenuItemName, boolean> }>

export const LayersProvider: FC<LayersProviderProps> = ({ children, initialLayers }) => {
    const [layers, setLayers] = useState<Record<layerMenuItemName, boolean>>(initialLayers)

    return (
        <LayersContext.Provider value={[layers, setLayers]}>
            {children}
        </LayersContext.Provider>
    );
};

