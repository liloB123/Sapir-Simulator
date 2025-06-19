import type { FC } from "react";
import { useLayers } from "../../hooks/useLayers";
import type { LayerMenuItemProps } from "./LayerMenuItem";

type LayerMenuItemToggleProps = Pick<LayerMenuItemProps, "name"> & { isActive: boolean }

const LayerMenuItemToggle: FC<LayerMenuItemToggleProps> = ({ name, isActive }) => {
    const [, setLayers] = useLayers()

    return (
        <label className="inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                className="sr-only peer"
                onClick={() =>
                    setLayers(prev => ({
                        ...prev,
                        [name]: {
                            ...prev[name],
                            isActive: !prev[name].isActive
                        }
                    }))
                }
                checked={isActive}
            />
            <div
                className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none
                    dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full
                    rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute
                    after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full
                    after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-cyan-500 dark:peer-checked:bg-blue-600"
            ></div>
        </label>
    )
}

export default LayerMenuItemToggle
