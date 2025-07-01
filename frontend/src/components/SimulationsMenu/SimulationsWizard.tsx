import { useState } from "react";
import SimulationUploadStage from "./SimulationUploadStage";
import SimulationSettingsStage from "./SimulationSettingsStage";
import SimulationSummaryStage from "./SimulationSummaryStage";

const SimulationWizard = () => {
    const [step, setStep] = useState(1);
    const [simulationName, setSimulationName] = useState("");
    const [, setFile] = useState<File | null>(null);
    const [settings, setSettings] = useState({
        mapType: "",
        timeStep: 5,
        minScore: 0.5,
        waitTime: 2,
        maxTasks: 1,
    });

    return (
        <div className="p-6 max-w-4xl mx-auto text-right w-[50%]">
            <h1 className="text-2xl font-bold mb-4">סימולציה חדשה</h1>
            <p>צור סימולציה חדשה על בסיס קובץ משימות</p>
            <div className="flex items-center justify-around mb-6">
                {["העלאת קובץ", "הגדרה", "הפעלה"].map((title, i) => (
                    <div key={i} className="flex flex-col items-center">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${step === i + 1
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-700"
                                }`}
                        >
                            {i + 1}
                        </div>
                        <div className="text-sm">{title}</div>
                    </div>
                ))}
            </div>

            {step === 1 && (
                <SimulationUploadStage
                    simulationName={simulationName}
                    setSimulationName={setSimulationName}
                    setFile={setFile}
                    onNext={() => setStep(2)}
                />
            )}

            {step === 2 && (
                <SimulationSettingsStage settings={settings} setSettings={setSettings} onBack={() => setStep(1)} onNext={() => setStep(3)} />
            )}

            {step === 3 && (
                <SimulationSummaryStage
                    simulationName={simulationName}
                    settings={settings}
                    onBack={() => setStep(2)}
                    onStart={() => alert("הסימולציה הופעלה!")}
                />
            )}
        </div>
    );
};

export default SimulationWizard;
