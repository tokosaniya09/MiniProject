'use client';

import FadeInOnScroll from "./FadeInOnScroll";
import ActionBox from "./ActionBox";

export default function RoadToHappiness() {
  const options = [
    {
      title: 'Talk to chatbot',
      subtext: 'Speak your mind in private',
      href: '/chatbot',
    },
    {
      title: 'Talk to volunteer',
      subtext: 'Real people, real care',
      href: '/volunteers',
    },
    {
      title: 'Take the professional helper',
      subtext: 'Expert support, one step away',
      href: '/professionals',
    },
  ];

  return (
    <FadeInOnScroll>
      <div className="flex justify-center bg-white py-12 px-4 my-15">
        <div className="p-8 my-10 w-full max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
            Road to Happiness Starts Here
          </h2>

          <div className="flex flex-col md:flex-row gap-6">
            {options.map((option, index) => (
              <div key={index} className="flex-1">
                <ActionBox {...option} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </FadeInOnScroll>
  );
}
