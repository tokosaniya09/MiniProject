"use client";
import { useEffect } from "react";
import { CheckCircle, XCircle } from "lucide-react";

export default function PopupModal({ type = "success", message, onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const icon = type === "success" ? <CheckCircle className="text-green-500 w-8 h-8" /> : <XCircle className="text-red-500 w-8 h-8" />;
    const title = type === "success" ? "Success" : "Error";
    const bgColor = type === "success" ? "bg-green-100" : "bg-red-100";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className={`rounded-2xl shadow-xl p-6 max-w-sm w-full text-center ${bgColor}`}>
                <div className="flex justify-center mb-2">{icon}</div>
                <h2 className="text-xl font-semibold mb-1">{title}</h2>
                <p className="text-gray-800 mb-4">{message}</p>
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-lg transition"
                >
                    Close
                </button>
            </div>
        </div>
    );
}
