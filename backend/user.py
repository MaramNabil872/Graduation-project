from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import os
from twilio.rest import Client
import twilio
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Initialize CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mssql+pyodbc://MOHAMEDWAEL\\elsha:<>@MOHAMEDWAEL/dishdash?driver=ODBC+Driver+17+for+SQL+Server'
db = SQLAlchemy(app)


# Handle root URL
@app.route('/', methods=['GET'])
def root():
    return jsonify({'message': 'App tested!'}), 200

# Handle favicon request
@app.route('/favicon.ico', methods=['GET'])
def favicon():
    return jsonify({'error': 'Favicon not found'}), 404

class UserProfile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    contact = db.Column(db.String(20), nullable=False)
    address = db.Column(db.String(200), nullable=False)
    birthdate = db.Column(db.DateTime, nullable=False)
    password = db.Column(db.String(100), nullable=False)

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user_profile.id"))
    status = db.Column(db.String(20), nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    required_date = db.Column(db.DateTime, nullable=False)
    shipped_date = db.Column(db.DateTime, nullable=False)

class Feedback(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user_profile.id"))
    rating = db.Column(db.Integer, nullable=False)
    feedback = db.Column(db.String(200), nullable=False)

@app.route("/profile", methods=["GET"])
def get_profile():
    if "user_id" in session:
        user_id = session["user_id"]
        user_profile = UserProfile.query.get(user_id)
        if user_profile:
            return jsonify({
                "name": user_profile.name,
                "email": user_profile.email,
                "contact": user_profile.contact,
                "address": user_profile.address,
                "birthdate": user_profile.birthdate.strftime("%Y-%m-%d")
            })
        else:
            return jsonify({"error": "User not found"}), 404
    else:
        return jsonify({"error": "Not logged in"}), 401

@app.route("/update_profile", methods=["POST"])
def update_profile():
    if "user_id" in session:
        user_id = session["user_id"]
        user_profile = UserProfile.query.get(user_id)
        if user_profile:
            data = request.get_json()
            if "name" in data:
                user_profile.name = data["name"]
            if "address" in data:
                user_profile.address = data["address"]
            db.session.commit()
            return jsonify({"message": "Profile updated successfully"})
        else:
            return jsonify({"error": "User not found"}), 404
    else:
        return jsonify({"error": "Not logged in"}), 401

@app.route("/change_password", methods=["POST"])
def change_password():
    if "user_id" in session:
        user_id = session["user_id"]
        user_profile = UserProfile.query.get(user_id)
        if user_profile:
            data = request.get_json()
            current_password = data["current_password"]
            new_password = data["new_password"]
            confirm_password = data["confirm_password"]
            if check_password_hash(user_profile.password, current_password):
                if new_password == confirm_password:
                    user_profile.password = generate_password_hash(new_password)
                    db.session.commit()
                    return jsonify({"message": "Password changed successfully"})
                else:
                    return jsonify({"error": "New password and confirm password do not match"}), 400
            else:
                return jsonify({"error": "Current password is incorrect"}), 400
        else:
            return jsonify({"error": "User not found"}), 404
    else:
        return jsonify({"error": "Not logged in"}), 401

@app.route("/my_orders", methods=["GET"])
def get_orders():
    if "user_id" in session:
        user_id = session["user_id"]
        orders = Order.query.filter_by(user_id=user_id).all()
        orders_data = []
        for order in orders:
            orders_data.append({
                "id": order.id,
                "status": order.status,
                "date": order.date.strftime("%Y-%m-%d")
            })
        return jsonify(orders_data)
    else:
        return jsonify({"error": "Not logged in"}), 401



if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)