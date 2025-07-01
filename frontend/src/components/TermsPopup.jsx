"use client";
export default function TermsPopup({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white max-w-lg w-full p-6 rounded-lg shadow-xl relative">
        <h2 className="text-xl font-bold mb-4">Terms and Conditions</h2>
        <div className="text-sm text-gray-700 space-y-2 mb-4">
          <p>1. You agree to act respectfully and helpfully as a volunteer.</p>
          <p>2. You must not share or misuse sensitive user information.</p>
          <p>3. Brighter Beyond is not responsible for third-party interactions.</p>
          <p>4. You can choose to discontinue your role anytime with notice.</p>
        </div>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
