# Emotion-Based Music Player

A web application that recommends and streams music based on your detected emotion using facial analysis.

## Features

- 🎵 Recommends songs based on your current emotion (happy, sad, angry, etc.)
- 😊 Uses DeepFace for real-time emotion detection from your photo
- 🔗 Integrates with Spotify API for music streaming and playlist generation
- 🚀 Fast backend with Flask and Redis caching
- 🐳 Easy setup with Docker and Docker Compose
- 🔒 Secure secret management using environment variables

## Tech Stack

- **Frontend:** React.js
- **Backend:** Flask, Python
- **Emotion Detection:** DeepFace
- **Music API:** Spotify API
- **Cache:** Redis
- **Containerization:** Docker

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/priyanshu886291kumar/Emotion-Based-Music-Player.git
   cd Emotion-Based-Music-Player
   ```

2. **Set up environment variables**
   - Create a `.env` file in the backend and frontend folders with your API keys and secrets.

3. **Run with Docker**
   ```bash
   docker-compose up --build
   ```

4. **Open the app**
   - Visit `http://localhost:3000` in your browser.

## Folder Structure

```
Frontened/   # React frontend
Backened/    # Flask backend
docker-compose.yml
.env         # Environment variables (not committed)
```

## License

This project is for educational purposes.
