# 1. New File: spotify_service.py
# This module handles getting a Spotify access token (using Client Credentials Flow) and querying Spotify’s API based on an emotion query. For example, you might map emotions to search keywords.

# spotify_service.py
import os
import requests

CLIENT_ID = os.getenv("CLIENT_ID", "dea716ed40cc40b79f656f9fcbec3a02")
CLIENT_SECRET = os.getenv("CLIENT_SECRET", "c877d293b0f04c4fa2dabe10a96173b1")

def get_spotify_token():
    auth_url = "https://accounts.spotify.com/api/token"
    auth_response = requests.post(auth_url, {
        "grant_type": "client_credentials",
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
    })
    auth_response.raise_for_status()
    token = auth_response.json().get("access_token")
    return token

def get_recommendations_by_emotion(emotion):
    # Map emotion to a search keyword (customize as needed)
    emotion_keywords = {
        "happy": "upbeat",
        "sad": "melancholy",
        "angry": "intense",
        "surprise": "energetic",
        "neutral": "chill",
        # add more mappings as needed...
    }
    query = emotion_keywords.get(emotion.lower(), emotion)

    token = get_spotify_token()
    headers = {"Authorization": f"Bearer {token}"}
    search_url = "https://api.spotify.com/v1/search"
    params = {
        "q": query,
        "type": "track",
        "limit": 10,  # Adjust the number of tracks as needed
    }
    response = requests.get(search_url, headers=headers, params=params)
    response.raise_for_status()
    data = response.json()
    tracks = data.get("tracks", {}).get("items", [])
    # For each track, extract needed details:
    recommendations = [{
        "name": track["name"],
        "artist": ", ".join([artist["name"] for artist in track["artists"]]),
        "album": track["album"]["name"],
        "image": track["album"]["images"][0]["url"] if track["album"]["images"] else "",
        "spotify_url": track["external_urls"]["spotify"]
    } for track in tracks]
    return recommendations
