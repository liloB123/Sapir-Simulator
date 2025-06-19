import { useState } from "react"
import type { FC } from 'react';
import LayerMenuButton from "./LayerMenuButton";
import BaseMap from "./BaseMap";
import LayersMenu from "./LayersMenu";
import type { layerMenuItemName } from "./layerMenuConsts";

type MapContainerProps = {
    layersNames: layerMenuItemName[]
}

const MapContainer: FC<MapContainerProps> = ({ layersNames }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <div className="w-full h-full">
                <BaseMap />
                <LayerMenuButton isOpen={isMenuOpen} onMenuToggle={() => setIsMenuOpen(prev => !prev)} />
                <LayersMenu
                    isOpen={isMenuOpen}
                    layersNames={layersNames}
                />
            </div>
        </div>
    );
};

export default MapContainer;