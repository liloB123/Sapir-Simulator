import { createContext, useState } from "react";
import type { FC, PropsWithChildren } from 'react';

export type LayersState = Record<string, boolean>;

export type LayersContextType = [
    LayersState,
    React.Dispatch<React.SetStateAction<LayersState>>
];

export const LayersContext = createContext<LayersContextType | undefined>(undefined);

type LayersProviderProps = PropsWithChildren<{initialLayers?: LayersState}>

export const LayersProvider: FC<LayersProviderProps> = ({ children, initialLayers = {} }) => {
    const [layers, setLayers] = useState<LayersState>(initialLayers)

    return (
        <LayersContext.Provider value={[layers, setLayers]}>
            {children}
        </LayersContext.Provider>
    );
};

