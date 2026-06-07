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
  <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-black flex items-center justify-center px-4">

    {/* Background Effects */}
    <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/20 blur-[150px] rounded-full" />

    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[150px] rounded-full" />

    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)]" />

    {/* Floating Car */}
    <motion.div
      animate={{
        y: [0, -12, 0],
      }}
      transition={{
        repeat: Infinity,
        duration: 4,
      }}
      className="absolute top-20 text-5xl"
    >
      🚗
    </motion.div>

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
  className="text-6xl mb-4 text-cyan-400 drop-shadow-[0_0_25px_rgba(34,211,238,0.9)]"
>
  👤
</motion.div>

          <h1 className="text-4xl font-bold mb-2">
            Create Account
          </h1>

          <p className="text-gray-400">
            Join Driver Safety AI Platform
          </p>
        </div>

        <div className="space-y-5">

          {/* Username */}
          <div className="relative">
            <User
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />

            <input
              type="text"
              value={user.username}
              onChange={(e) =>
                setUser({
                  ...user,
                  username: e.target.value,
                })
              }
              placeholder="Username"
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
            />
          </div>

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
                setUser({
                  ...user,
                  email: e.target.value,
                })
              }
              placeholder="Email Address"
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
              placeholder="Create Password"
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

          {/* Password Error */}
          {passwordError && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-sm"
            >
              {passwordError}
            </motion.p>
          )}

          {/* Signup Button */}
          <motion.button
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
            onClick={onSignup}
            disabled={buttonDisabled}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg hover:shadow-cyan-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center justify-center gap-2">

              {loading && (
                <Loader2
                  className="animate-spin"
                  size={18}
                />
              )}

              {loading
                ? "Processing..."
                : "Create Account"}
            </div>
          </motion.button>
        </div>

        {/* Login Link */}
        <div className="mt-6 text-center">

          <p className="text-gray-400">
            Already have an account?
          </p>

          <Link
            href="/login"
            className="text-cyan-400 hover:text-cyan-300 font-semibold transition"
          >
            Login Here
          </Link>

        </div>

        {/* Footer */}
        <div className="mt-8 border-t border-white/10 pt-5 text-center text-xs text-gray-500">
          AI Powered Driver Distraction Detection System
        </div>

      </div>
    </motion.div>
  </div>
);
}