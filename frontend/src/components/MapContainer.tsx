import React, { useState } from "react"
import HamburgerMenuButton from "./HamburgerMenuButton";
import BaseMap from "./BaseMap";
import LayersMenu from "./LayersMenu";
import {
    MapPin,
    Building2,
    Shield,
    Navigation,
    Target,
} from "lucide-react";

const LAYERS = {
    border_distance: { name: "מרחק מקו הגבול", icon: Shield, color: "text-red-400", description: "עוצמה גבוהה ליד הגבול הצפוני" },
    settlements_distance: { name: "מרחק מיישובים מרכזיים", icon: Building2, color: "text-blue-400", description: "זרימת פעילות סביב ערים" },
    israeli_polygons: { name: "פוליגונים בשטח ישראלי", icon: MapPin, color: "text-green-400", description: "אזורים אסטרטגיים בישראל" },
    cross_border_polygons: { name: "פוליגונים חוצי גבולות", icon: Navigation, color: "text-purple-400", description: "פעילות בסוריה ולבנון" },
    strategic_points: { name: "נקודות אסטרטגיות", icon: Target, color: "text-orange-400", description: "מוקדי חשיבות על הגבול" }
};


const MapContainer: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)


    const layerMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    };

    const closeLayerMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <div className="w-full h-full">
                <BaseMap />
                <HamburgerMenuButton isOpen={isMenuOpen} onLayerToggle={layerMenu} />
                <LayersMenu
                    isOpen={isMenuOpen}
                    onClose={closeLayerMenu}
                    layers={Object.values(LAYERS)}
                />
            </div>
        </div>
    );
};

export default MapContainer;