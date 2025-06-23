import { useEffect, type FC } from 'react';
import { useLayers } from '../../hooks/useLayers';
import type { LayerName } from '../../contexts/LayersMenuContext';

const defaultBase = 3
const rangeMin = 1
const rangeMax = 10
const stepSize = 0.5

type SliderHeaderProps = {
    currentBase: () => number
}

export const SliderHeader: FC<SliderHeaderProps> = ({ currentBase }) =>
    <div className='flex justify-end gap-3 items-center'>
        <p className='text-cyan-200'>
            {currentBase()}
        </p>
        <p className="font-bold">
            :בסיס
        </p>
    </div>


export const SliderTicks: FC = () => {
    const ticksAmount = Math.floor((rangeMax - rangeMin) / stepSize) + 1

    return (
        <div className="absolute top-4.5 left-0 right-0 flex justify-between px-1">
            {Array.from({ length: ticksAmount }, (_, i) => {
                const tickValue = rangeMin + (i * stepSize);
                const isWholeNumber = tickValue % 1 === 0;
                return (
                    <div
                        key={i}
                        className={`${isWholeNumber
                            ? 'w-0.5 h-4 bg-gray-600'
                            : 'w-0.5 h-2 bg-gray-400'
                            }`}
                    />
                );
            })}
        </div>
    )
}

type BaseSliderProps = {
    name: LayerName;
}

const BaseSlider: FC<BaseSliderProps> = ({ name }) => {
    const [layers, setLayers] = useLayers()

    const currentBase = () => {
        if (layers[name].selectedOption === "אקספוננציאלי") {
            return layers[name].base
        }

        return defaultBase;
    }

    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const parsedInput = parseFloat(event.target.value)

        setLayers((prev) => ({
            ...prev,
            [name]: {
                ...prev[name],
                base: parsedInput
            },
        }));

    };

    useEffect(() => {
        if (layers[name].selectedOption === "אקספוננציאלי" && !layers[name].base) {
            setLayers((prev) => ({
                ...prev,
                [name]: {
                    ...prev[name],
                    base: defaultBase
                },
            }));
        }
    })

    return (
        <div>
            <SliderHeader
            currentBase={currentBase} />

            <div className="space-y-4">
                <div className="relative">
                    <input
                        type="range"
                        min={rangeMin}
                        max={rangeMax}
                        step={stepSize}
                        value={currentBase()}
                        onChange={handleSliderChange}
                        className="w-full h-2 bg-cyan-100 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                    />
                    <SliderTicks />
                    <div className="flex justify-between text-sm mt-6">
                        <span>{rangeMin}</span>
                        <span>{rangeMax}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BaseSlider;
