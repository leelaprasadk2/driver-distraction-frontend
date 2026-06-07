"use client";
import { useState, useEffect } from "react";

export default function VideoPage() {
  const [result, setResult] = useState("");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVideo = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);

    setLoading(true);
    setResult("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      // 🔥 CALL FLASK API
      const API_URL = process.env.NEXT_PUBLIC_API_URL;

const res = await fetch(`${API_URL}/predict-video`, {
  method: "POST",
  body: formData,
});

      if (!res.ok) {
        throw new Error("Server error");
      }

      const data = await res.json();
      setResult(data.prediction);

      // 🔊 ALERT + DB UPDATE
      if (data.prediction !== "Safe Driving") {
        const audio = new Audio("/alert.mp3");
        audio.play().catch(() => {});

        const userId = localStorage.getItem("userId");

        console.log("USER ID:", userId);

        if (!userId) {
          console.log("User ID missing");
        } else {
          const updateRes = await fetch("/api/users/updateCount", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
          });

          const updateData = await updateRes.json();
          console.log("Updated Count:", updateData.count);
        }
      }

    } catch (error) {
      console.error(error);
      setResult("Error");
    }

    setLoading(false);
  };

  // Cleanup preview
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 flex items-center justify-center px-4 py-10 overflow-hidden relative">

    {/* Animated Background */}
    <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>

    <div className="w-full max-w-5xl">

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold text-white mb-4">
          🎥 AI Video Detection
        </h1>

        <p className="text-gray-300 max-w-2xl mx-auto">
          Upload a driving video and let AI analyze driver
          distraction frame-by-frame with intelligent
          safety monitoring.
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl">

        {/* Upload Area */}
        <label className="group cursor-pointer">

          <div className="border-2 border-dashed border-green-400/40 rounded-3xl p-12 text-center transition-all duration-300 hover:border-green-400 hover:bg-green-500/10">

            <div className="text-7xl mb-4 group-hover:scale-110 transition">
              🎬
            </div>

            <h3 className="text-3xl font-semibold text-white mb-3">
              Upload Driver Video
            </h3>

            <p className="text-gray-300">
              MP4, AVI, MOV Supported
            </p>

            <input
              type="file"
              accept="video/*"
              onChange={handleVideo}
              className="hidden"
            />
          </div>

        </label>

        {/* Preview */}
        {preview && (
          <div className="mt-8">

            <h3 className="text-white font-semibold mb-3">
              Video Preview
            </h3>

            <video
              controls
              src={preview}
              className="w-full rounded-2xl border border-white/20 shadow-2xl"
            />

          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="mt-8 text-center">

            <div className="inline-flex items-center gap-3 bg-yellow-500/10 border border-yellow-500/30 px-6 py-4 rounded-2xl">

              <div className="w-5 h-5 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>

              <span className="text-yellow-300 font-medium">
                AI is analyzing video...
              </span>

            </div>

          </div>
        )}

        {/* Result */}
        {result && !loading && (
          <div className="mt-8">

            {result === "Safe Driving" ? (

              <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6 text-center">

                <div className="text-5xl mb-3">✅</div>

                <h2 className="text-2xl font-bold text-green-400">
                  Safe Driving
                </h2>

                <p className="text-gray-300 mt-2">
                  Driver remained focused throughout the video.
                </p>

              </div>

            ) : result === "Error" ? (

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6 text-center">

                <div className="text-5xl mb-3">⚠️</div>

                <h2 className="text-2xl font-bold text-yellow-400">
                  Processing Error
                </h2>

              </div>

            ) : (

              <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 text-center">

                <div className="text-5xl mb-3">🚨</div>

                <h2 className="text-2xl font-bold text-red-400">
                  Distracted Driving Detected
                </h2>

                <p className="text-gray-300 mt-2">
                  Driver attention loss detected in the video.
                </p>

              </div>

            )}

          </div>
        )}

      </div>

      {/* Disclaimer */}
      <div className="mt-8 bg-yellow-500/10 border border-yellow-500/30 rounded-3xl p-6">

        <h3 className="text-yellow-300 font-bold mb-3">
          ⚠️ Important Notice
        </h3>

        <p className="text-gray-300 leading-7">
          This AI model assists in detecting distracted driving
          behavior. Predictions may occasionally be inaccurate
          and should not be considered a replacement for human
          judgment. Only verified users are allowed to access
          this system.
        </p>

      </div>

    </div>

  </div>
);
}