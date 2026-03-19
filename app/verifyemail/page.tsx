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
        <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 overflow-hidden px-4">

            {/* Background blur shapes */}
            <div className="absolute w-72 h-72 bg-white/20 rounded-full blur-3xl top-10 left-10"></div>
            <div className="absolute w-96 h-96 bg-pink-400/30 rounded-full blur-3xl bottom-10 right-10"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-10 w-full max-w-md text-white text-center"
            >

                <h1 className="text-3xl font-bold mb-6">
                    Email Verification
                </h1>

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="animate-spin" size={40} />
                        <p className="text-white/70">
                            Verifying your email...
                        </p>
                    </div>
                )}

                {/* Success State */}
                {verified && !loading && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <CheckCircle2 size={50} className="text-green-400" />
                        <p className="text-green-300 font-semibold">
                            Your email has been verified successfully!
                        </p>
                        <Link
                            href="/login"
                            className="bg-white text-indigo-600 px-6 py-2 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
                        >
                            Go to Login
                        </Link>
                    </motion.div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <XCircle size={50} className="text-red-400" />
                        <p className="text-red-300 font-semibold">
                            Invalid or expired token.
                        </p>
                        <p className="text-white/60 text-sm">
                            Please try again or request a new verification link.
                        </p>
                    </motion.div>
                )}

            </motion.div>
        </div>
    )
}