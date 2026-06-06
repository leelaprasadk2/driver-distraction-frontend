"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Mail, Lock, Loader2, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    // ✅ NEW STATES
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");

    const router = useRouter();

    // ✅ PASSWORD VALIDATION
    const validatePassword = (value: string) => {
        const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{7,}$/;

        if (!regex.test(value)) {
            setPasswordError("Password must be 7+ chars, include number & special char");
        } else {
            setPasswordError("");
        }
    };

    const LoginUp = async () => {

        // ❌ STOP if invalid format
        if (passwordError) {
            toast.error("Invalid password format");
            return;
        }

        try {
            setLoading(true);

            const response = await axios.post("/api/users/login", user);

            console.log("successfully login", response);

            if (response.data.user?._id) {
                localStorage.setItem("userId", response.data.user._id);
                console.log("Stored User ID:", response.data.user._id);
            }

            toast.success("Successfully login 🚀");
            router.push("/profile");

        } catch (error: any) {
            console.log(error.response?.data?.message);

            // ✅ SHOW WRONG PASSWORD MESSAGE
            setPasswordError(error.response?.data?.message || "Login failed");

            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 overflow-hidden">

            {/* Background blur circles */}
            <div className="absolute w-72 h-72 bg-white/20 rounded-full blur-3xl top-10 left-10"></div>
            <div className="absolute w-96 h-96 bg-pink-400/30 rounded-full blur-3xl bottom-10 right-10"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-10 w-full max-w-md text-white"
            >

                <h1 className="text-3xl font-bold text-center mb-2">
                    Welcome Back
                </h1>

                <p className="text-center text-sm text-white/70 mb-8">
                    Login to your account
                </p>

                <div className="space-y-6">

                    {/* Email */}
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" size={18} />
                        <input
                            type="email"
                            value={user.email}
                            onChange={(e) =>
                                setUser({ ...user, email: e.target.value })
                            }
                            placeholder="Enter your email"
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/20 border border-white/30 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-white/60"
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" size={18} />

                        <input
                            type={showPassword ? "text" : "password"}
                            value={user.password}
                            onChange={(e) => {
                                setUser({ ...user, password: e.target.value });
                                validatePassword(e.target.value); // ✅ LIVE CHECK
                            }}
                            placeholder="Enter your password"
                            className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/20 border border-white/30 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-white/60"
                        />

                        {/* 👁️ Eye Toggle */}
                        <div
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-white/70 hover:text-white"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </div>
                    </div>

                    {/* ❗ Error Message */}
                    {passwordError && (
                        <p className="text-red-300 text-sm -mt-4">{passwordError}</p>
                    )}

                    {/* Button */}
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={LoginUp}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 bg-white text-indigo-600 font-semibold py-3 rounded-xl shadow-lg disabled:opacity-60"
                    >
                        {loading && <Loader2 className="animate-spin" size={18} />}
                        {loading ? "Logging in..." : "Login"}
                    </motion.button>
                </div>

                {/* Links */}
                <div className="mt-6 flex flex-col items-center gap-3 text-sm">
                    <Link href="/forgetPassword" className="text-white/70 hover:text-white">
                        Forgot Password?
                    </Link>
                    <Link href="/signup" className="text-white/70 hover:text-white">
                        Don't have an account? Sign up
                    </Link>
                </div>

            </motion.div>
        </div>
    );
}