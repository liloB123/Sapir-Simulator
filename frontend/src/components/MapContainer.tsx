/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react"
import type { FC } from 'react';
import LayerMenuButton  from "./LayerMenuButton";
import BaseMap from "./BaseMap";
import LayersMenu from "./LayersMenu";
import {
    MapPin,
    Building2,
    Shield,
    Navigation,
    Target
} from "lucide-react";

const ShieldWithColor: FC = () => <Shield className={`w-5 h-5 text-red-400`} />

const Building2WithColor: FC = () => <Building2 className={`w-5 h-5 text-blue-400`} />

const MapPinWithColor: FC = () => <MapPin className={`w-5 h-5 text-green-400`} />

const NavigationWithColor: FC = () => <Navigation className={`w-5 h-5 text-purple-400`} />

const TargetWithColor: FC = () => <Target className={`w-5 h-5 text-orange-400`} />


const layerMenuItemNames = ["border_distance", "settlements_distance", "israeli_polygons", "cross_border_polygons", "strategic_points"] as const;

type layerMenuItemName = (typeof layerMenuItemNames)[number]


const LAYERS_MENU_ITEMS: Record<layerMenuItemName, {name: string, Icon: FC, description: string }> = {
    border_distance: { name: "מרחק מקו הגבול", Icon: ShieldWithColor, description: "עוצמה גבוהה ליד הגבול הצפוני" },
    settlements_distance: { name: "מרחק מיישובים מרכזיים", Icon: Building2WithColor, description: "זרימת פעילות סביב ערים" },
    israeli_polygons: { name: "פוליגונים בשטח ישראלי", Icon: MapPinWithColor, description: "אזורים אסטרטגיים בישראל" },
    cross_border_polygons: { name: "פוליגונים חוצי גבולות", Icon: NavigationWithColor, description: "פעילות בסוריה ולבנון" },
    strategic_points: { name: "נקודות אסטרטגיות", Icon: TargetWithColor, description: "מוקדי חשיבות על הגבול" }
};


const MapContainer: FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <div className="w-full h-full">
                <BaseMap />
                <LayerMenuButton  isOpen={isMenuOpen} onMenuToggle={() => setIsMenuOpen(prev => !prev)} />
                <LayersMenu
                    isOpen={isMenuOpen}
                    layers={Object.values(LAYERS_MENU_ITEMS)}
                />
            </div>
        </div>
    );
};

export default MapContainer;