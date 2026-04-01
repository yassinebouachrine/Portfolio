import os
from dotenv import load_dotenv

# Charger le fichier .env
load_dotenv()


class Config:
    """Configuration de l'application — charge depuis .env"""

    # Flask
    SECRET_KEY = os.getenv('FLASK_SECRET_KEY', 'dev-fallback-key-change-me')

    # CORS
    CORS_ORIGINS = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ]

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
    DATABASE = os.getenv('DATABASE_PATH', 'portfolio.db')

    @staticmethod
    def is_mail_configured():
        """Vérifie si la configuration email est complète"""
        return all([
            Config.MAIL_USERNAME,
            Config.MAIL_PASSWORD,
            Config.MAIL_DEFAULT_SENDER
        ])