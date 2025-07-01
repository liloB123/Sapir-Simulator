import { type FC } from "react";

type Props = {
  simulationName: string;
  settings: {
    mapType: string;
    timeStep: number;
    minScore: number;
    waitTime: number;
    maxTasks: number;
  };
  onBack: () => void;
  onStart: () => void;
};

const SimulationSummaryStage: FC<Props> = ({ simulationName, settings, onBack, onStart }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4 text-center">
      <h2 className="text-xl font-bold">מוכן להפעלה</h2>
      <p className="text-gray-500">הסימולציה מוכנה לרוץ עם ההגדרות שבחרת</p>

      <div className="bg-gray-100 rounded p-4 text-right space-y-1 max-w-md mx-auto">
        <p>שם הסימולציה: {simulationName}</p>
        <p>מפת חום: {settings.mapType}</p>
        <p>צעד זמן: {settings.timeStep} דקות</p>
        <p>סף ציון מינימלי: {settings.minScore}</p>
        <p>השהיית משימה: {settings.waitTime} דקות</p>
        <p>משימות מקבילות מקסימליות: {settings.maxTasks}</p>
      </div>

      <div className="flex justify-between max-w-md mx-auto">
        <button onClick={onBack} className="bg-gray-200 px-4 py-2 rounded">
          חזור להגדרות
        </button>
        <button onClick={onStart} className="bg-green-500 text-white px-4 py-2 rounded">
          הפעל סימולציה
        </button>
      </div>
    </div>
  );
};

export default SimulationSummaryStage;
