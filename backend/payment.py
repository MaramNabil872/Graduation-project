from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

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

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100), nullable=False)

class Cart(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('User', backref=db.backref('cart', lazy=True))

class CartItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cart_id = db.Column(db.Integer, db.ForeignKey('cart.id'))
    cart = db.relationship('Cart', backref=db.backref('items', lazy=True))
    product_name = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

@app.route('/api/cart', methods=['GET'])
def view_cart():
    cart_items = CartItem.query.all()
    return jsonify([{'id': item.id, 'product_name': item.product_name, 'quantity': item.quantity} for item in cart_items])



if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)