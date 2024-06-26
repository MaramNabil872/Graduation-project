from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import os
from twilio.rest import Client
import twilio
from flask_cors import CORS

app = Flask(__name__)

# Initialize Flask app
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

class Category(db.Model):
    category_id = db.Column(db.Integer, primary_key=True)
    category_name = db.Column(db.String(100), nullable=False)
    stores = db.relationship('Store', backref='category', lazy=True)

class Stores(db.Model):
    stores_id = db.Column(db.Integer, primary_key=True)
    stores_name = db.Column(db.String(100), nullable=False)
    category_id = db.Column(db.String, db.ForeignKey('category.id'), nullable=False)
    products = db.relationship('Product', backref='store', lazy=True)

class Product(db.Model):
    product_id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String(100), nullable=False)
    list_price = db.Column(db.String(100), nullable=False)
    expiry_date = db.Column(db.String(100), nullable=False)
    store_id = db.Column(db.Integer, db.ForeignKey('store.id'), nullable=False)

@app.route('/categories', methods=['GET', 'POST'])
def manage_categories():
    if request.method == 'POST':
        category = request.json
        if 'id' not in category or 'name' not in category:
            return jsonify({"error": "Missing required fields"}), 400
        new_category = Category(id=category['id'], name=category['name'])
        db.session.add(new_category)
        db.session.commit()
        return jsonify(category), 201
    categories = Category.query.all()[:10] # Add pagination
    return jsonify([{'id': category.id, 'name': category.name} for category in categories])

@app.route('/categories/<category_id>/stores', methods=['GET', 'POST'])
def manage_stores(category_id):
    category = Category.query.get(category_id)
    if not category:
        return jsonify({"error": "Category not found"}), 404

    if request.method == 'POST':
        store = request.json
        if 'id' not in store or 'name' not in store:
            return jsonify({"error": "Missing required fields"}), 400
        new_store = Stores(id=store['id'], name=store['name'], category=category)
        db.session.add(new_store)
        db.session.commit()
        return jsonify(store), 201
    stores = category.stores.all()
    return jsonify([{'id': store.id, 'name': store.name} for store in stores])

@app.route('/categories/<category_id>/stores/<store_id>/products', methods=['GET', 'POST', 'DELETE'])
def manage_products(category_id, store_id):
    category = Category.query.get(category_id)
    if not category:
        return jsonify({"error": "Category not found"}), 404

    store = Stores.query.get(store_id)
    if not store or store.category_id != category_id:
        return jsonify({"error": "Store not found"}), 404

    if request.method == 'POST':
        product = request.json
        if 'id' not in product or 'name' not in product:
            return jsonify({"error": "Missing required fields"}), 400
        new_product = Product(id=product['id'], name=product['name'], store=store)
        db.session.add(new_product)
        db.session.commit()
        return jsonify(product), 201
    elif request.method == 'DELETE':
        product_id = request.args.get('product_id')
        if not product_id:
            return jsonify({"error": "Missing product_id"}), 400
        product = Product.query.get(product_id)
        if not product:
            return jsonify({"error": "Product not found"}), 404
        db.session.delete(product)
        db.session.commit()
        return jsonify({"message": "Product deleted successfully"}), 200
    products = store.products.all()
    return jsonify([{'id': product.id, 'name': product.name} for product in products])



if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)
    
    