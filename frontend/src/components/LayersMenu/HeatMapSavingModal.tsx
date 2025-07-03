import { useState, type FC } from "react";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';

type NameModalProps = {
    onClose: () => void;
};

const HeatMapSavingModal: FC<NameModalProps> = ({ onClose }) => {
    const [name, setName] = useState("");
    const [touched, setTouched] = useState(false);

    const handleConfirm = () => {
        if (name.trim() !== "") {
            Swal.fire({
                icon: "success",
                title: "מפת החום נשמרה בהצלחה",
                confirmButtonText: "סגור",
                confirmButtonColor: 'rgb(113, 214, 232)',
            }).then(() => {
                onClose();
            });
        } else {
            setTouched(true);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-slate-900 rounded-xl p-6 w-[90%] max-w-md shadow-lg border border-white/10 text-white">
                <h2 className="text-xl font-semibold mb-4 text-right">הכנס שם להפעלה</h2>

                <input
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="הכנס שם למפת החום"
                    className={`w-full px-4 py-2 rounded text-right text-sm bg-slate-800 border ${touched && name.trim() === ""
                        ? "border-red-500 placeholder-red-400"
                        : "border-white/10 focus:border-cyan-400"
                        } focus:outline-none text-white`}
                />

                <div className="flex justify-end gap-2 mt-6">
                    <button
                        style={{ background: 'rgb(228, 66, 66)' }}
                        onClick={onClose}
                        className="px-4 py-2 text-sm hover:bg-gray-700 rounded"
                    >
                        ביטול
                    </button>
                    <button
                        style={{ background: 'rgb(47, 205, 126)' }}
                        onClick={handleConfirm}
                        className="px-4 py-2 text-sm bg-cyan-600 hover:bg-cyan-700 rounded"
                    >
                        אישור
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HeatMapSavingModal;
