from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
import smtplib
import random
import os
import pyodbc

app = Flask(__name__)
CORS(app)

# Database configuration for SQL Server
app.config['SQLALCHEMY_DATABASE_URI'] = (
    'mssql+pyodbc://username:password@localhost/mydatabase?driver=ODBC+Driver+17+for+SQL+Server'
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app, engine_options={"pool_size": 10, "max_overflow": 20})

# Define User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    phone_number = db.Column(db.String(50), nullable=False)
    otp = db.Column(db.String(6), nullable=True)

def send_email(to_mail, subject, body):
    from_mail = os.environ.get('FROM_EMAIL')
    password = os.environ.get('EMAIL_PASSWORD')

    message = f"Subject: {subject}\n\n{body}"

    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(from_mail, password)

    try:
        server.sendmail(from_mail, to_mail, message)
    except smtplib.SMTPException as e:
        app.logger.error(f"Error sending email: {e}")
        return False

    server.quit()
    return True

@app.route('/api/login', methods=['POST'])
def register():
    data = request.json
    
       # Find the user by email
    user = User.query.filter_by(email=data['email']).first()

    if not user:
        return jsonify({'error': 'Invalid email or password'}), 401

    # Check if the password is correct
    if not check_password_hash(user.password, data['password']):
        return jsonify({'error': 'Invalid email or password'}), 401

    # Return a success message or any other data you need
    return jsonify({'message': 'Login successful', 'user_id': user.id}), 200

# Handle root URL
@app.route('/', methods=['GET'])
def root():
    return jsonify({'message': 'Welcome to DishDash API!'}), 200



if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)