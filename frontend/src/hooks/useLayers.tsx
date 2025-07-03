import { useContext } from "react";
import { LayersContext, type LayersContextType } from "../contexts/LayersMenuContext";

export const useLayers = (): LayersContextType => {
    const context = useContext(LayersContext);

    if (!context) {
        throw new Error('useLayer must be used within a LayerProvidor');
    }

    return context;
};
