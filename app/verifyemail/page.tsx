"use client"
import axios from "axios"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"

export default function VerifyEmailPage() {

    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", { token })
            setVerified(true)
        } catch (error: any) {
            setError(true)
            console.log(error.response?.data)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")
    }, [])

    useEffect(() => {
        if (token) {
            verifyUserEmail()
        }
    }, [token])

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
      className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl p-10 text-white text-center"
    >

      {/* Animated Car */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          repeat: Infinity,
          duration: 3,
        }}
        className="text-5xl mb-5"
      >
        🚗
      </motion.div>

      <h1 className="text-4xl font-bold mb-3">
        Email Verification
      </h1>

      <p className="text-gray-400 mb-8">
        Driver Safety AI Account Verification
      </p>

      {/* Loading */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <Loader2
            size={45}
            className="animate-spin text-cyan-400"
          />

          <p className="text-gray-300">
            Verifying your email...
          </p>
        </motion.div>
      )}

      {/* Success */}
      {verified && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-5"
        >
          <div className="bg-green-500/10 border border-green-500/20 p-5 rounded-full">
            <CheckCircle2
              size={60}
              className="text-green-400"
            />
          </div>

          <h2 className="text-2xl font-semibold text-green-400">
            Verification Successful
          </h2>

          <p className="text-gray-300">
            Your email has been verified successfully.
            You can now login and access the platform.
          </p>

          <Link
            href="/login"
            className="
              w-full
              bg-gradient-to-r
              from-cyan-500
              to-blue-600
              hover:from-cyan-400
              hover:to-blue-500
              py-3
              rounded-xl
              font-semibold
              shadow-lg
              transition-all
            "
          >
            Go to Login
          </Link>
        </motion.div>
      )}

      {/* Error */}
      {error && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-5"
        >
          <div className="bg-red-500/10 border border-red-500/20 p-5 rounded-full">
            <XCircle
              size={60}
              className="text-red-400"
            />
          </div>

          <h2 className="text-2xl font-semibold text-red-400">
            Verification Failed
          </h2>

          <p className="text-gray-300">
            This verification link is invalid or has expired.
          </p>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
            <p className="text-yellow-300 text-sm">
              Please request a new verification email and try again.
            </p>
          </div>

          <Link
            href="/login"
            className="
              w-full
              bg-white/10
              border
              border-white/10
              hover:bg-white/20
              py-3
              rounded-xl
              transition
            "
          >
            Back to Login
          </Link>
        </motion.div>
      )}

    </motion.div>
  </div>
);
}