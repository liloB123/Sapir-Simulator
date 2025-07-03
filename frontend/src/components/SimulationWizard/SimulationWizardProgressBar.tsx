import type { FC } from "react";
import { SimulationWizardProgressBarSteps } from "./consts";

type SimulationWizardProgressBarProps = {
    step: number,
    completedSteps: boolean[]
    handleCircleClick: (clickedStep: number) => void
}

const SimulationWizardProgressBar: FC<SimulationWizardProgressBarProps> = ({ step, completedSteps, handleCircleClick }) =>
    <div className="flex items-center justify-around mb-6">
        {SimulationWizardProgressBarSteps.map((option, index) => {
            const stepNumber = index + 1;
            const isActive = step === stepNumber;
            const isCompleted = completedSteps[index];
            const shouldBeColored = isActive || isCompleted;

            return (
                <>
                    <div
                        key={index}
                        className="flex items-center cursor-pointer gap-5"
                        onClick={() => handleCircleClick(stepNumber)}
                    >
                        <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200
                                    ${shouldBeColored
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-700"
                                }`}
                        >
                            {stepNumber}
                        </div>
                        <div className="flex flex-col">
                            <p className="text-sm font-semibold text-blue-500 text-center">{option.title}</p>
                            <div className="text-xs text-gray-400">{option.description}</div>
                        </div>
                    </div>
                    {stepNumber < completedSteps.length && <hr className="border-t-4 border-gray-300 w-18 font-bold rounded-2xl" />}
                </>
            );
        })}
    </div>

export default SimulationWizardProgressBar
