from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
import smtplib
import random
import os

app = Flask(__name__)
CORS(app)

# Database configuration for MySQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://username:password@localhost/mydatabase'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_POOL_SIZE'] = 10
app.config['SQLALCHEMY_MAX_OVERFLOW'] = 20

db = SQLAlchemy(app)

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

    if not from_mail or not password:
        app.logger.error("Email credentials are not set")
        return False

    message = f"Subject: {subject}\n\n{body}"

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(from_mail, password)
        server.sendmail(from_mail, to_mail, message)
        server.quit()
        return True
    except smtplib.SMTPException as e:
        app.logger.error(f"Error sending email: {e}")
        return False

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    app.logger.debug(f"Received registration data: {data}")

    try:
        # Validate input data
        required_fields = ['first_name', 'last_name', 'email', 'password', 'phone_number']
        for field in required_fields:
            if not data.get(field):
                app.logger.error(f"Missing field: {field}")
                return jsonify({'error': f'Missing field: {field}'}), 400

        # Check if email already exists
        if User.query.filter_by(email=data['email']).first():
            app.logger.error('Email already registered')
            return jsonify({'error': 'Email already registered'}), 400

        # Generate OTP
        
        otp = "".join(str(random.randint(0, 9)) for _ in range(6))

        # Send OTP via email
        subject = "DishDash OTP Verification"
        body = f"Here is Your OTP please don't share it with anyone: {otp}"

        if not send_email(data['email'], subject, body):
            app.logger.error('Failed to send OTP')
            return jsonify({'error': 'Failed to send OTP'}), 500

        # Hash password and create new user
        hashed_password = generate_password_hash(data['password'])
        new_user = User(
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            password=hashed_password,
            phone_number=data['phone_number'],
            otp=otp
        )

        db.session.add(new_user)
        db.session.commit()

        app.logger.debug('User registered successfully')
        return jsonify({'message': 'User registered successfully! OTP sent to your email.'}), 201

    except Exception as e:
        app.logger.error(f"An error occurred: {e}")
        return jsonify({'error': 'Internal server error'}), 500

# Handle favicon request
@app.route('/favicon.ico', methods=['GET'])
def favicon():
    return jsonify({'error': 'Favicon not found'}), 404

if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)
