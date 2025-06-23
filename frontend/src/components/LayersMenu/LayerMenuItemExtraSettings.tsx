import { useState, type FC, useEffect } from "react";
import type { LayerName } from "../../contexts/LayersMenuContext";
import ExtraSettingsOptions from "./ExtraSettingsOptions";
import { extraSettingOptions } from "./consts";
import { useLayers } from "../../hooks/useLayers";

interface ExtraSettingsProps {
    name: LayerName;
}

const ExtraSettings: FC<ExtraSettingsProps> = ({ name }) => {
    const [layers, setLayers] = useLayers();

    const DEFAULT_BASE = 2;

    const [inputValue, setInputValue] = useState(
        layers[name].selectedOption === "אקספוננציאלי" && typeof layers[name].base === "number"
            ? layers[name].base.toString()
            : DEFAULT_BASE.toString()
    );

    const [isInvalid, setIsInvalid] = useState(layers[name].selectedOption === "אקספוננציאלי" && typeof layers[name].base !== "number" ? false : true);


    useEffect(() => {
        console.log(isInvalid)
        if (layers[name].selectedOption === "אקספוננציאלי" && !isInvalid) {
            const currentBase = layers[name].base;
            console.log(isInvalid)
            setInputValue(
                typeof currentBase === "number"
                    ? currentBase.toString()
                    : DEFAULT_BASE.toString()
            );

            if (typeof currentBase !== "number" && !isInvalid) {

                setLayers((prev) => ({
                    ...prev,
                    [name]: {
                        ...prev[name],
                        base: DEFAULT_BASE,
                    },
                }));
            }
        }
    }, [layers[name].selectedOption]);

    return (
        <div className="mt-3 px-2 text-sm text-white space-y-2 transition-all text-center">
            <p className="text-s text-right">אלגוריתם אינטרפולציה</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-evenly">
                {extraSettingOptions.map((option) => (
                    <ExtraSettingsOptions key={option.lable} name={name} {...option} />
                ))}
            </div>
            {
                layers[name].selectedOption === "אקספוננציאלי" && (
                    <div className="w-full">
                        <p className="text-right text-xs">:בסיס</p>
                        <input
                            autoFocus
                            className={`w-full px-3 py-1 rounded bg-slate-800/30 text-white text-xs border ${isInvalid ? "border-red-500" : "border-white/10"
                                } focus:outline-none focus:border-gray-500 hover:border-white/20 text-right`}
                            value={inputValue}
                            placeholder="הכנס מספר"
                            onChange={(e) => {
                                setInputValue(e.target.value);
                                if (isInvalid) setIsInvalid(false);
                            }}
                            onBlur={() => {
                                const parsedInput = parseFloat(inputValue);

                                if (!isNaN(parsedInput)) {
                                    setIsInvalid(false);
                                    setLayers((prev) => ({
                                        ...prev,
                                        [name]: {
                                            ...prev[name],
                                            base: parsedInput,
                                        },
                                    }));
                                } else {
                                    setIsInvalid(true);
                                    setLayers((prev) => ({
                                        ...prev,
                                        [name]: {
                                            ...prev[name],
                                            base: undefined,
                                        },
                                    }));
                                }
                            }}
                        />
                    </div>
                )
            }
        </div>
    );
};

export default ExtraSettings;
