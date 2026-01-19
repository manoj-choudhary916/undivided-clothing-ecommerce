from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Database config
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ecommerce.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# -------------------
# MODELS
# -------------------

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    image = db.Column(db.String(300), nullable=False)


class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    product_name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)


# -------------------
# CREATE DATABASE
# -------------------

with app.app_context():
    db.create_all()


# -------------------
# ROUTES
# -------------------

@app.route("/")
def home():
    return "Ecommerce Backend Running"


@app.route("/products")
def get_products():

    products = Product.query.all()

    output = []

    for product in products:
        output.append({
            "id": product.id,
            "name": product.name,
            "price": product.price,
            "image": product.image
        })

    return jsonify(output)


@app.route("/place-order", methods=["POST"])
def place_order():

    data = request.json

    if not data:
        return jsonify({"error": "No order data received"}), 400

    for item in data:
        new_order = Order(
            product_name=item.get("name"),
            price=item.get("price")
        )

        db.session.add(new_order)

    db.session.commit()

    return jsonify({"message": "Order placed successfully!"})


@app.route("/orders")
def get_orders():

    orders = Order.query.all()

    result = []

    for order in orders:
        result.append({
            "id": order.id,
            "product_name": order.product_name,
            "price": order.price
        })

    return jsonify(result)


# -------------------
# RUN SERVER
# -------------------

if __name__ == "__main__":
    app.run(debug=True)
