import { useEffect, useState, type FC } from "react";
import { useLayers } from "../../hooks/useLayers";
import type { LayerName } from "../../contexts/LayersMenuContext";


type BaseInputProps = {
    name: LayerName;
}

const BaseInput: FC<BaseInputProps> = ({ name }) => {
    const [layers, setLayers] = useLayers();
    const [inputValue, setInputValue] = useState("");
    const [hasUserTyped, setHasUserTyped] = useState(false);

    useEffect(() => {
        const base = layers[name].selectedOption === "אקספוננציאלי" && layers[name].base;

        if (layers[name].selectedOption === "אקספוננציאלי" && typeof base === "number" && !hasUserTyped) {
            console.log("re")
            setInputValue(base.toString());
        }
    }, [layers, hasUserTyped, name]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHasUserTyped(true)
        const input = e.target.value

        if (input === "") {
            setInputValue(input)

            return;
        }

        const parsedInput = parseFloat(input);

        if (!isNaN(parsedInput)) {
            setInputValue(parsedInput.toString())
            setLayers((prev) => ({
                ...prev,
                [name]: {
                    ...prev[name],
                    isValid: true,
                },
            }));
        }
    }

    const handleBlur = () => {
        setHasUserTyped(false)
        const parsedInput = parseFloat(inputValue);

        if (!isNaN(parsedInput)) {
            setLayers((prev) => ({
                ...prev,
                [name]: {
                    ...prev[name],
                    base: parsedInput
                },
            }));
        } else {
            setLayers((prev) => ({
                ...prev,
                [name]: {
                    ...prev[name],
                    base: undefined,
                    isValid: false
                },
            }));
        }
    };

    return (
        <div className="w-full">
            <p className="text-right text-xs">:בסיס</p>
            <input
                autoFocus
                className={`w-full px-3 py-1 rounded bg-slate-800/30 text-white text-xs border ${layers[name].selectedOption === "אקספוננציאלי" && layers[name].isValid === false 
                    ? "border-orange-500 placeholder-orange-500" : "border-white/10"
                    } focus:outline-none focus:border-gray-500 hover:border-white/20 text-right`}
                value={inputValue }
                placeholder="הכנס מספר"
                onChange={handleChange}
                onBlur={handleBlur}
            />
        </div>
    );
};

export default BaseInput;
