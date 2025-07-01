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
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      <label className="text-sm font-medium">שם הסימולציה:</label>
      <input
        type="text"
        value={simulationName}
        onChange={(e) => setSimulationName(e.target.value)}
        placeholder="הכנס שם לסימולציה..."
        className="border rounded px-4 py-2 w-full"
      />
      <div className="border-2 border-dashed border-gray-300 rounded p-6 text-center space-y-2">
        <p>גרור קובץ לכאן או לחץ לבחירה</p>
        <p className="text-sm text-gray-500">נתמכים: CSV, Excel (.xlsx, .xls)</p>
        <input type="file" onChange={handleFileChange} className="mx-auto mt-2" />
      </div>
      <button onClick={onNext} className="bg-blue-500 text-white px-4 py-2 rounded">
        המשך להגדרה
      </button>
    </div>
  );
};

export default SimulationUploadStage;
