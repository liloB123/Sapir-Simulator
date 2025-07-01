/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useState } from "react";
import type { FC, PropsWithChildren, Dispatch, SetStateAction } from 'react';

const layerNames = ["border_distance", "settlements_distance", "israeli_polygons", "cross_border_polygons", "strategic_points"] as const;
export type LayerName = (typeof layerNames)[number]

const optionsNames = ["לינארי", "אקספוננציאלי"] as const
export type OptionsName = (typeof optionsNames)[number]

type BaseLayerSettings = {
    isActive: boolean;
    isExpanded: boolean;
};

type ExtraSettingsForLayer =
    | { selectedOption: null }
    | { selectedOption: "לינארי" }
    | { selectedOption: "אקספוננציאלי"; base: number; };

export type LayerSettings = BaseLayerSettings & ExtraSettingsForLayer;

export type LayersContextType = [
    Record<LayerName, LayerSettings>,
    Dispatch<SetStateAction<Record<LayerName, LayerSettings>>>
];

export const LayersContext = createContext<LayersContextType | undefined>(undefined);

type LayersProviderProps = PropsWithChildren<{ initialLayers: Record<LayerName, LayerSettings> }>

export const LayersProvider: FC<LayersProviderProps> = ({ children, initialLayers }) => {
    const [layers, setLayers] = useState<Record<LayerName, LayerSettings>>(initialLayers)

    return (
        <LayersContext.Provider value={[layers, setLayers]}>
            {children}
        </LayersContext.Provider>
    );
};
