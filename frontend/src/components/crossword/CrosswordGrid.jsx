"use client";
import React from "react";

export default function CrosswordGrid({
  grid,
  isSelected,
  isFound,
  onPointerDown,
  onPointerEnter,
  onPointerUp,
}) {
  return (
    <div className="overflow-auto max-w-full mt-4">
      <table
        className="border border-black mx-auto select-none touch-none"
        onPointerUp={onPointerUp}
      >
        <tbody>
          {grid.map((row, rIdx) => (
            <tr key={rIdx}>
              {row.map((letter, cIdx) => (
                <td
                  key={cIdx}
                  className={`w-8 h-8 border text-center font-bold text-lg 
                    ${isSelected(rIdx, cIdx) ? "bg-blue-400" : ""}
                    ${isFound(rIdx, cIdx) ? "bg-blue-300 text-white" : ""}
                  `}
                  onPointerDown={() => onPointerDown(rIdx, cIdx)}
                  onPointerEnter={() => onPointerEnter(rIdx, cIdx)}
                >
                  {letter}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

