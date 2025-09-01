import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../src/api.js";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.type === "text"
                ? "name"
                : e.target.type === "email"
                    ? "email"
                    : "password"]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                // 🔹 LOGIN
                await API.post(
                    "/auth/login",
                    {
                        email: formData.email,
                        password: formData.password,
                    },
                    { withCredentials: true }
                );

                toast.success("Login successful");
                navigate("/Dashboard");
            } else {
                // 🔹 REGISTER
                await API.post("/auth/create-user", {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                });

                toast.success("Signup successful, please verify your email");
                localStorage.setItem("email", formData.email);

                //creart report 
                setIsLogin(true);
                navigate("/verify-email");

            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                    {isLogin ? "Sign in to your account" : "Create your account"}
                </h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Enter your name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition cursor-pointer"
                    >
                        {isLogin ? "Login" : "Sign Up"}
                    </button>
                </form>

                <div className="flex items-center gap-2 my-6">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className="text-gray-500 text-sm">OR</span>
                    <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                <p className="text-center text-gray-600 mt-6">
                    {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
                    <button
                        type="button"
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-blue-600 font-semibold hover:underline cursor-pointer"
                    >
                        {isLogin ? "Sign Up" : "Login"}
                    </button>
                </p>
            </div>
        </div>
    );
}
