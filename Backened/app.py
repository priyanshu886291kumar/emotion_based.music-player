# from flask import Flask, jsonify
# from flask_cors import CORS
# import cv2
# import time
# from deepface import DeepFace


# app = Flask(__name__)
# CORS(app)  # Allow cross-origin requests from your frontend

# @app.route('/api/emotion', methods=['GET'])
# def get_emotion():
#     # Initialize the webcam
#     cap = cv2.VideoCapture(0)
#     if not cap.isOpened():
#         cap = cv2.VideoCapture(1)
#     if not cap.isOpened():
#         return jsonify({'error': 'Cannot open webcam'}), 500

#     # Wait 3 seconds to let the camera warm up and capture a proper frame
#     time.sleep(3)
#     ret, frame = cap.read()
#     cap.release()
#     if not ret:
#         return jsonify({'error': 'Failed to capture image'}), 500

#     try:
#         # Analyze the captured frame for emotion using DeepFace
#         result = DeepFace.analyze(frame, actions=['emotion'], enforce_detection=False)
#         # DeepFace may return a list; if so, take the first result
#         if isinstance(result, list):
#             result = result[0]
#         dominant_emotion = result.get('dominant_emotion', 'Unknown')
#         return jsonify({'emotion': dominant_emotion})
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True, port=5000)


# # Important:

# # The CORS middleware is added so that your frontend (which might run on a different port) can call the API without cross-origin issues.
# # Running this code locally will activate your webcam. In a production scenario, accessing the camera from a backend is less common—you might use browser APIs instead.





# from flask import Flask, jsonify, request
# from flask_cors import CORS
# import cv2
# import time
# from deepface import DeepFace
# import base64
# import numpy as np

# app = Flask(__name__)
# CORS(app)  # Allow cross-origin requests from your frontend

# @app.route('/api/emotion', methods=['POST'])
# def get_emotion():
#     try:
#         data = request.get_json()
#         if not data or 'image' not in data:
#             return jsonify({'error': 'No image provided'}), 400

#         image_data = data['image']

#         # If the base64 string includes the data URL prefix, remove it
#         if image_data.startswith('data:image'):
#             _, encoded = image_data.split(',', 1)
#         else:
#             encoded = image_data

#         # Decode the base64 image
#         decoded = base64.b64decode(encoded)
#         np_arr = np.frombuffer(decoded, np.uint8)
#         frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
#         if frame is None:
#             return jsonify({'error': 'Failed to decode image'}), 400

#         # Analyze the captured frame for emotion using DeepFace
#         result = DeepFace.analyze(frame, actions=['emotion'], enforce_detection=False)

#         # DeepFace may return a list; if so, take the first result
#         if isinstance(result, list):
#             result = result[0]

#         dominant_emotion = result.get('dominant_emotion', 'Unknown')
#         return jsonify({'emotion': dominant_emotion})

#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True, port=5000)



# after adding spotify part updated code


# app.py
from flask import Flask, jsonify, request
from flask_cors import CORS
import cv2
import time
from deepface import DeepFace
from spotify_service import get_recommendations_by_emotion

app = Flask(__name__)
CORS(app)

@app.route('/test', methods=['GET'])
def test_endpoint():
    try:
        # Return a simple JSON response indicating success.
        return jsonify({
            "message": "Test endpoint is working!",
            "status": "success"
        }), 200
    except Exception as e:
        # If any error occurs, return an error JSON response.
        return jsonify({"error": str(e)}), 500


# Existing endpoint for emotion detection
@app.route('/api/emotion', methods=['POST'])
def get_emotion():
    try:
        data = request.get_json()
        if not data or 'image' not in data:
            return jsonify({'error': 'No image provided'}), 400

        image_data = data['image']
        if image_data.startswith('data:image'):
            _, encoded = image_data.split(',', 1)
        else:
            encoded = image_data

        import base64, numpy as np
        decoded = base64.b64decode(encoded)
        np_arr = np.frombuffer(decoded, np.uint8)
        frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
        if frame is None:
            return jsonify({'error': 'Failed to decode image'}), 400

        result = DeepFace.analyze(frame, actions=['emotion'], enforce_detection=False)
        if isinstance(result, list):
            result = result[0]
        dominant_emotion = result.get('dominant_emotion', 'Unknown')
        return jsonify({'emotion': dominant_emotion})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# New endpoint for Spotify recommendations
@app.route('/api/recommendations', methods=['GET'])
def recommendations():
    emotion = request.args.get("emotion", "neutral")
    print(emotion)
    try:
        recommendations = get_recommendations_by_emotion(emotion)
        return jsonify({"tracks": recommendations})
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
