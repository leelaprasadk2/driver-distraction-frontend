export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-slate-900 to-black text-white">

      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">

          <div className="text-6xl mb-6"></div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Driver Safety Monitoring System
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            AI-powered driver distraction detection system designed to
            improve road safety and reduce accidents caused by distracted
            driving behavior.
          </p>

        </div>
      </section>

      {/* Cards */}
      <section className="max-w-7xl mx-auto px-6 pb-16">

        <div className="grid md:grid-cols-2 gap-8">

          {/* About */}
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/20">
            <h2 className="text-3xl font-bold mb-4">
              🚘 About Project
            </h2>

            <p className="text-gray-300 leading-8">
              This project uses Deep Learning and Computer Vision
              techniques to analyze driver images and videos and
              determine whether the driver is focused or distracted.
            </p>

            <p className="text-gray-300 leading-8 mt-4">
              The system helps improve road safety by providing early
              detection of unsafe driving behavior and generating alerts
              when distraction is identified.
            </p>
          </div>

          {/* Features */}
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/20">
            <h2 className="text-3xl font-bold mb-4">
              ⭐ Features
            </h2>

            <ul className="space-y-4 text-gray-300">
              <li>✅ Driver Distraction Detection</li>
              <li>✅ Image-Based Prediction</li>
              <li>✅ Video-Based Prediction</li>
              <li>✅ Audio Alert System</li>
              <li>✅ Detection Count Tracking</li>
              <li>✅ User Authentication</li>
              <li>✅ Admin Verification</li>
            </ul>
          </div>

          {/* Admin Verification */}
          <div className="bg-green-500/10 border border-green-500/30 p-8 rounded-3xl">
            <h2 className="text-3xl font-bold text-green-400 mb-4">
              🔐 Verified Users Only
            </h2>

            <p className="text-gray-300 leading-8">
              To ensure responsible usage, every user must be verified by
              the administrator before gaining access to the Driver
              Safety Monitoring System.
            </p>

            <p className="text-gray-300 leading-8 mt-4">
              Unverified users cannot access prediction services or
              dashboard functionalities.
            </p>
          </div>

          {/* Disclaimer */}
          <div className="bg-yellow-500/10 border border-yellow-500/30 p-8 rounded-3xl">
            <h2 className="text-3xl font-bold text-yellow-400 mb-4">
              ⚠ AI Prediction Disclaimer
            </h2>

            <p className="text-gray-300 leading-8">
              This application uses Artificial Intelligence to predict
              driver distraction. Although trained on driving datasets,
              the model may occasionally produce incorrect predictions.
            </p>

            <p className="text-gray-300 leading-8 mt-4">
              Predictions should be considered as assistance only and not
              as a replacement for human judgment or professional safety
              assessments.
            </p>
          </div>

        </div>

        {/* Mission Section */}
        <div className="mt-10 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-10">

          <h2 className="text-4xl font-bold text-center mb-6">
            🛡 Our Mission
          </h2>

          <p className="text-center text-gray-300 text-lg leading-8 max-w-4xl mx-auto">
            Our mission is to leverage Artificial Intelligence and
            Machine Learning technologies to improve driver awareness,
            reduce distracted driving incidents, and contribute toward
            safer roads for everyone.
          </p>

        </div>

        {/* Footer Banner */}
        <div className="mt-10 text-center">

          <div className="inline-block bg-blue-600/20 border border-blue-500/30 px-8 py-4 rounded-2xl">
            <h3 className="text-xl font-semibold">
              🚦 Drive Safe • Stay Focused • Save Lives
            </h3>
          </div>

        </div>

      </section>

    </div>
  );
}