import os
from dotenv import load_dotenv

# Load env variables from backend/.env if present, otherwise system env
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
PORT = int(os.getenv("PORT", 8000))
HOST = os.getenv("HOST", "0.0.0.0")

# Public-facing URL (set via environment variable for deployment flexibility)
NGROK_URL = os.getenv("NGROK_URL", "")

# API metadata
API_VERSION = "1.0.0"
