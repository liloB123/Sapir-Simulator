import { createContext, useState } from "react";
import type { FC, PropsWithChildren, Dispatch, SetStateAction } from 'react';
import type { layerMenuItemName } from "../components/layerMenuConsts";

type LayersState = Record<layerMenuItemName, boolean>;

export type LayersContextType = [
    LayersState,
    Dispatch<SetStateAction<LayersState>>
];

export const LayersContext = createContext<LayersContextType | undefined>(undefined);

type LayersProviderProps = PropsWithChildren<{ initialLayers: LayersState }>

export const LayersProvider: FC<LayersProviderProps> = ({ children, initialLayers }) => {
    const [layers, setLayers] = useState<LayersState>(initialLayers)

    return (
        <LayersContext.Provider value={[layers, setLayers]}>
            {children}
        </LayersContext.Provider>
    );
};

