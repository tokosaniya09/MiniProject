import { useState } from "react";

export default function GenderDropdown({ volunteer, setVolunteer }) {
    const [open, setOpen] = useState(false);
    const genders = ["male", "female", "other"];

    return (
        <div className="relative mb-4">
            <label className="block font-semibold mb-1">Gender</label>
            <div
                className="w-full p-2 border border-gray-300 rounded-lg cursor-pointer"
                onClick={() => setOpen(!open)}
            >
                {volunteer?.gender || "Select gender"}
            </div>
            {open && (
                <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg w-full shadow-md mt-1">
                    {genders.map((gender) => (
                        <li
                            key={gender}
                            onClick={() => {
                                setVolunteer({ ...volunteer, gender });
                                setOpen(false);
                            }}
                            className="p-2 hover:bg-green-300 hover:text-green-800 cursor-pointer rounded"
                        >
                            {gender.charAt(0).toUpperCase() + gender.slice(1)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
