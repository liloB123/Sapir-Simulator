/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useState } from "react";
import type { FC, PropsWithChildren, Dispatch, SetStateAction } from 'react';

const layerNames = ["border_distance", "settlements_distance", "israeli_polygons", "cross_border_polygons", "strategic_points"] as const;

export type LayerName = (typeof layerNames)[number]

export type LayersContextType = [
    Record<LayerName, boolean>,
    Dispatch<SetStateAction<Record<LayerName, boolean>>>
];

export const LayersContext = createContext<LayersContextType | undefined>(undefined);

type LayersProviderProps = PropsWithChildren<{ initialLayers: Record<LayerName, boolean> }>

export const LayersProvider: FC<LayersProviderProps> = ({ children, initialLayers }) => {
    const [layers, setLayers] = useState<Record<LayerName, boolean>>(initialLayers)

    return (
        <LayersContext.Provider value={[layers, setLayers]}>
            {children}
        </LayersContext.Provider>
    );
};

