from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash
from flask_cors import CORS
import smtplib
import random
import pymysql
import logging

# Install pymysql as MySQLdb
pymysql.install_as_MySQLdb()

app = Flask(__name__)
CORS(app)

# Database configuration for MySQL using PyMySQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://username:password@localhost/mydatabase'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Setup logging
logging.basicConfig(level=logging.DEBUG)

# Define User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    phone_number = db.Column(db.String(50), nullable=False)

@app.route('/api/register', methods=['POST'])
def register():
    try:
        data = request.json
        if not data:
            return jsonify({'error': 'Missing data'}), 400

        # Check if email already exists
        if User.query.filter_by(email=data['email']).first():
            return jsonify({'error': 'Email already registered'}), 400

        # Generate OTP
        otp = ''.join([str(random.randint(0, 9)) for _ in range(6)])

        # Send OTP via email
        from_mail = "dishdashh05@gmail.com"
        to_mail = data['email']
        email_password = "wjqg nfyo pprd guaz"

        subject = "DishDash OTP Verification"
        body = f"Here is Your OTP please don't share it with anyone: {otp}"

        message = f"Subject: {subject}\n\n{body}"

        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(from_mail, email_password)
        server.sendmail(from_mail, to_mail, message)
        server.quit()

        # Hash password and create new user
        hashed_password = generate_password_hash(data['password'])
        new_user = User(
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            password=hashed_password,
            phone_number=data['phone_number']
        )
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'User registered successfully! OTP sent to your email.'}), 201
    except Exception as e:
        logging.error(f"Error during registration: {e}")
        return jsonify({'error': 'An error occurred during registration'}), 500

if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)
