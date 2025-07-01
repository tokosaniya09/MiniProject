'use client';

import Link from 'next/link';

export default function ActionBox({ title, subtext, href, buttonLabel = "Start" }) {
  return (
    <div className="bg-white p-6 border border-gray-100 rounded-xl shadow-lg">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{subtext}</p>
      </div>
      <div className="flex justify-center pt-4">
        <Link href={href}>
          <button className="bg-blue-600 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full transition">
            {buttonLabel}
          </button>
        </Link>
      </div>
    </div>
  );
}
