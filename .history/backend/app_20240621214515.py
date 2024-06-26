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

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mssql+pyodbc://DESKTOP-KMSRDT2\DELL:<>@DESKTOP-KMSRDT2\SQLEXPRESS/dishdash?driver=ODBC+Driver+17+for+SQL+Server'
db = SQLAlchemy(app)


# Handle root URL
@app.route('/', methods=['GET'])
def root(): 
    return jsonify({'message': 'Welcome to DishDash API!'}), 200

    # Check if email already exists
    #if User.query.filter_by(email=data['email']).first():
    if not data.get('first_name') or not data.get('last_name') or not data.get('email') or not data.get('password') or not data.get('phone_number'):
        return jsonify({'error': 'Invalid input data'}), 400

    # Check if email already exists
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already registered'}), 400 

    otp = "".join(str(random.randint(0, 9)) for _ in range(6))

    # Send OTP via email
    from_mail = "dishdashh05@gmail.com"

    to_mail = data['email']
    password = "wjqg nfyo pprd guaz"
    subject = "DishDash OTP Verification"
    body = f"Here is Your OTP please don't share it with anyone: {otp}"    

    if not send_email(data['email'], subject, body):
        return jsonify({'error': 'Failed to send OTP'}), 500
# Handle favicon request
@app.route('/favicon.ico', methods=['GET','POST'])
def favicon():
    return jsonify({'error': 'Favicon not found'}), 404

# Define User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    phone_number = db.Column(db.String(50), nullable=False)
    address = db.Column(db.String(50), nullable=False)
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

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    

    return jsonify({'message': 'User registered successfully! OTP sent to your email.'}), 201

# Handle root URL
def root():
    return jsonify({'message': 'Welcome to DishDash API!'}), 200



if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)