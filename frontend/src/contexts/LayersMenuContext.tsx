/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useState } from "react";
import type { FC, PropsWithChildren, Dispatch, SetStateAction } from 'react';

const layerMenuItemNames = ["border_distance", "settlements_distance", "israeli_polygons", "cross_border_polygons", "strategic_points"] as const;

export type layerMenuItemName = (typeof layerMenuItemNames)[number]

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

