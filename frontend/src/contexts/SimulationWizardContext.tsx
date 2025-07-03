import { createContext, useState, type FC, type PropsWithChildren } from "react";

export type SimulationWizardContextType = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  completedSteps: Set<number>;
  markStepComplete: (step: number) => void;
};

export const SimulationWizardContext = createContext<SimulationWizardContextType | undefined>(undefined);

export const SimulationWizardProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const markStepComplete = (step: number) => {
    setCompletedSteps(prev => new Set(prev).add(step));
  };

  return (
    <SimulationWizardContext.Provider value={{ currentStep, setCurrentStep, completedSteps, markStepComplete }}>
      {children}
    </SimulationWizardContext.Provider>
  );
};