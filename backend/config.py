import os
from dotenv import load_dotenv

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Charger le fichier .env du dossier backend, quel que soit le répertoire courant.
load_dotenv(os.path.join(BASE_DIR, '.env'))


class Config:
    """Configuration de l'application — charge depuis .env"""

    # Flask
    SECRET_KEY = os.getenv('FLASK_SECRET_KEY', 'dev-fallback-key-change-me')

    # CORS
    raw_origins = os.getenv('CORS_ORIGINS', 'http://localhost:5173,http://127.0.0.1:5173')
    CORS_ORIGINS = [origin.strip() for origin in raw_origins.split(',') if origin.strip()]

    # Optional explicit frontend URL for production
    FRONTEND_URL = os.getenv('FRONTEND_URL')
    if FRONTEND_URL:
        CORS_ORIGINS.append(FRONTEND_URL)

    # Email
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False
    MAIL_USERNAME = os.getenv('MAIL_USERNAME')
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD')
    MAIL_DEFAULT_SENDER = os.getenv('MAIL_DEFAULT_SENDER')

    # Destinataire
    CONTACT_EMAIL = os.getenv('CONTACT_EMAIL', 'bouachrinyassin0@gmail.com')

    # Database
    DATABASE = os.getenv('DATABASE_PATH', os.path.join(BASE_DIR, 'portfolio.db'))

    @staticmethod
    def is_mail_configured():
        """Vérifie si la configuration email est complète"""
        return all([
            Config.MAIL_USERNAME,
            Config.MAIL_PASSWORD,
            Config.MAIL_DEFAULT_SENDER
        ])