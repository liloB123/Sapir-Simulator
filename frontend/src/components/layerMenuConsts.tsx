/* eslint-disable @typescript-eslint/no-unused-vars */
import type { FC } from "react";
import {
    MapPin,
    Building2,
    Shield,
    Navigation,
    Target
} from "lucide-react";
import type { LayerMenuItemDetailsConfig } from "./LayerMenuItem";

const ShieldWithColor: FC = () => <Shield className={`w-5 h-5 text-red-400`} />

const Building2WithColor: FC = () => <Building2 className={`w-5 h-5 text-blue-400`} />

const MapPinWithColor: FC = () => <MapPin className={`w-5 h-5 text-green-400`} />

const NavigationWithColor: FC = () => <Navigation className={`w-5 h-5 text-purple-400`} />

const TargetWithColor: FC = () => <Target className={`w-5 h-5 text-orange-400`} />


const layerMenuItemNames = ["border_distance", "settlements_distance", "israeli_polygons", "cross_border_polygons", "strategic_points"] as const;

export type layerMenuItemName = (typeof layerMenuItemNames)[number]


export const layerMenuItems: Record<layerMenuItemName, LayerMenuItemDetailsConfig> = {
    border_distance: { displayName: "מרחק מקו הגבול", Icon: ShieldWithColor, description: "עוצמה גבוהה ליד הגבול הצפוני" },
    settlements_distance: { displayName: "מרחק מיישובים מרכזיים", Icon: Building2WithColor, description: "זרימת פעילות סביב ערים" },
    israeli_polygons: { displayName: "פוליגונים בשטח ישראלי", Icon: MapPinWithColor, description: "אזורים אסטרטגיים בישראל" },
    cross_border_polygons: { displayName: "פוליגונים חוצי גבולות", Icon: NavigationWithColor, description: "פעילות בסוריה ולבנון" },
    strategic_points: { displayName: "נקודות אסטרטגיות", Icon: TargetWithColor, description: "מוקדי חשיבות על הגבול" }
};
