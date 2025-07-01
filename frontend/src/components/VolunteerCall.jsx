import Link from "next/link";
import FadeInOnScroll from "../components/FadeInOnScroll";
import SubmitButton from "../components/SubmitButton"; // import the SubmitButton component

export default function VolunteerCall() {
  return (
    <FadeInOnScroll>
      <div className="flex flex-col lg:flex-row items-center justify-center p-10 bg-[rgb(207, 255, 253)] my-20">
        <div className="max-w-lg text-center lg:text-left">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Become a Volunteer - Be the Light in Someone's Darkest Moments
          </h1>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Every day, countless people struggle with loneliness, stress, and emotional pain, feeling like they have no one to turn to. As a volunteer, you have the power to change that. By offering your time, compassion, and a listening ear, you can make a real difference in someone's life. You don't need to be an expert—just someone willing to care, support, and share hope. Join us in creating a world where no one has to face their struggles alone.
          </p>
          <Link href="/volunteer-register">
             <div className="wfifty flex justify-center mx-auto lg:mx-0">
                <SubmitButton 
                    loading={false} 
                    disabled={false}
                    >
                    Register as Volunteer
                </SubmitButton>
             </div>

          </Link>
        </div>
        <div className="mt-8 lg:mt-0 lg:ml-12 rounded-lg maxWidth shadow-lg border border-orange-200">
          <img
            src="https://i.pinimg.com/736x/70/56/86/705686e9f3c0a31dc3e77eb5ef6f8c25.jpg"
            alt="Volunteer Support"
            className="shadow-lg w-full h-auto object-cover rounded-md"
          />
        </div>
      </div>
    </FadeInOnScroll>
  );
}
