import { Settings2 } from "lucide-react";
import type { FC } from "react";

type LayerMenuItemExtraSettingsButtonProps = {
    isToggled: boolean,
    onToggle: () => void,
}

const LayerMenuItemExtraSettingsButton: FC<LayerMenuItemExtraSettingsButtonProps> = ({ onToggle }) => {
    return (
        <button
            className="bg-transparent p-0 border-none"
            aria-label="Settings"
            type="button"
            onClick={onToggle}

        >
            <Settings2 className="text-white w-4 h-4" />
        </button>
    );
};

export default LayerMenuItemExtraSettingsButton
