import type { ChangeEvent, FC } from "react";


type Props = {
  simulationName: string;
  setSimulationName: (val: string) => void;
  setFile: (file: File | null) => void;
  onNext: () => void;
};

const SimulationUploadStage: FC<Props> = ({ simulationName, setSimulationName, setFile, onNext }) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-4">
      <div className="flex flex-col gap-1">
        <p className="text-xl font-bold text-center">העלאת קובץ משימות</p>
        <p className="text-sm text-center text-gray-400">העלה קובץ Excel או CSV המכיל את נתוני המשימות</p>
      </div>
      <label className="text-sm font-medium">שם הסימולציה</label>
      <input
        type="text"
        value={simulationName}
        onChange={(e) => setSimulationName(e.target.value)}
        placeholder="הכנס שם לסימולציה..."
        className="border rounded px-2 py-2 w-full border-gray-400"
      />
      <div className="border-2 border-dashed border-gray-300 rounded p-6 text-center space-y-2 min-h-[200px]">
        <p>גרור קובץ לכאן או לחץ לבחירה</p>
        <p className="text-sm text-gray-500">נתמכים: CSV, Excel (.xlsx, .xls)</p>
        <input type="file" onChange={handleFileChange} className="mx-auto mt-2" />
      </div>
      <button onClick={onNext} className="bg-blue-500 text-white px-4 py-2 self-start rounded-xl">
        המשך להגדרה
      </button>
    </div>
  );
};

export default SimulationUploadStage;
