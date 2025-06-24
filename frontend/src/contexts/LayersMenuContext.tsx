/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useState } from "react";
import type { FC, PropsWithChildren, Dispatch, SetStateAction } from 'react';

const layerNames = ["border_distance", "settlements_distance", "israeli_polygons", "cross_border_polygons", "strategic_points"] as const;
export type LayerName = (typeof layerNames)[number]

const extraSettingsoptionsNames = ["לינארי", "אקספוננציאלי"] as const
export type ExtraSettingsOptionsName = (typeof extraSettingsoptionsNames)[number]

const combinationOptionsNames = ["ממוצע משוכלל", "ערך מקסימלי"] as const
export type CombinationOptionsName = (typeof combinationOptionsNames)[number]

type SharedLayerSettings = {
    isActive: boolean;
    isExpended: boolean;
};

export type LayerSettings =
    | (SharedLayerSettings & { selectedOption: typeof extraSettingsoptionsNames[0] })
    | (SharedLayerSettings & { selectedOption: typeof extraSettingsoptionsNames[1]; base: number; })
    | (SharedLayerSettings & { selectedOption: null });

export type LayersContextType = [
    layers: Record<LayerName, LayerSettings>,
    setLayers: Dispatch<SetStateAction<Record<LayerName, LayerSettings>>>,
    combinationOption: CombinationOptionsName,
    setCombinationOption: Dispatch<SetStateAction<CombinationOptionsName>>,
];

export const LayersContext = createContext<LayersContextType | undefined>(undefined);

type LayersProviderProps = PropsWithChildren<{ initialLayers: Record<LayerName, LayerSettings> }>

export const LayersProvider: FC<LayersProviderProps> = ({ children, initialLayers }) => {
    const [layers, setLayers] = useState<Record<LayerName, LayerSettings>>(initialLayers);
    const [combinationOption, setCombinationOption] = useState<CombinationOptionsName>("ממוצע משוכלל");

    return (
        <LayersContext.Provider value={[ layers, setLayers, combinationOption, setCombinationOption ]}>
            {children}
        </LayersContext.Provider>
    );
};
