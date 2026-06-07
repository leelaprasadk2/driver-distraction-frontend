"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Mail, Lock, Loader2, Eye, EyeOff } from "lucide-react";
import { Info } from "lucide-react";
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
  <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-black flex items-center justify-center px-4">
  <Link
  href="/about"
  className="absolute top-6 right-6 z-50 flex items-center gap-2 px-5 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-cyan-500/20 transition-all duration-300"
>
  <Info size={18} />
  About
</Link>
    {/* Background Glow Effects */}
    <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/20 blur-[150px] rounded-full" />

    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[150px] rounded-full" />

    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)]" />

    {/* Floating Car */}
    

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="relative z-10 w-full max-w-md"
    >
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-3xl p-8 md:p-10 text-white">

        {/* Heading */}
        <div className="text-center mb-8">

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl mb-4"
          >
            🚗
          </motion.div>

          <h1 className="text-4xl font-bold mb-2">
            Driver Safety AI
          </h1>

          <p className="text-gray-400">
            Login to access Driver Monitoring System
          </p>
        </div>

        <div className="space-y-5">

          {/* Email */}
          <div className="relative">
            <Mail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />

            <input
              type="email"
              value={user.email}
              onChange={(e) =>
                setUser({ ...user, email: e.target.value })
              }
              placeholder="Enter your email"
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />

            <input
              type={showPassword ? "text" : "password"}
              value={user.password}
              onChange={(e) => {
                setUser({
                  ...user,
                  password: e.target.value,
                });
                validatePassword(e.target.value);
              }}
              placeholder="Enter your password"
              className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
            />

            <div
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white transition"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </div>
          </div>

          {/* Error */}
          {passwordError && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-sm"
            >
              {passwordError}
            </motion.p>
          )}

          {/* Login Button */}
          <motion.button
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
            onClick={LoginUp}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg hover:shadow-cyan-500/25 transition-all disabled:opacity-60"
          >
            <div className="flex items-center justify-center gap-2">
              {loading && (
                <Loader2
                  className="animate-spin"
                  size={18}
                />
              )}

              {loading
                ? "Logging in..."
                : "Login"}
            </div>
          </motion.button>
        </div>

        {/* Links */}
        <div className="mt-6 flex flex-col items-center gap-3">

          <Link
            href="/forgetPassword"
            className="text-gray-400 hover:text-cyan-400 transition"
          >
            Forgot Password?
          </Link>

          <Link
            href="/signup"
            className="text-gray-400 hover:text-cyan-400 transition"
          >
            Don't have an account? Sign Up
          </Link>

        </div>

        {/* Footer */}
        <div className="mt-8 border-t border-white/10 pt-5 text-center text-xs text-gray-500">
          AI Powered Driver Distraction Detection
        </div>

      </div>
    </motion.div>
  </div>
);
}