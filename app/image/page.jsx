"use client";

import { useState, useEffect } from "react";

export default function Image() {
  const [result, setResult] = useState("");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  // ✅ Load count on page load
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch("/api/users/me");
        const data = await res.json();
        setCount(data.user.distractedCount || 0);
      } catch (err) {
        console.log("Error fetching count");
      }
    };

    fetchCount();
  }, []);

  const handleImage = async (e) => {
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
   const res = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/predict-image`,
  {
    method: "POST",
    body: formData,
  }
);

      if (!res.ok) {
        throw new Error("Prediction failed");
      }

      const data = await res.json();
      setResult(data.prediction);

      // 🔊 IF DISTRACTED
      if (data.prediction !== "Safe Driving") {
        const audio = new Audio("/alert.mp3");
        audio.play().catch(() => {});

        const userId = localStorage.getItem("userId");
 console.log("USER ID:", userId);
        if (!userId) {
          console.log("User ID missing");
        } else {
          // 🔥 UPDATE COUNT IN DB
          const updateRes = await fetch("/api/users/updateCount", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
          });

          const updateData = await updateRes.json();

          if (updateData.count !== undefined) {
            setCount(updateData.count);
          }
        }
      }

    } catch (error) {
      console.error(error);
      setResult("Error");
    }

    setLoading(false);
  };

  // ✅ Cleanup preview memory
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 flex items-center justify-center px-4 py-10 overflow-hidden relative">

  {/* Background Effects */}
  <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
  <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>

  <div className="w-full max-w-4xl">

    {/* Header */}
    <div className="text-center mb-10">
      <h1 className="text-5xl font-bold text-white mb-4">
        🚗 AI Image Detection
      </h1>

      <p className="text-gray-300 max-w-2xl mx-auto">
        Upload driver images and let the AI model analyze
        distracted driving behaviour in real time.
      </p>
    </div>

    {/* Stats */}
    <div className="flex justify-center mb-8">
      <div className="bg-red-500/10 border border-red-500/30 px-8 py-5 rounded-2xl backdrop-blur-xl">
        <p className="text-gray-300 text-sm">
          Distracted Count
        </p>

        <h2 className="text-4xl font-bold text-red-400">
          {count}
        </h2>
      </div>
    </div>

    {/* Main Card */}
    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl">

      {/* Upload Area */}
      <label className="group cursor-pointer">

        <div className="border-2 border-dashed border-blue-400/40 rounded-3xl p-10 text-center transition-all duration-300 hover:border-blue-400 hover:bg-blue-500/10">

          <div className="text-6xl mb-4 group-hover:scale-110 transition">
            📸
          </div>

          <h3 className="text-2xl font-semibold text-white mb-2">
            Upload Driver Image
          </h3>

          <p className="text-gray-300">
            JPG, PNG supported
          </p>

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="hidden"
          />
        </div>

      </label>

      {/* Preview */}
      {preview && (
        <div className="mt-8">

          <h3 className="text-white font-semibold mb-3">
            Preview
          </h3>

          <img
            src={preview}
            alt="Preview"
            className="rounded-2xl w-full max-h-[400px] object-cover shadow-2xl border border-white/20"
          />
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="mt-8 text-center">

          <div className="inline-flex items-center gap-3 bg-yellow-500/10 border border-yellow-500/30 px-6 py-4 rounded-2xl">

            <div className="w-5 h-5 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>

            <span className="text-yellow-300 font-medium">
              AI is analyzing image...
            </span>

          </div>
        </div>
      )}

      {/* Results */}
      {result && !loading && (
        <div className="mt-8">

          {result === "Safe Driving" ? (

            <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6 text-center">
              <div className="text-5xl mb-3">✅</div>

              <h2 className="text-2xl font-bold text-green-400">
                Safe Driving
              </h2>

              <p className="text-gray-300 mt-2">
                Driver appears focused and attentive.
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
                Distracted Driving
              </h2>

              <p className="text-gray-300 mt-2">
                Attention required. Potential distraction detected.
              </p>
            </div>

          )}

        </div>
      )}

    </div>

  </div>

</div>
  );
}