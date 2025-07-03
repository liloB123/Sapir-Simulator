import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const FileDropzone = ({ setFile }: { setFile: (file: File | null) => void }) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            setFile(file);
        }
    }, [setFile]);

    const { getRootProps, getInputProps, isDragActive, fileRejections, acceptedFiles } = useDropzone({
        onDrop,
        accept: {
            "text/csv": [".csv"],
            "application/vnd.ms-excel": [".xls"],
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
        },
        multiple: false,
    });

    return (
        <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded p-6 text-center min-h-[150px] transition-all duration-200 cursor-pointer
    ${isDragActive
                    ? "border-blue-500 bg-blue-50"
                    : fileRejections.length > 0
                        ? "border-red-500 bg-red-50"
                        : acceptedFiles.length > 0
                            ? "border-green-500 bg-green-50"
                            : "border-gray-300"
                }
  `}
        >
            <input {...getInputProps()} />
            <p className="text-sm">
                {fileRejections.length > 0
                    ? "סוג קובץ לא נתמך"
                    : acceptedFiles.length > 0
                        ? "קובץ הועלה בהצלחה"
                        : isDragActive
                            ? "שחרר כאן..."
                            : "גרור קובץ לכאן או לחץ לבחירה"}
            </p>
            <p className="text-xs text-gray-500">סוגי קבצים נתמכים: .csv, .xls, .xlsx</p>
        </div>

    );
};

export default FileDropzone;
