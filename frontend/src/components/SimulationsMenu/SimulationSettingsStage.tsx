import { type FC } from "react";

type Settings = {
    mapType: string;
    timeStep: number;
    minScore: number;
    waitTime: number;
    maxTasks: number;
};

type Props = {
    settings: Settings;
    setSettings: (settings: Settings) => void;
    onBack: () => void;
    onNext: () => void;
};

const SimulationSettingsStage: FC<Props> = ({ settings, setSettings, onBack, onNext }) => {
    return (
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
            <h2 className="text-xl font-bold text-center">הגדרות סימולציה</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label>צעד זמן (דקות): {settings.timeStep}</label>
                    <input
                        type="range"
                        min={1}
                        max={60}
                        value={settings.timeStep}
                        onChange={(e) => setSettings({ ...settings, timeStep: +e.target.value })}
                        className="w-full"
                    />
                </div>
                <div>
                    <label>בחר סוג מפת חום</label>
                    <select
                        value={settings.mapType}
                        onChange={(e) => setSettings({ ...settings, mapType: e.target.value })}
                        className="border px-2 py-1 rounded w-full"
                    >
                        <option value="">בחר מפת חום...</option>
                        <option value="security_zones">security_zones</option>
                    </select>
                </div>
                <div>
                    <label>סף ציון מינימלי לפתרון: {settings.minScore}</label>
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.1}
                        value={settings.minScore}
                        onChange={(e) => setSettings({ ...settings, minScore: +e.target.value })}
                        className="w-full"
                    />
                </div>
                <div>
                    <label>זמן המתנה בין משימות (דקות): {settings.waitTime}</label>
                    <input
                        type="range"
                        min={0}
                        max={10}
                        value={settings.waitTime}
                        onChange={(e) => setSettings({ ...settings, waitTime: +e.target.value })}
                        className="w-full"
                    />
                </div>
                <div className="md:col-span-2">
                    <label>משימות במקביל: {settings.maxTasks}</label>
                    <input
                        type="range"
                        min={1}
                        max={10}
                        value={settings.maxTasks}
                        onChange={(e) => setSettings({ ...settings, maxTasks: +e.target.value })}
                        className="w-full"
                    />
                </div>
            </div>

            <div className="flex justify-between">
                <button onClick={onBack} className="bg-gray-200 px-4 py-2 rounded">
                    חזור
                </button>
                <button onClick={onNext} className="bg-blue-500 text-white px-4 py-2 rounded">
                    המשך לסיכום
                </button>
            </div>
        </div>
    );
};

export default SimulationSettingsStage;
