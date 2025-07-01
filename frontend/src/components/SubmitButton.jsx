"use client";

export default function SubmitButton({ loading = false, onClick = () => {}, disabled = false, children }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full p-2 border-none rounded-lg mb-4 font-semibold 
        bg-blue-500 text-white 
        ${disabled || loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600 hover:scale-105"} 
        transition-all duration-300`}
    >
      {loading ? "Processing..." : children}
    </button>
  );
}
