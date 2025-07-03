import { useState } from "react";
import SimulationUploadStage from "./SimulationUploadStage";
import SimulationSettingsStage from "./SimulationSettingsStage";
import SimulationSummaryStage from "./SimulationSummaryStage";
import SimulationWizardProgressBar from "./SimulationWizardProgressBar";

const TOTAL_STEPS = 3;

const SimulationWizard = () => {
    const [step, setStep] = useState(1);
    const [completedSteps, setCompletedSteps] = useState<boolean[]>(Array(TOTAL_STEPS).fill(false));
    const [simulationName, setSimulationName] = useState("");
    const [, setFile] = useState<File | null>(null);
    const [settings, setSettings] = useState({
        mapType: "",
        timeStep: 5,
        minScore: 0.5,
        waitTime: 2,
        maxTasks: 1,
    });

    const handleNext = () => {
        const newCompleted = [...completedSteps];
        newCompleted[step - 1] = true;
        setCompletedSteps(newCompleted);
        setStep(prev => prev + 1);
    };

    const handleBack = () => {
        const currentStepIndex = step - 1;
        const newCompleted = [...completedSteps];
        newCompleted[currentStepIndex] = false;
        setCompletedSteps(newCompleted);
        setStep(prev => prev - 1);
    };

    const handleCircleClick = (clickedStep: number) => {
        console.log(clickedStep)
        if (clickedStep == step) return

        if (clickedStep < step) {
            const newCompletedSteps = [...completedSteps]
            newCompletedSteps[clickedStep - 1] = false
            setCompletedSteps(newCompletedSteps)
            setStep(clickedStep)
        }
    };

    return (
        <div className="p-2 flex justify-center flex-col w-[60%]" dir="rtl">
            <div className="pb-6 text-right">
                <p className="text-4xl font-bold">סימולציה חדשה</p>
                <p>צור סימולציה חדשה על בסיס קובץ משימות</p>
            </div>
            <SimulationWizardProgressBar
                step={step}
                completedSteps={completedSteps}
                handleCircleClick={handleCircleClick} />
            {step === 1 && (
                <SimulationUploadStage
                    simulationName={simulationName}
                    setSimulationName={setSimulationName}
                    setFile={setFile}
                    onNext={handleNext}
                />
            )}

            {step === 2 && (
                <SimulationSettingsStage
                    settings={settings}
                    setSettings={setSettings}
                    onBack={handleBack}
                    onNext={handleNext}
                />
            )}

            {step === 3 && (
                <SimulationSummaryStage
                    simulationName={simulationName}
                    settings={settings}
                    onBack={handleBack}
                    onStart={() => alert("הסימולציה הופעלה!")}
                />
            )}
        </div>
    );
};

export default SimulationWizard;
