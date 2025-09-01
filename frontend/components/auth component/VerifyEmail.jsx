import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EmailVerificationPage() {
    const [verificationCode, setVerificationCode] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // agar user already verified hai aur phir bhi verify page par aata hai
        const checkVerified = async () => {
            try {
                const email = localStorage.getItem("email");
                if (!email) return;

                const res = await axios.post("https://smartstock-75j6.onrender.com/auth/check-verified", { email });
                if (res.data.verified) {
                    toast.info("Your email is already verified. Please login.");
                    navigate("/login");
                }
            } catch (err) {
                // kuch bhi error aaye to ignore, user abhi verify nahi hai
            }
        };
        checkVerified();
    }, [navigate]);

    const handleVerify = async () => {
        try {
            setLoading(true);
            const res = await axios.post(
                "https://smartstock-75j6.onrender.com/auth/verify-email",
                {
                    email: localStorage.getItem("email"),
                    verificationCode,
                },
                { withCredentials: true }
            );

            if (res.status === 200) {
                toast.success("Email verified successfully!");
                navigate("/login"); // redirect to login
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Verification failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-white p-6">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 text-center">
                <div className="flex justify-center mb-4">
                    <i className="ri-mail-send-line text-blue-600 text-6xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Verify Your Email</h2>
                <p className="text-gray-600 text-sm mb-6">
                    We have sent a verification code to your email. Please enter it below.
                </p>
                <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="Enter verification code"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center tracking-widest text-lg font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button
                    onClick={handleVerify}
                    disabled={loading}
                    className="mt-6 w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
                >
                    {loading ? "Verifying..." : "Verify Email"}
                </button>
                <p className="text-gray-600 text-sm mt-6">
                    Didn’t receive the code?{" "}
                    <button className="text-blue-600 font-semibold hover:underline">
                        Resend
                    </button>
                </p>
            </div>
        </div>
    );
}
