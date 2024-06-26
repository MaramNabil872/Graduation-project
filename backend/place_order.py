import os
from flask import Flask, request, jsonify
from flask_mail import Mail, Message
import uuid
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Configuration for Flask-Mail
class Config:
    MAIL_SERVER = os.environ.get('dishdashh05@gmail.com')
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = os.environ.get('dishdashh05@gmail.com')
    MAIL_PASSWORD = os.environ.get('wjqg nfyo pprd guaz')

app.config.from_object(Config)
mail = Mail(app)

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

class Order(db.Model):
    id = db.Column(db.String(36), primary_key=True)
    email = db.Column(db.String(255), nullable=False)
    order_details = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(20), nullable=False, default='placed')
    driver_id = db.Column(db.Integer, db.ForeignKey('driver.id'), nullable=True)
    driver = db.relationship('Driver', backref=db.backref('orders', lazy=True))

    def __init__(self, email, order_details):
        self.id = str(uuid.uuid4())
        self.email = email
        self.order_details = order_details

    def send_confirmation_email(self):
        msg = Message('Order Confirmation', sender=app.config['MAIL_USERNAME'], recipients=[self.email])
        msg.body = f'Thank you for your order! Your order number is {self.id}.'
        mail.send(msg)

class Driver(db.Model):
    driver_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    license_number = db.Column(db.String(20), nullable=False)
    vehicle_info = db.Column(db.String(200), nullable=False)
    status = db.Column(db.String(20), nullable=False)
    rating = db.Column(db.Float, nullable=False)

@app.route('/place_order', methods=['POST'])
def place_order():
    data = request.get_json()
    if not data or 'email' not in data or 'order_details' not in data:
        return jsonify({'error': 'Invalid input'}), 400

    email = data['email']
    order_details = data['order_details']

    order = Order(email, order_details)
    db.session.add(order)
    db.session.commit()
    order.send_confirmation_email()

    return jsonify({'order_id': order.id}), 201

@app.route('/track_order/<order_id>', methods=['GET'])
def track_order(order_id):
    order = Order.query.get(order_id)
    if not order:
        return jsonify({'error': 'Order not found'}), 404

    if not order.driver:
        return jsonify({'error': 'Driver not assigned'}), 404

    driver_info = {
        'name': order.driver.name,
        'email': order.driver.email,
        'phone': order.driver.phone,
        'license_number': order.driver.license_number,
        'vehicle_info': order.driver.vehicle_info,
        'status': order.driver.status,
        'rating': order.driver.rating
    }

    return jsonify({'order_id': order_id, 'status': order.status, 'driver_info': driver_info}), 200

@app.route('/assign_driver', methods=['POST'])
def assign_driver():
    order_id = request.json.get('order_id')
    driver_id = request.json.get('driver_id')
    
    order = Order.query.get(order_id)
    if not order:
        return jsonify({'error': 'Order not found'}), 404
    
    driver = Driver.query.get(driver_id)
    if not driver:
        return jsonify({'error': 'Driver not found'}), 404
    
    order.driver_id = driver.id
    db.session.commit()
    
    return jsonify({'message': 'Driver assigned successfully'})



if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)