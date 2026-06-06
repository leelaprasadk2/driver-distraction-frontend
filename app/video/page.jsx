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
      const res = await fetch("http://localhost:5000/predict-video", {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 px-4">

      <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8 w-full max-w-md text-white">

        <h1 className="text-3xl font-bold text-center mb-6">
          Video Detection
        </h1>

        {/* Upload */}
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-white/40 rounded-xl p-6 cursor-pointer hover:bg-white/10 transition">
          <span className="text-white/70">Click to upload video</span>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideo}
            className="hidden"
          />
        </label>

        {/* Preview */}
        {preview && (
          <div className="mt-6">
            <video
              src={preview}
              controls
              className="rounded-xl w-full h-48 object-cover shadow-lg"
            />
          </div>
        )}

        {/* Loading */}
        {loading && (
          <p className="text-center mt-4 text-yellow-300 animate-pulse">
            Processing video...
          </p>
        )}

        {/* Result */}
        {result && !loading && (
          <div
            className={`mt-6 text-center p-4 rounded-xl font-semibold text-lg ${
              result === "Safe Driving"
                ? "bg-green-500/80"
                : result === "Error"
                ? "bg-yellow-500/80"
                : "bg-red-500/80"
            }`}
          >
            {result === "Safe Driving"
              ? "✅ Safe Driving"
              : result === "Error"
              ? "⚠️ Error occurred"
              : "⚠️ Distracted Driving"}
          </div>
        )}
      </div>
    </div>
  );
}