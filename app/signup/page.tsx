"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { User, Mail, Lock, Loader2, Eye, EyeOff } from "lucide-react";

export default function SignupPage() {

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const router = useRouter();
  const [buttonDisabled, setbuttonDisabled] = useState(true);
  const [loading, setloading] = useState(false);

  // ✅ NEW STATES
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  // ✅ PASSWORD VALIDATION FUNCTION
  const validatePassword = (value: string) => {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{7,}$/;

    if (!regex.test(value)) {
      setPasswordError(
        "Password must be 7+ characters, include 1 number & 1 special character"
      );
    } else {
      setPasswordError("");
    }
  };

  const onSignup = async () => {
    // ❌ STOP if password invalid
    if (passwordError) {
      toast.error("Please fix password before submitting");
      return;
    }

    try {
      setloading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Successfully signed up", response.data);
      toast.success("Successfully signed up 🎉");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0 &&
      !passwordError // ✅ ALSO CHECK ERROR
    ) {
      setbuttonDisabled(false);
    } else {
      setbuttonDisabled(true);
    }
  }, [user, passwordError]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 overflow-hidden px-4">

      {/* Background blur shapes */}
      <div className="absolute w-72 h-72 bg-white/20 rounded-full blur-3xl top-10 left-10"></div>
      <div className="absolute w-96 h-96 bg-pink-400/30 rounded-full blur-3xl bottom-10 right-10"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-10 w-full max-w-md text-white"
      >

        <h1 className="text-3xl font-bold text-center mb-2">
          {loading ? "Processing..." : "Create Account"}
        </h1>

        <p className="text-center text-white/70 mb-8 text-sm">
          Join us and start your journey 🚀
        </p>

        <div className="space-y-6">

          {/* Username */}
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" size={18} />
            <input
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="Username"
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/20 border border-white/30 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-white/60 transition"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" size={18} />
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Email"
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/20 border border-white/30 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-white/60 transition"
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
                validatePassword(e.target.value); // ✅ LIVE VALIDATION
              }}
              placeholder="Password"
              className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/20 border border-white/30 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-white/60 transition"
            />

            {/* 👁️ Eye Toggle */}
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-white/70 hover:text-white"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>

          {/* ❗ Password Error */}
          {passwordError && (
            <p className="text-red-300 text-sm -mt-4">{passwordError}</p>
          )}

          {/* Signup Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onSignup}
            disabled={buttonDisabled}
            className="w-full flex items-center justify-center gap-2 bg-white text-indigo-600 font-semibold py-3 rounded-xl shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading && <Loader2 className="animate-spin" size={18} />}
            {loading ? "Processing..." : "Sign Up"}
          </motion.button>
        </div>

        <div className="mt-6 text-center text-sm text-white/70">
          Already have an account?{" "}
          <Link href="/login" className="underline hover:text-white transition">
            Login
          </Link>
        </div>

      </motion.div>
    </div>
  );
}