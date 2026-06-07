"use client";

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Lock, Loader2 } from "lucide-react";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitPassword = async () => {
    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be same");
      return;
    }

    try {
      setLoading(true);

      const token = window.location.search.split("=")[1];

      const response = await axios.patch("/api/users/resetPassword", {
        password,
        token,
      });

      console.log("password reset successfully", response);
      toast.success("Password reset successfully 🎉");
    } catch (error: any) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-black relative overflow-hidden flex items-center justify-center px-4">

    {/* Background Glow */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
    </div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl"
    >

      {/* Car Animation */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          repeat: Infinity,
          duration: 3,
        }}
        className="text-center text-5xl mb-4"
      >
        🚗
      </motion.div>

      {/* Heading */}
      <h1 className="text-5xl font-bold text-white text-center mb-3">
        Reset Password
      </h1>

      <p className="text-center text-gray-400 mb-8">
        Create a new secure password for your account
      </p>

      {/* Password */}
      <div className="relative mb-5">
        <Lock
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter New Password"
          className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition"
        />
      </div>

      {/* Confirm Password */}
      <div className="relative mb-6">
        <Lock
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm New Password"
          className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition"
        />
      </div>

      {/* Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={submitPassword}
        disabled={loading}
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-4 rounded-2xl transition-all shadow-lg"
      >
        <div className="flex justify-center items-center gap-2">
          {loading && (
            <Loader2
              className="animate-spin"
              size={18}
            />
          )}

          {loading
            ? "Updating Password..."
            : "Reset Password"}
        </div>
      </motion.button>

      {/* Security Box */}
      <div className="mt-6 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4">
        <p className="text-yellow-300 text-sm text-center">
          🔒 Use a strong password with uppercase,
          lowercase, numbers and symbols.
        </p>
      </div>

    </motion.div>
  </div>
);

}