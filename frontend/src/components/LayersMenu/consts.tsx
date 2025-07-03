import type { FC } from "react";
import {
    MapPin,
    Building2,
    Shield,
    Navigation,
    Target,
    BarChart3,
    TrendingUp
} from "lucide-react";
import type { LayerName, CombinationOptionsName, OptionsName } from "../../contexts/LayersMenuContext";

const ShieldWithColor: FC = () => <Shield className={`w-5 h-5 text-red-400`} />

const Building2WithColor: FC = () => <Building2 className={`w-5 h-5 text-blue-400`} />

const MapPinWithColor: FC = () => <MapPin className={`w-5 h-5 text-green-400`} />

const NavigationWithColor: FC = () => <Navigation className={`w-5 h-5 text-purple-400`} />

const TargetWithColor: FC = () => <Target className={`w-5 h-5 text-orange-400`} />

export type LayerMenuItemDetailsConfig = {
    displayName: string;
    Icon: FC;
    description: string;
};

export const layerMenuItems: Record<LayerName, LayerMenuItemDetailsConfig> = {
    border_distance: { displayName: "מרחק מקו הגבול", Icon: ShieldWithColor, description: "עוצמה גבוהה ליד הגבול הצפוני" },
    settlements_distance: { displayName: "מרחק מיישובים מרכזיים", Icon: Building2WithColor, description: "זרימת פעילות סביב ערים" },
    israeli_polygons: { displayName: "פוליגונים בשטח ישראלי", Icon: MapPinWithColor, description: "אזורים אסטרטגיים בישראל" },
    cross_border_polygons: { displayName: "פוליגונים חוצי גבולות", Icon: NavigationWithColor, description: "פעילות בסוריה ולבנון" },
    strategic_points: { displayName: "נקודות אסטרטגיות", Icon: TargetWithColor, description: "מוקדי חשיבות על הגבול" }
};

const extraSettingsIconStyle = "w-3 h-3"

const BarChartIcon: FC = () => <BarChart3 className={extraSettingsIconStyle}/>

const TrendingUpIcon: FC = () => <TrendingUp className={extraSettingsIconStyle}/>

export type ExtraSettingOptionsConfig = {
    label: OptionsName;
    Icon: FC;
}

export const LinearExtraSettingOption: ExtraSettingOptionsConfig = { label: "לינארי", Icon: BarChartIcon }
export const ExponentialSettingOption: ExtraSettingOptionsConfig = { label: "אקספוננציאלי", Icon: TrendingUpIcon }

export type LayersCombinationOptionConfig = {
    label: CombinationOptionsName;
    description: string;
}

export const layersCombintaionOptions: LayersCombinationOptionConfig[] = [
    { label: "ממוצע משוכלל", description: "מיזוג חלקי לפי משקלי השכבות" },
    { label: "ערך מקסימלי", description: "שמירה על הערכים הגבוהים ביותר" }
]

export const defaultExponentialBase: number = 3
