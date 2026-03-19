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
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 overflow-hidden px-4">

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
          Reset Password
        </h1>

        <p className="text-center text-white/70 mb-8 text-sm">
          Enter your new password below
        </p>

        <div className="space-y-6">

          {/* New Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" size={18} />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/20 border border-white/30 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-white/60 transition"
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" size={18} />
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm New Password"
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/20 border border-white/30 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-white/60 transition"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={submitPassword}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-white text-indigo-600 font-semibold py-3 rounded-xl shadow-lg transition disabled:opacity-60"
          >
            {loading && <Loader2 className="animate-spin" size={18} />}
            {loading ? "Updating..." : "Reset Password"}
          </motion.button>

        </div>
      </motion.div>
    </div>
  );
}