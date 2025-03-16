// 3. Optional Component: TrackCard.tsx
// This component displays an individual track in a card format.

// src/components/TrackCard.tsx
import React from "react";

interface Track {
  name: string;
  artist: string;
  album: string;
  image: string;
  spotify_url: string;
}

interface Props {
  track: Track;
}

const TrackCard: React.FC<Props> = ({ track }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
      <img src={track.image} alt={track.album} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold">{track.name}</h3>
        <p className="text-gray-400">{track.artist}</p>
        <a
          href={track.spotify_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-indigo-500 hover:underline"
        >
          Listen on Spotify
        </a>
      </div>
    </div>
  );
};

export default TrackCard;
