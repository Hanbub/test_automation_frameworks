import os
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '.env'))

BASE_URL = os.getenv("BASE_URL")

if not BASE_URL:
    raise ValueError("BASE_URL must be set in .env")