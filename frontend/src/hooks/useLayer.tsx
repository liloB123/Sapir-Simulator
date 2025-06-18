import { useContext } from "react";
import { LayerContext, type LayerContextType } from "../contexts/LayersMenuContext";

export const useLayer = (): LayerContextType => {
    const context = useContext(LayerContext);
    
    if (!context) {
        throw new Error('useLayer must be used within a LayerProvidor');
    }

    return context;
};