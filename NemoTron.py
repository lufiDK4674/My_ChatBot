import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI

# Load API key from environment variable
API_KEY = os.getenv("NVIDIA_API_KEY")

# Ensure the API key is available
if not API_KEY:
    raise ValueError("API key is not set! Please add it to your environment variables.")

# Initialize the OpenAI client
client = OpenAI(
    base_url="https://integrate.api.nvidia.com/v1",
    api_key=API_KEY
)

# Flask app setup
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Chat with the NVIDIA API
def chat_with_api(messages):
    try:
        # Request to the NVIDIA API
        completion = client.chat.completions.create(
            model="nvidia/llama-3.1-nemotron-70b-instruct",
            messages=messages,
            temperature=0.5,
            top_p=1,
            max_tokens=1024
        )

        # Use dot notation to access the content
        return completion.choices[0].message.content
    except Exception as e:
        print(f"An error occurred: {e}")
        return "Something went wrong. Please try again."


# Flask route for chat
@app.route("/chat", methods=["POST"])
def chat():
    try:
        # Get the chat messages from the POST request
        data = request.get_json()
        messages = data.get("messages", [])
        if not messages:
            return jsonify({"error": "Messages are required"}), 400

        # Get the response from the NVIDIA API
        response = chat_with_api(messages)
        return jsonify({"response": response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
