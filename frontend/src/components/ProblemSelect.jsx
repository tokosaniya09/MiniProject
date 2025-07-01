import { useRef, useEffect, useState } from "react";

export default function ProblemSelect({ volunteer, setVolunteer = null }) {
    const problemOptions = [
        "Financial Issues", "Family & Friends", "Social Anxiety & Loneliness", 
        "Relationship Struggles", "Education & Career Challenges", "Mental Health Struggles",
        "Divorce & Separation", "Chronic Illness & Health Issues", "Parenting Difficulties",
        "Grief & Loss", "Substance Abuse & Recovery", "Bullying & Harassment", 
        "Identity & Self-Acceptance", "Work-Life Balance", "Legal & Housing Issues", 
        "Technology & Digital Wellbeing"
    ];

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelectProblem = (problem) => {
        if (!volunteer) return;
        setDropdownOpen(false);
        if (!volunteer?.problem?.includes(problem)) {
            setVolunteer({ ...volunteer, problem: [...volunteer.problem, problem] });
        }
    };

    const handleRemoveProblem = (problem) => {
        setVolunteer({
            ...volunteer,
            problem: volunteer?.problem.filter((p) => p !== problem),
        });
    };

    return (
        <div className="w-full relative" ref={dropdownRef}>
            <label htmlFor="problem" className="block font-semibold mb-1">Problem Expertise</label>
            
            <div 
                className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
            >
                {volunteer?.problem?.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        {volunteer?.problem.map((item) => (
                            <div key={item} className="flex items-center bgDiff px-3 py-1 rounded-full text-sm">
                                {item}
                                <button 
                                    className="ml-2 text-red-800"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveProblem(item);
                                    }}
                                >
                                    ✖
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600">Select problems...</p>
                )}
            </div>

            {dropdownOpen && (
                <div className="absolute w-full bg-white border border-gray-300 rounded-lg shadow-md mt-1 z-10 max-h-60 overflow-auto">
                    {problemOptions.map((problem) => (
                        <div 
                            key={problem} 
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => handleSelectProblem(problem)}
                        >
                            {problem}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
