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
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="w-full bg-gradient-to-r from-purple-700 to-pink-500 p-8 rounded-lg shadow-2xl"
  >
    <h2 className="text-3xl font-semibold mb-4 text-white drop-shadow-lg">
      Emotion Detection Area
    </h2>
    <p className="text-lg text-gray-100 text-center mb-6">
      Click the button below to activate your camera, let our system analyze your face,
      and detect your dominant emotion.
    </p>
    <motion.button 
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="mt-6 px-6 py-3 bg-green-600 rounded-full hover:bg-green-700 transition duration-300 ease-in-out text-lg font-semibold shadow-lg"
      onClick={handleDetectEmotion}
      disabled={loading}
    >
      {loading ? "Detecting..." : "Detect Emotion"}
    </motion.button>
    {error && <p className="text-red-400 mt-2 font-medium">{error}</p>}
    <p className="text-sm text-gray-300 mt-4">
      The camera will be activated for 3 seconds to capture your emotion.
    </p>
  </motion.div>
</div>


{/* Display Detected Emotion */}
<div className="w-full md:w-1/3 p-8 flex flex-col justify-center items-center">
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg p-8 w-full text-center shadow-2xl"
  >
    <h3 className="text-3xl font-bold mb-4 text-white drop-shadow-lg">
      Your Emotion
    </h3>
    <p className="text-xl mb-4 text-white">
      Your emotion is{" "}
      <span className="mx-2 inline-block px-4 py-2 bg-white text-indigo-600 font-bold rounded-md border-2 border-indigo-400">
        {emotion}
      </span>
    </p>
    <p className="mt-4 text-lg text-white">
      Based on your current vibe, we recommend tunes that match your mood perfectly!
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
