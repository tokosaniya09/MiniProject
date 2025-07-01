"use client";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import ProblemSelect from "../../components/ProblemSelect";
import { UserContext } from '../../context/UserContext';
import PopupModal from "../../components/PopupModal";
import SubmitButton from "../../components/SubmitButton"; // Make sure path is correct
import TermsPopup from "../../components/TermsPopup"; // Make sure path is correct

export default function VolunteerRegisterPage() {
    const { user } = useContext(UserContext);
    const [volunteer, setVolunteer] = useState({
        description: "",
        problem: [],
    });
    const [showLoginPrompt, setShowLoginPrompt] = useState(true);
    const [popup, setPopup] = useState(null);
    const [loading, setLoading] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [showTermsPopup, setShowTermsPopup] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (user) {
            setShowLoginPrompt(false);
        } 
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user?.id) {
            setPopup({ type: "error", message: "You need to log in first!" });
            return;
        }

        if (!acceptedTerms) {
            setPopup({ type: "error", message: "Please accept the Terms and Conditions." });
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post("http://localhost:5000/api/volunteer/register", {
                userId: user?.id,
                description: volunteer.description,
                problem: volunteer.problem,
            });

            console.log("Volunteer registered successfully:", res.data);

            if (res.status === 200) {
                setPopup({ type: "success", message: "Volunteer registered successfully!" });
                setTimeout(() => {
                    router.push("/");
                }, 3000);
            }
        } catch (error) {
            console.error("Registration failed:", error);

            if (error.response?.data?.error === "Volunteer already exists") {
                setPopup({ type: "error", message: "You are already registered as a volunteer!" });
            } else {
                setPopup({ type: "error", message: "Something went wrong. Please try again." });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center mttwelve">
            <div className="flex flex-col items-center justify-center widthSeventy max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-3xl font-bold text-center mb-6">Volunteer Registration</h1>
                <hr className="w-full border-gray-300 mb-4" />

                {showLoginPrompt && (
                    <div className="w-full text-center mb-4">
                        <p className="text-red-500">You must be logged in to register as a volunteer!</p>
                        <button
                            onClick={() => router.push("/login")}
                            className="text-blue-500 underline"
                        >
                            Log in
                        </button>
                    </div>
                )}


                <div className="w-full mb-4">
                    <label htmlFor="description" className="block font-semibold mb-1">
                        Description <span className="text-sm text-gray-500">(max 30 words)</span>
                    </label>
                    <textarea
                        id="description"
                        value={volunteer.description}
                        onChange={(e) => {
                            const inputText = e.target.value;
                            const wordCount = inputText.trim().split(/\s+/).length;

                            if (wordCount <= 50) {
                                setVolunteer({ ...volunteer, description: inputText });
                            }
                        }}
                        placeholder="Briefly describe yourself (max 30 words)"
                        className="w-full p-2 border border-gray-300 rounded-lg mb-1 focus:outline-none focus:border-gray-600"
                        rows={4}
                    />
                    <p className="text-sm text-gray-500 text-right">
                        {volunteer.description.trim().split(/\s+/).filter(Boolean).length} / 30 words
                    </p>
                </div>

                <ProblemSelect volunteer={volunteer} setVolunteer={setVolunteer} />

                <div className="flex items-start gap-2 mb-4 w-full">
                    <input
                        type="checkbox"
                        id="terms"
                        checked={acceptedTerms}
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                        className="mt-1"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-700">
                        I agree to the{" "}
                        <button
                            type="button"
                            className="text-blue-500 underline"
                            onClick={() => setShowTermsPopup(true)}
                        >
                            Terms and Conditions
                        </button>
                    </label>
                </div>

                <SubmitButton
                    onClick={handleSubmit}
                    loading={loading}
                    disabled={loading}
                    className="w-full p-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
                >
                    Register as Volunteer
                </SubmitButton>
            </div>

            {popup && (
                <PopupModal
                    type={popup.type}
                    message={popup.message}
                    onClose={() => setPopup(null)}
                />
            )}

            {showTermsPopup && (
                <TermsPopup onClose={() => setShowTermsPopup(false)} />
            )}

        </div>
    );
}
