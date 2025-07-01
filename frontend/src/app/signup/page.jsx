"use client";

import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import ImageUpload from "../../components/ImageUpload";
import EmailVerification from "../../components/EmailVerification";
import GenderDropdown from "../../components/GenderDropdown";
import SubmitButton from "../../components/SubmitButton"; // 👈
import PopupModal from "../../components/PopupModal";

export default function SignupPage() {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        email: "",
        password: "",
        name: "",
        image: "" ,
        gender: "",
        age: "",
    });
    const [emailVerified, setEmailVerified] = useState(false);    
    const [showPassword, setShowPassword] = useState(false);
    const [popup, setPopup] = useState(null);

    const onSignUp = async () => {
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:5000/api/users/signup", user);
            setPopup({ type: "success", message: "Signup successful!" });
    
            const loginRes = await axios.post("http://localhost:5000/api/users/login", {
                email: user.email,
                password: user.password,
            });
    
            const loggedInUser = loginRes.data.data;
            if (loggedInUser) {
                localStorage.setItem("user", JSON.stringify(loggedInUser));
            }
    
            setTimeout(() => {
                window.location.href = "/";
            }, 2000);
        } catch (error) {
            console.log("Signup failed", error.message);
            const errMsg = error.response?.data?.error;
            if (errMsg === "User already exists") {
                setPopup({ type: "error", message: "User already registered with this email." });
            } else {
                setPopup({ type: "error", message: errMsg || "Signup failed. Try again." });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 relative px-4 mt-10 pt-20 pb-10">
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center z-10">
                <h2 className="text-2xl font-bold text-green-600 mb-6">Sign up to Brighter Beyond</h2>

                <label htmlFor="name" className="block font-semibold mb-1">name</label>
                <input 
                    id="name"
                    type="text" 
                    value={user.name}
                    onChange={(e) => setUser({...user, name: e.target.value})}
                    placeholder="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 mb-4"
                />

                <EmailVerification
                    email={user.email}
                    setEmail={(email) => setUser({ ...user, email })}
                    onVerified={(status) => setEmailVerified(status)}
                />

                <label htmlFor="password" className="block font-semibold mb-1 mt-2">Password</label>
                <div className="relative w-full">
                    <input 
                        id="password"
                        type={showPassword ? "text" : "password"} 
                        value={user.password}
                        onChange={(e) => setUser({...user, password: e.target.value})}
                        placeholder="Password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 pr-10 mb-4"
                    />
                    <div 
                        className="absolute top-3 right-3 cursor-pointer text-gray-500"
                        onClick={() => setShowPassword(prev => !prev)}
                    >
                        {showPassword ? "👁️" : "🙈"}
                    </div>
                </div>

                <label htmlFor="age" className="block font-semibold mb-1">Age</label>
                <input 
                    id="age"
                    type="number"
                    value={user.age}
                    onChange={(e) => setUser({...user, age: e.target.value})}
                    placeholder="Age"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 mb-4"
                />

                <GenderDropdown volunteer={user} setVolunteer={setUser} />

                <ImageUpload data={user} setData={setUser} />

                <SubmitButton loading={loading} onClick={onSignUp} disabled={!emailVerified}>
                    Sign up
                </SubmitButton>

                <p className="mt-4 text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link href="/login" className="text-green-600 font-semibold hover:underline">
                        Login
                    </Link>
                </p>
            </div>

            {/* SVG Wave */}
            <svg
                className="absolute bottom-0 left-0 w-full h-40"
                viewBox="0 0 1440 320"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill="#D7A529"
                    d="M0,224L48,197.3C96,171,192,117,288,96C384,75,460,85,570,96C672,107,768,117,864,138.7C960,160,1056,192,1152,176C1248,160,1344,96,1392,64L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                />
            </svg>

            {/* Popup Modal */}
            {popup && (
                <PopupModal
                    type={popup.type}
                    message={popup.message}
                    onClose={() => setPopup(null)}
                />
            )}
        </div>
    );
}
