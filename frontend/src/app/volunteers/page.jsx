import Link from "next/link";
import problemCategories from "../../data/groups";
import Image from "next/image";
import HelperChatbot from "../../components/HelperChatbot";

export default function TalkToVolunteer() {
  return (
    <div
      className="p-6 md:p-20 pt-20 mt-20 min-h-screen"
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-800">
          Find Support That Fits You
        </h1>
        <h6 className="text-lg md:text-xl font-medium mb-10 text-center text-gray-700">
          Select what you're dealing with — we'll show you who's here to help.
        </h6>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {problemCategories.map((problem) => (
            <Link
              key={problem.slug}
              href={problem.link}
              className="rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 my-5 mx-5"
            >
              <div>
                <Image
                  src={problem.image}
                  alt={problem.title}
                  width={500}
                  height={160}
                  className="w-full h-40 object-cover rounded-t-xl"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {problem.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{problem.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="text-center py-10 font-semibold">Can't find exactly what you're looking for? No worries — you can still talk to one of our general volunteers. More support groups are on the way!</div>

      <div className="flex justify-center mt-10">
        <Link
          key={"general-volunteer"}
          href={"/problems/general-volunteer"}
          className="w-full max-w-xs rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100"
        >
          <div>
            <Image
              src={"https://i.pinimg.com/736x/7b/d1/9c/7bd19c39bc247ed773cc975c321592cb.jpg"}
              alt={"General Volunteer Support"}
              width={400}
              height={160}
              className="w-full h-40 object-cover rounded-t-xl"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 text-center">
                General Volunteer Support
              </h3>
              <p className="text-sm text-gray-600 mt-1 text-center">
                Not sure? Talk to someone who cares 💛
              </p>
            </div>
          </div>
        </Link>
      </div>


      <div className="mt-12">
        <HelperChatbot />
      </div>
    </div>
  );
}
