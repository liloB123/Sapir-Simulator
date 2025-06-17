import type React from "react";
import { useLayer } from "../contexts/LayersMenuContext";
import { Settings2, type LucideIcon } from "lucide-react";

interface LayerProps {
    name: string;
    icon: LucideIcon;
    color: string;
    description: string
}

const Layer: React.FC<LayerProps> = ({ name, icon, color, description }) => {
    const { getLayer: getLayer, setLayer: setLayer } = useLayer();
    const isActive = getLayer(name);

    const handleToggle = () => {
        setLayer(name, !isActive)
    };

    const Icon = icon;

    return (
        <div className={`p-3 border bg-slate-800/30 rounded-lg flex items-center justify-between h-22 gap-8 ${isActive
                ? "border-cyan-500/30 shadow-lg shadow-cyan-500/10"
                : "border-white/10 hover:border-white/20"
            }`}>
            <button
                aria-label="Settings"
                type="button"
                style={{ background: 'transparent', padding: 0, border: 'none' }}
            >
                <Settings2 className="text-white w-4 h-4" />
            </button>
            <label className="inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    className="sr-only peer"
                    onChange={handleToggle}
                    checked={isActive}
                />
                <div
                    className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300
                    dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full
                    rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute
                    after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full
                    after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-cyan-500 dark:peer-checked:bg-blue-600"
                ></div>
            </label>
            <div className="flex items-center gap-3">
                <div className="flex flex-col items-end text-right">
                    <span className="text-sm font-medium text-white cursor-default text-right">
                        {name}
                    </span>
                    <p className="text-sm text-gray-500">{description}</p>
                </div>
                <Icon className={`w-5 h-5 ${color}`} />
            </div>
        </div>
    );
};

export default Layer