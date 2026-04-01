from flask import Flask, request, jsonify
from flask_cors import CORS
from database import init_db, get_db
from datetime import datetime

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173", "http://127.0.0.1:5173"])

init_db()


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

        db = get_db()
        db.execute(
            'INSERT INTO contacts (name, email, subject, message, created_at) VALUES (?, ?, ?, ?, ?)',
            (name, email, subject, message, datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
        )
        db.commit()
        db.close()

        return jsonify({
            'success': True,
            'message': 'Message envoyé avec succès ! 🚀'
        })

    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Erreur: {str(e)}'
        }), 500


@app.route('/api/messages', methods=['GET'])
def get_messages():
    db = get_db()
    messages = db.execute('SELECT * FROM contacts ORDER BY created_at DESC').fetchall()
    db.close()
    return jsonify([dict(msg) for msg in messages])


if __name__ == '__main__':
    app.run(debug=True, port=5000)