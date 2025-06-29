import type { FC } from "react";

type SliderTicksProps = {
    min: number;
    max: number;
    step: number;
}

const SliderTicks: FC<SliderTicksProps> = ({ max, min, step }) => {
    const ticksAmount = Math.floor((max - min) / step) + 1;

    return (
        <div className="absolute top-4.5 left-0 right-0 flex justify-between px-1">
            {Array.from({ length: ticksAmount }, (_, i) => {
                const tickValue = min + (i * step);
                const isWhole = tickValue % 1 === 0;
                return (
                    <div
                        key={i}
                        className={`${isWhole ? 'w-0.5 h-4 bg-gray-600' : 'w-0.5 h-2 bg-gray-400'}`}
                    />
                );
            })}
        </div>
    );
};

type SliderProps = {
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    step: number;
};

const Slider: FC<SliderProps> = ({ value, onChange, min, max, step }) => {


    return (
        <div>
            <div className="flex justify-end gap-3 items-center">
                <p className="text-cyan-200">{value}</p>
                <p className="font-bold">:בסיס</p>
            </div>

            <div className="space-y-4">
                <div className="relative">
                    <input
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={value}
                        onChange={(e) => onChange(parseFloat(e.target.value))}
                        className="w-full h-2 bg-cyan-100 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                    />
                    <SliderTicks
                        max={max}
                        min={min}
                        step={step} />

                    <div className="flex justify-between text-sm mt-6">
                        <span>{min}</span>
                        <span>{max}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Slider;
