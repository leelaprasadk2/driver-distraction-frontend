"use client"

import React from "react"
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { motion } from "framer-motion"
import { Mail, Loader2 } from "lucide-react"

export default function forgetPassword() {

    const [user, setUser] = useState({ email: "" })
    const [loading, setLoading] = useState(false)

    const emailsubmit = async () => {
        try {
            setLoading(true)
            const response = await axios.post("api/users/forgetPassword/", user)
            console.log("email sent successfully", response)
            toast.success("Email sent successfully 🚀")
        } catch (error: any) {
            console.log(error.response?.data?.message)
            toast.error(error.response?.data?.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

   return (
  <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-black relative overflow-hidden flex items-center justify-center px-4">

    {/* Background Glow */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-20 left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
    </div>

    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl p-10 text-white"
    >

      {/* Floating Car */}
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
      <h1 className="text-4xl font-bold text-center mb-3">
        Forgot Password
      </h1>

      <p className="text-center text-gray-400 mb-8">
        Enter your registered email to receive a secure reset link
      </p>

      <div className="space-y-6">

        {/* Email Input */}
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
            placeholder="Enter your email"
            className="
              w-full
              pl-12
              pr-4
              py-4
              rounded-2xl
              bg-white/10
              border
              border-white/10
              text-white
              placeholder-gray-400
              focus:outline-none
              focus:border-cyan-500
              transition
            "
          />
        </div>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={emailsubmit}
          disabled={loading}
          className="
            w-full
            bg-gradient-to-r
            from-cyan-500
            to-blue-600
            hover:from-cyan-400
            hover:to-blue-500
            text-white
            font-semibold
            py-4
            rounded-2xl
            shadow-lg
            transition-all
            flex
            items-center
            justify-center
            gap-2
          "
        >
          {loading && (
            <Loader2
              className="animate-spin"
              size={18}
            />
          )}

          {loading
            ? "Sending Reset Link..."
            : "Send Reset Link"}
        </motion.button>

      </div>

      {/* Security Notice */}
      <div className="mt-6 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4">
        <p className="text-yellow-300 text-sm text-center">
          🔒 A password reset link will be sent to your registered email address.
        </p>
      </div>

      {/* Back to Login */}
      <div className="mt-8 text-center text-sm text-gray-400">
        Remember your password?{" "}
        <a
          href="/login"
          className="text-cyan-400 hover:text-cyan-300 font-medium"
        >
          Back to Login
        </a>
      </div>

    </motion.div>
  </div>
);
}