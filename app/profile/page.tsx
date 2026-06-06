"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, LogOut, Database, ImageIcon, Video } from "lucide-react";

export default function ProfilePage() {

  const router = useRouter();

  const [data, setData] = useState("nothing here");
  const [count, setCount] = useState(0);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Successfully logged out 🚀");
      router.push("/login");
    } catch (error: any) {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center px-4">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-10 w-full max-w-md text-white"
      >

        <div className="flex items-center justify-center mb-6">
          <User size={40} className="text-white/80" />
        </div>

        <h1 className="text-3xl font-bold text-center mb-2">
          Driver Monitoring Dashboard
        </h1>

        <p className="text-center text-white/70 mb-8">
          Welcome {data !== "nothing here" ? data : "User"}
        </p>

        {/* USER DATA */}
        <div className="text-center mb-6">
          {data === "nothing here" ? (
            <p className="text-white/60">Click Get Data</p>
          ) : (
            <>
              <p className="text-lg font-semibold">{data}</p>

              <p className="mt-2 bg-white/20 px-4 py-2 rounded-lg">
                🚨 Distracted Count: {count}
              </p>
            </>
          )}
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col gap-4">

          {/* IMAGE */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/dashboard")}
            className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl"
          >
            <ImageIcon size={18} />
            Image Detection
          </motion.button>

          {/* VIDEO */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/video")}
            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl"
          >
            <Video size={18} />
            Video Detection
          </motion.button>

         
          {/* GET DATA */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={getdata}
            className="flex items-center justify-center gap-2 bg-white text-indigo-600 font-semibold py-3 rounded-xl"
          >
            <Database size={18} />
            Get Data
          </motion.button>

          {/* LOGOUT */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={logout}
            className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl"
          >
            <LogOut size={18} />
            Logout
          </motion.button>

        </div>

      </motion.div>
    </div>
  );
}