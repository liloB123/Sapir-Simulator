import { Settings2 } from "lucide-react";
import type { FC } from "react";
import { useLayers } from "../../hooks/useLayers";
import type { LayerName } from "../../contexts/LayersMenuContext";

type LayerMenuItemExtraSettingsButtonProps = {
    name: LayerName
}

const LayerMenuItemExtraSettingsButton: FC<LayerMenuItemExtraSettingsButtonProps> = ({ name }) => {
    const [,setLayers] = useLayers()

    return (
        <button
            aria-label="Settings"
            type="button"
            style={{ background: 'transparent', padding: 0, border: 'none' }}
            onClick={() =>
                setLayers(prev => ({
                    ...prev,
                    [name]: {
                        ...prev[name],
                        isExpended: !prev[name].isExpended
                    }
                }))
            }      
        >
            <Settings2 className="text-white w-4 h-4" />
        </button>
    );
};

export default LayerMenuItemExtraSettingsButton
