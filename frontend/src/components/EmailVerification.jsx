"use client";
import { useState } from "react";
import axios from "axios";
import SubmitButton from "../components/SubmitButton";
import PopupModal from "../components/PopupModal"; // Adjust path if needed

export default function EmailVerification({ email, setEmail, onVerified }) {
    const [codeSent, setCodeSent] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");
    const [sending, setSending] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [popup, setPopup] = useState({ show: false, message: "", type: "success" });

    const showPopup = (message, type = "success") => {
        setPopup({ show: true, message, type });
    };

    const closePopup = () => {
        setPopup({ show: false, message: "", type: "success" });
    };

    const sendVerification = async () => {
        if (!email) {
            showPopup("Please enter an email first", "error");
            return;
        }

        try {
            setSending(true);
            await axios.post("http://localhost:5000/api/verifyEmail/sendCode", { email });
            setCodeSent(true);
            showPopup("Verification code sent!", "success");
        } catch (err) {
            console.error(err);
            showPopup("Failed to send code", "error");
        } finally {
            setSending(false);
        }
    };

    const validateCode = async () => {
        try {
            setVerifying(true);
            const res = await axios.post("http://localhost:5000/api/verifyEmail/validateCode", {
                email,
                code: verificationCode,
            });

            if (res.data.verified) {
                setEmailVerified(true);
                onVerified(true);
                showPopup("Email verified!", "success");
            } else {
                showPopup("Invalid code", "error");
            }
        } catch (err) {
            console.error(err);
            showPopup("Verification failed", "error");
        } finally {
            setVerifying(false);
        }
    };

    return (
        <>
            {popup.show && (
                <PopupModal
                    message={popup.message}
                    type={popup.type}
                    onClose={closePopup}
                />
            )}

            <div className="w-full">
                <label htmlFor="email" className="block font-semibold mb-1">Email</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-green-300 text-black"
                />
            </div>

            <SubmitButton loading={sending} onClick={sendVerification} disabled={emailVerified || !email}>
                Send Verification Code
            </SubmitButton>

            {codeSent && !emailVerified && (
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Enter verification code"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-green-300 text-black"
                    />

                    <SubmitButton loading={verifying} onClick={validateCode} disabled={!verificationCode}>
                        Verify Code
                    </SubmitButton>
                </div>
            )}
        </>
    );
}
