import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function GetRecommendationPage() {
  // State to hold the detected emotion, loading status, and any errors
  const [emotion, setEmotion] = useState("Neutral");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDetectEmotion = async () => {
    setLoading(true);
    setError("");
    try {
      // Call the backend API endpoint (make sure your backend is running on port 5000)
      const response = await fetch("http://localhost:5000/api/emotion");
      const data = await response.json();
      if (response.ok) {
        setEmotion(data.emotion);
      } else {
        setError(data.error || "Error detecting emotion");
      }
    } catch (err) {
      setError("Error connecting to emotion detection server");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-800 to-blue-900 text-white flex flex-col items-center py-12 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-5xl font-bold">Emotion-Based Music Recommendation System</h1>
        <p className="mt-2 text-xl text-gray-300">
          Discover music that resonates with your mood
        </p>
      </header>
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Emotion Detection Area */}
        <div className="flex-1 p-8 flex flex-col justify-center items-center border-r border-gray-700">
          <h2 className="text-3xl font-semibold mb-4">Emotion Detection Area</h2>
          <p className="text-gray-400 text-center">
            Click the button below to activate your camera, let our system analyze your face,
            and detect your dominant emotion.
          </p>
          <button 
            className="mt-6 px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition"
            onClick={handleDetectEmotion}
            disabled={loading}
          >
            {loading ? "Detecting..." : "Detect Emotion"}
          </button>
          {error && <p className="text-red-400 mt-2">{error}</p>}
          <p className="text-sm text-gray-500 mt-4">
            The camera will be activated for 3 seconds to capture your emotion.
          </p>
        </div>
        {/* Display Detected Emotion */}
        <div className="w-full md:w-1/3 p-8 flex flex-col justify-center items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-orange-500 rounded-lg p-6 w-full text-center"
          >
            <h3 className="text-2xl font-bold mb-2">Your Emotion</h3>
            <p className="text-xl">{emotion}</p>
            <p className="mt-4 text-sm text-gray-100">
              Based on your current vibe, we recommend tunes that match your mood!
            </p>
          </motion.div>
        </div>
      </div>
      <div className="mt-8">
        <Link to="/" className="text-orange-400 hover:underline">
          &larr; Back to Home
        </Link>
      </div>
    </div>
  );
}

export default GetRecommendationPage;
