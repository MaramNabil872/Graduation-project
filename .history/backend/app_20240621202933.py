from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
import smtplib
import random
import os

app = Flask(__name__)
CORS(app)

# Configure SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'  # Use SQLite for simplicity
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
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

# Function to send email
def send_email(to_mail, subject, body):
    from_mail = os.environ.get('FROM_EMAIL')
    password = os.environ.get('EMAIL_PASSWORD')

    message = f"Subject: {subject}\n\n{body}"

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(from_mail, password)
        server.sendmail(from_mail, to_mail, message)
    except smtplib.SMTPException as e:
        app.logger.error(f"Error sending email: {e}")
        return False
    finally:
        server.quit()

    return True

# Root endpoint
@app.route('/', methods=['GET'])
def root():
    return jsonify({'message': 'Welcome to the API!'}), 200

# Register endpoint
@app.route('/api/register', methods=['POST'])
def register():
    data = request.json

    # Validate input data
    if not all(key in data for key in ('first_name', 'last_name', 'email', 'password', 'phone_number')):
        return jsonify({'error': 'Invalid input data'}), 400

    # Check if email already exists
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already registered'}), 400

    # Generate OTP (for demonstration purposes)
    otp = "".join(str(random.randint(0, 9)) for _ in range(6))

    # Send OTP via email
    subject = "OTP Verification"
    body = f"Your OTP for registration: {otp}"

    if not send_email(data['email'], subject, body):
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

    return jsonify({'message': 'User registered successfully! OTP sent to your email.'}), 201

if __name__ == '__main__':
    db.create_all()  # Create database tables
    app.run(host='localhost', port=5000, debug=True)
