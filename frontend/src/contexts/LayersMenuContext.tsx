import { createContext, useState, type ReactNode } from "react";
import type { FC } from 'react';

export type LayerState = Record<string, boolean>;

export interface LayerContextType {
    layers: LayerState;
    setLayer: (key: string, value: boolean) => void;
    getLayer: (key: string) => boolean;
};

export const LayerContext = createContext<LayerContextType | undefined>(undefined);

interface LayerProviderProps {
    children: ReactNode;
    initialLayers?: LayerState;
};

export const LayerProvider: FC<LayerProviderProps> = ({ children, initialLayers = {} }) => {
    const [layers, setLayers] = useState<LayerState>(initialLayers)

    const setLayer = (key: string, value: boolean) => {
        setLayers(prev => ({ ...prev, [key]: value }));
    }

    const getLayer = (key: string) => {
        return layers[key] || false
    }

    return (
        <LayerContext.Provider value={{ layers: layers, setLayer: setLayer, getLayer: getLayer }}>
            {children}
        </LayerContext.Provider>
    );
};

