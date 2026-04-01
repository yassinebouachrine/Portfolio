from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mail import Mail, Message
from config import Config
from database import init_db, get_db
from datetime import datetime

# ── App ──
app = Flask(__name__)
app.config.from_object(Config)
CORS(app, origins=Config.CORS_ORIGINS)

# ── Mail ──
mail = Mail(app)

# ── DB ──
init_db()

# Log mail status
if Config.is_mail_configured():
    print(" Email configured — messages will be sent to:", Config.CONTACT_EMAIL)
else:
    print("  Email NOT configured — messages will be saved to DB only")
    print("   → Copy .env.example to .env and fill your credentials")


@app.route('/api/contact', methods=['POST'])
def contact():
    try:
        data = request.get_json()
        name = data.get('name', '').strip()
        email = data.get('email', '').strip()
        subject = data.get('subject', '').strip()
        message = data.get('message', '').strip()

        if not name or not email or not message:
            return jsonify({
                'success': False,
                'message': 'Veuillez remplir tous les champs obligatoires.'
            }), 400

        # ── Save to SQLite ──
        db = get_db()
        db.execute(
            'INSERT INTO contacts (name, email, subject, message, created_at) VALUES (?, ?, ?, ?, ?)',
            (name, email, subject, message, datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
        )
        db.commit()
        db.close()

        # ── Send Email ──
        email_sent = False
        if Config.is_mail_configured():
            try:
                # Notification à moi
                email_subject = f"[Portfolio] {subject or 'Nouveau message'} — de {name}"
                email_body = f"""
╔══════════════════════════════════════════╗
║       NOUVEAU MESSAGE — PORTFOLIO        ║
╚══════════════════════════════════════════╝

👤 Nom:     {name}
📧 Email:   {email}
📋 Sujet:   {subject or '(aucun)'}
📅 Date:    {datetime.now().strftime('%d/%m/%Y à %H:%M')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💬 Message:

{message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Répondre directement à: {email}
"""
                msg = Message(
                    subject=email_subject,
                    recipients=[Config.CONTACT_EMAIL],
                    body=email_body,
                    reply_to=email
                )
                mail.send(msg)

                # Confirmation à l'expéditeur
                confirm_body = f"""
Bonjour {name},

Merci pour votre message ! Je l'ai bien reçu et je vous répondrai dans les plus brefs délais.

Cordialement,
Yassine Bouachrine
Élève Ingénieur en Data Science, Big Data & IA
ENSIASD — Taroudant

📧 {Config.CONTACT_EMAIL}
🔗 github.com/yassinebouachrine
"""
                confirm_msg = Message(
                    subject=" Confirmation — Votre message a été reçu",
                    recipients=[email],
                    body=confirm_body
                )
                mail.send(confirm_msg)

                email_sent = True

            except Exception as email_err:
                print(f"⚠️ Email error: {email_err}")

        response_message = 'Message envoyé avec succès !'
        if email_sent:
            response_message += ' Vous recevrez une confirmation par email.'
        else:
            response_message += ' 📝'

        return jsonify({
            'success': True,
            'message': response_message
        })

    except Exception as e:
        print(f"❌ Error: {e}")
        return jsonify({
            'success': False,
            'message': 'Erreur serveur. Veuillez réessayer.'
        }), 500


@app.route('/api/messages', methods=['GET'])
def get_messages():
    """Endpoint admin pour voir les messages"""
    db = get_db()
    messages = db.execute('SELECT * FROM contacts ORDER BY created_at DESC').fetchall()
    db.close()
    return jsonify([dict(msg) for msg in messages])


@app.route('/api/health', methods=['GET'])
def health():
    """Health check"""
    return jsonify({
        'status': 'ok',
        'email_configured': Config.is_mail_configured(),
        'timestamp': datetime.now().isoformat()
    })


if __name__ == '__main__':
    app.run(debug=True, port=5000)