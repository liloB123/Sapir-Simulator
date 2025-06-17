/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, type ReactNode } from "react";

export interface LayerState {
    [key: string]: boolean
};

interface LayerContextType {
    layers: LayerState;
    setLayer: (key: string, value: boolean) => void;
    getLayer: (key: string) => boolean;
};

const LayerContext = createContext<LayerContextType | undefined>(undefined);

interface LayerProviderProps {
    children: ReactNode;
    initialLayers?: LayerState;
};

export const LayerProvider: React.FC<LayerProviderProps> = ({ children, initialLayers: initialLayers = {} }) => {
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

export const useLayer = (): LayerContextType => {
    const context = useContext(LayerContext);
    if (!context) {
        throw new Error('useLayer must be used within a LayerProvidor');
    }
    return context;
};

export const useActiveLayersCount = (): number => {
    const { layers } = useLayer()

    return Object.values(layers).filter(Boolean).length;
}
