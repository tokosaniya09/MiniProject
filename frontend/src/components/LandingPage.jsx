"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="landing_page px-8 py-12 md:py-20 bg-white">
      <div className="flex flex-col md:flex-row items-center w-full px-20">
        <div className="w-full md:w-1/2 flex flex-col items-start text-left">
          <h1 className="text-3xl md:text-6xl text-blue-500 font-bold mb-4 sm:mt-20">
            Hope begins with a conversation
          </h1>
          <h6 className="text-lg text-gray-600">
            Brighter Beyond is your safe space to heal—with caring volunteers, expert support, calming tools, and a community that listens
          </h6>
          <button
            onClick={() => router.push("/questionnaire")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mt-10"
          >
            Take the questionnaire
          </button>
        </div>

        <div className="hidden md:flex md:w-1/2 min-h-[300px] min-w-[300px] relative justify-center">
          <img
            src="/images/mainPage.png"
            alt="Background"
            className="wImg1 h-auto rounded-3xl absolute z-0 border border-blue-200 shadow-lg"
          />
          <img
            src="/images/mainPage3.png"
            alt="Foreground"
            className="wImg h-auto rounded-3xl absolute z-10 border border-blue-200 shadow-lg"
          />
        </div>

      </div>
    </div>
  );
}
