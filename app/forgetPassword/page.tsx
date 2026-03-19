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
        <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 overflow-hidden">

            {/* Blurred floating background circles */}
            <div className="absolute w-72 h-72 bg-white/20 rounded-full blur-3xl top-10 left-10"></div>
            <div className="absolute w-96 h-96 bg-pink-400/30 rounded-full blur-3xl bottom-10 right-10"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-10 w-full max-w-md text-white"
            >

                <h1 className="text-3xl font-bold text-center mb-2">
                    Forgot Password
                </h1>

                <p className="text-center text-sm text-white/70 mb-8">
                    Enter your email to receive a reset link
                </p>

                <div className="space-y-6">

                    {/* Input Field */}
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" size={18} />

                        <input
                            type="email"
                            id="email"
                            value={user.email}
                            onChange={(e) =>
                                setUser({ ...user, email: e.target.value })
                            }
                            placeholder="Enter your email"
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/20 border border-white/30 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-white/60 transition"
                        />
                    </div>

                    {/* Button */}
                    <motion.button
                        whileTap={{ scale: 0.97 }}
                        whileHover={{ scale: 1.02 }}
                        onClick={emailsubmit}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 bg-white text-indigo-600 font-semibold py-3 rounded-xl shadow-lg transition disabled:opacity-60"
                    >
                        {loading && <Loader2 className="animate-spin" size={18} />}
                        {loading ? "Sending..." : "Send Reset Link"}
                    </motion.button>
                </div>

                <div className="mt-8 text-center text-sm text-white/70">
                    Remember your password?{" "}
                    <span className="underline cursor-pointer hover:text-white">
                        Back to login
                    </span>
                </div>

            </motion.div>
        </div>
    )
}