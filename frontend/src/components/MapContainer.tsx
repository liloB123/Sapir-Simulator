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


const LAYERS_MENU_ITEMS = {
    border_distance: { name: "מרחק מקו הגבול", icon: Shield, color: "text-red-400", description: "עוצמה גבוהה ליד הגבול הצפוני" },
    settlements_distance: { name: "מרחק מיישובים מרכזיים", icon: Building2, color: "text-blue-400", description: "זרימת פעילות סביב ערים" },
    israeli_polygons: { name: "פוליגונים בשטח ישראלי", icon: MapPin, color: "text-green-400", description: "אזורים אסטרטגיים בישראל" },
    cross_border_polygons: { name: "פוליגונים חוצי גבולות", icon: Navigation, color: "text-purple-400", description: "פעילות בסוריה ולבנון" },
    strategic_points: { name: "נקודות אסטרטגיות", icon: Target, color: "text-orange-400", description: "מוקדי חשיבות על הגבול" }
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