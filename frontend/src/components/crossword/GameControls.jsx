import React from "react";

export default function GameControls({ onRestart, onStop, gameOver }) {
    return (
        <div className="mt-4 flex gap-4 flex justify-center mt-10">
        <button
            onClick={onRestart}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
            🔁 Restart
        </button>
        {!gameOver && (
            <button
            onClick={onStop}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
            🛑 Stop
            </button>
        )}
        </div>
    );
}
