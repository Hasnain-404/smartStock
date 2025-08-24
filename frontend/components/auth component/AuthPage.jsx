import { useState } from "react";

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 p-6">
            <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">

                {/* Header */}
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    {isLogin ? "Welcome Back 👋" : "Create Account 🚀"}
                </h2>

                {/* Form */}
                <form className="space-y-4">
                    {!isLogin && (
                        <div>
                            <label className="block text-gray-600 font-medium mb-1">Full Name</label>
                            <input
                                type="text"
                                required
                                placeholder="Enter your name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-gray-600 font-medium mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 font-medium mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    {/* Login / Signup Btn */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
                    >
                        {isLogin ? "Login" : "Sign Up"}
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-2 my-6">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className="text-gray-500 text-sm">OR</span>
                    <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                {/* Toggle Login/Signup */}
                <p className="text-center text-gray-600 mt-6">
                    {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        {isLogin ? "Sign Up" : "Login"}
                    </button>
                </p>
            </div>
        </div>
    );
}
