from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
import smtplib
import random

app = Flask(__name__)
CORS(app)

# Database configuration for MySQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://username:password@localhost/mydatabase'
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

@app.route('/api/register/', methods=['POST'])  # Change the method to POST  # Change the method to POST
def register():
    data = request.json
    # Existing validation logic here...

    # Check if email already exists
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already registered'}), 400

    # Generate OTP
    otp = ""
    for i in range(6): 
        otp += str(random.randint(0,9))

    # Send OTP via email
    from_mail = "dishdashh05@gmail.com"
    to_mail = data['email']
    password = "wjqg nfyo pprd guaz"

    subject = "DishDash OTP Verification"
    body = "Here is Your OTP please don't share it with anyone : " + otp

    message = f"Subject: {subject}\n\n{body}"

    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(from_mail, password)

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
    db.session.add(new_user)  # Add the new user to the session
    db.session.commit()  # Commit the changes to the database

    return jsonify({'message': 'User registered successfully! OTP sent to your email.'}), 201

if __name__ == '__main__':
      app.run(debug=True ,port=5000 ,use_reloader=True)