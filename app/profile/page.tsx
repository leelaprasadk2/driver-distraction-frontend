"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import {
  User,
  LogOut,
  ImageIcon,
  Video,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();

  const [data, setData] = useState("nothing here");
  const [count, setCount] = useState(0);

  const logout = async () => {
  try {
    await axios.get("/api/users/logout");

    localStorage.removeItem("userId");

    toast.success("Successfully logged out 🚀");

    router.push("/login");
  } catch (error) {
    toast.error("Logout failed");
  }
};

  const getdata = async () => {
    try {
      const res = await axios.get("/api/users/me");

      setData(res.data.user.username);
      setCount(res.data.user.distractedCount);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-black text-white px-4 py-10">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              repeat: Infinity,
              duration: 3,
            }}
            className="text-6xl mb-4"
          >
            🚗
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Driver Monitoring Dashboard
          </h1>

          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            AI-powered driver distraction monitoring system designed
            to improve road safety and reduce accident risks.
          </p>
        </motion.div>

        {/* USER CARD */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">

            <div className="flex items-center gap-5">

              <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center">
                <User size={42} />
              </div>

              <div>

                <h2 className="text-3xl font-bold">
                  {data !== "nothing here"
                    ? data
                    : "Loading..."}
                </h2>

                <div className="flex items-center gap-2 mt-2">
                  <ShieldCheck
                    size={18}
                    className="text-green-400"
                  />

                  <span className="text-green-400 font-medium">
                    Verified by Admin
                  </span>
                </div>

                <p className="text-gray-400 mt-2">
                  Access granted to Driver Safety AI Platform
                </p>

              </div>

            </div>

            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl px-8 py-5">

              <p className="text-gray-300 text-sm">
                Distracted Count
              </p>

              <h2 className="text-5xl font-bold text-red-400">
                {count}
              </h2>

            </div>

          </div>
        </motion.div>

       

         

        {/* DISCLAIMER */}
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-3xl p-6">

          <div className="flex items-center gap-3 mb-4">

            <AlertTriangle
              className="text-yellow-400"
            />

            <h3 className="font-bold text-yellow-300 text-xl">
              Important Notice
            </h3>

          </div>

          <p className="text-gray-300 leading-7">
            This application uses Artificial Intelligence
            and Deep Learning models to detect distracted
            driving behavior. Predictions may occasionally
            be inaccurate and should be considered as
            assistance only.
          </p>

          <p className="text-gray-300 mt-4 leading-7">
            Access to this platform is restricted to users
            verified by the administrator. The goal of this
            system is to promote safer driving practices,
            reduce accidents, and improve overall road
            safety awareness.
          </p>

        </div>

      </div>

    </div>
  );
}