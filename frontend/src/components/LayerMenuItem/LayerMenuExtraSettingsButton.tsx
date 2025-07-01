import { Settings2 } from "lucide-react";
import type { FC } from "react";

type LayerMenuItemExtraSettingsButtonProps = {
    isToggled: boolean,
    onToggle: ()  => void,
}

const LayerMenuItemExtraSettingsButton: FC<LayerMenuItemExtraSettingsButtonProps> = ({ onToggle }) => {
    return (
        <button
            aria-label="Settings"
            type="button"
            onClick={onToggle}
            className="bg-transparent! p-0! border-none!"
        >
            <Settings2 className="text-white w-4 h-4" />
        </button>
    );
};

export default LayerMenuItemExtraSettingsButton
