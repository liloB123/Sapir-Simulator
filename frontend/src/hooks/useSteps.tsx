import { useContext } from "react";
import { SimulationWizardContext, type SimulationWizardContextType } from "../contexts/SimulationWizardContext";

export const useSteps = (): SimulationWizardContextType => {
    const context = useContext(SimulationWizardContext);

    if (!context) {
        throw new Error('useLayer must be used within a LayerProvidor');
    }

    return context;
};
