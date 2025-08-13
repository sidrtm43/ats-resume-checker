import os
from dotenv import load_dotenv

load_dotenv()  # Load .env variables

DATABASE_URL = os.getenv("DATABASE_URL")
BLACKBOX_API_KEY = os.getenv("BLACKBOX_API_KEY")
BLACKBOX_API_URL = os.getenv("BLACKBOX_API_URL")
