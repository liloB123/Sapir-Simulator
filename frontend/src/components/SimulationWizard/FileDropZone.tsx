import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const FileDropzone = ({ setFile }: { setFile: (file: File | null) => void }) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            setFile(file);
        }
    }, [setFile]);

    const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
        onDrop,
        multiple: false,
        accept: {
            "text/csv": [".csv"],
            "application/vnd.ms-excel": [".xls"],
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
        }
    });

    console.log(isDragActive)

    return (
        <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded p-6 text-center min-h-[150px] transition-all duration-200
        ${isDragActive ? "border-blue-500 bg-blue-50 cursor-pointer" : "border-gray-300 cursor-pointer"}
      `}
        >
            <input {...getInputProps()} />
            <p>{isDragActive ? "שחרר כאן..." : "גרור קובץ לכאן או לחץ לבחירה"}</p>
            <p className="text-sm text-gray-500">קבצים נתמכים: .csv, .xls, .xlsx</p>
            {fileRejections.length > 0 && (
                <p className="text-sm text-red-500 mt-2">קובץ לא נתמך</p>
            )}
        </div>
    );
};

export default FileDropzone;
