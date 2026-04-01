from flask import Flask, render_template, request, jsonify, redirect, url_for, flash
from database import init_db, get_db
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'yassine_portfolio_secret_key_2025'

# Initialize database
init_db()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/contact', methods=['POST'])
def contact():
    try:
        name = request.form.get('name', '').strip()
        email = request.form.get('email', '').strip()
        subject = request.form.get('subject', '').strip()
        message = request.form.get('message', '').strip()

        # Validation
        if not name or not email or not message:
            return jsonify({
                'success': False,
                'message': 'Veuillez remplir tous les champs obligatoires.'
            }), 400

        # Save to database
        db = get_db()
        db.execute(
            'INSERT INTO contacts (name, email, subject, message, created_at) VALUES (?, ?, ?, ?, ?)',
            (name, email, subject, message, datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
        )
        db.commit()
        db.close()

        return jsonify({
            'success': True,
            'message': 'Message envoyé avec succès ! Je vous répondrai bientôt.'
        })

    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Erreur serveur: {str(e)}'
        }), 500

@app.route('/api/messages', methods=['GET'])
def get_messages():
    """Admin endpoint to view messages (optional)"""
    db = get_db()
    messages = db.execute('SELECT * FROM contacts ORDER BY created_at DESC').fetchall()
    db.close()
    return jsonify([dict(msg) for msg in messages])

if __name__ == '__main__':
    app.run(debug=True, port=5000)