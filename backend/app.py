from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS 
import uuid
import os
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'postgresql://shop_user:shop_pass@localhost:5432/shop_db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class Shoe(db.Model):
    __tablename__ = 'shoes'
    id = db.Column(db.String, primary_key=True)
    name = db.Column(db.String, nullable=False)
    size = db.Column(db.String)
    color = db.Column(db.String)
    price = db.Column(db.String) 
    image = db.Column(db.String)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "size": self.size,
            "color": self.color,
            "price": self.price,
            "image": self.image
        }

class Order(db.Model):
    __tablename__ = 'orders'
    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()))
    status = db.Column(db.String, default='created')
    
class OrderItem(db.Model):
    __tablename__ = 'order_items'
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.String, db.ForeignKey('orders.id'))
    shoe_id = db.Column(db.String, db.ForeignKey('shoes.id'))

seed_data = [
    {"id": "1", "name": "Adidas Campus", "size": "43", "color": "Grey", "price": "150", "image": "assets/campus.jpg"},
    {"id": "2", "name": "Converse Chuck 70", "size": "42", "color": "Black", "price": "100", "image": "assets/converse.jpg"},
    {"id": "3", "name": "Asics Tiger", "size": "46", "color": "Black", "price": "120", "image": "assets/tiger.jpg"},
    {"id": "4", "name": "Asics R71", "size": "39", "color": "Black", "price": "99", "image": "assets/r71.webp"},
    {"id": "5", "name": "Asics Classic", "size": "44", "color": "White", "price": "130", "image": "assets/asics.jpg"},
    {"id": "6", "name": "New Balance NB1", "size": "41", "color": "Green", "price": "110", "image": "assets/nb_green.jpg"},
    {"id": "7", "name": "New Balance 574", "size": "42", "color": "Grey", "price": "120", "image": "assets/nb_574.jpg"},
    {"id": "8", "name": "New Balance Classic", "size": "43", "color": "Blue", "price": "115", "image": "assets/nb1.jpg"}
]

with app.app_context():
    db.create_all()
    
    if Shoe.query.count() == 0:
        print("База порожня. Запускаємо seeding...")
        for data in seed_data:
            new_shoe = Shoe(
                id=data["id"],
                name=data["name"],
                size=data["size"],
                color=data["color"],
                price=data["price"],
                image=data["image"]
            )
            db.session.add(new_shoe)
            
        db.session.commit()
        print("Стартові кросівки успішно завантажені в базу")

@app.route('/api/orders', methods=['POST'])
def create_order():
    data = request.json
    shoe_ids = data.get("shoe_ids", [])
    
    if not shoe_ids:
        return jsonify({"message": "cart is empty"}), 400

    new_order = Order()
    db.session.add(new_order)
    
    for s_id in shoe_ids:
        item = OrderItem(order_id=new_order.id, shoe_id=s_id)
        db.session.add(item)
        
    try:
        db.session.commit()
        return jsonify({"order_id": new_order.id, "status": "success"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "error saving order"}), 500

@app.route('/api/shoes', methods=['GET'])
def get_shoes():
    query = Shoe.query

    color = request.args.get('color')
    size = request.args.get('size')
    q = request.args.get('q')
    min_price = request.args.get('minPrice')
    max_price = request.args.get('maxPrice')

    if color:
        query = query.filter(Shoe.color.ilike(color))
    if size:
        query = query.filter(Shoe.size == size)
    if q:
        query = query.filter(Shoe.name.ilike(f'%{q}%'))
    
    results = query.all()
    shoes_list = [shoe.to_dict() for shoe in results]

    if min_price is not None or max_price is not None:
        filtered_list = []
        for s in shoes_list:
            try:
                p = float(s['price'])
                if min_price is not None and p < float(min_price):
                    continue
                if max_price is not None and p > float(max_price):
                    continue
                filtered_list.append(s)
            except ValueError:
                pass
        shoes_list = filtered_list

    return jsonify(shoes_list), 200

@app.route('/api/shoes', methods=['POST'])
def add_shoe():
    data = request.json 
    new_shoe = Shoe(
        id=str(uuid.uuid4()),
        name=data.get("name"),
        size=data.get("size"),
        color=data.get("color"),
        price=data.get("price"),
        image=data.get("image")
    )
    db.session.add(new_shoe)
    db.session.commit()
    
    return jsonify({"id": new_shoe.id, "name": new_shoe.name}), 201

@app.route('/api/shoes/<string:shoe_id>', methods=['GET'])
def get_shoe_by_id(shoe_id):
    shoe = Shoe.query.get(shoe_id)
    if shoe is None:
        return jsonify({"message": "Shoe not found"}), 404
    return jsonify(shoe.to_dict()), 200

@app.route('/api/shoes/<string:shoe_id>', methods=['PUT'])
def update_shoe(shoe_id):
    shoe = Shoe.query.get(shoe_id)
    if shoe is None:
        return jsonify({"message": "Shoe not found"}), 404
        
    data = request.json
    if 'name' in data: shoe.name = data['name']
    if 'size' in data: shoe.size = data['size']
    if 'color' in data: shoe.color = data['color']
    if 'price' in data: shoe.price = data['price']
    if 'image' in data: shoe.image = data['image']
    
    db.session.commit()
    return jsonify(shoe.to_dict()), 200

@app.route('/api/shoes/<string:shoe_id>', methods=['DELETE'])
def delete_shoe(shoe_id):
    shoe = Shoe.query.get(shoe_id)
    if shoe is None:
        return jsonify({"message": "Shoe not found"}), 404
        
    db.session.delete(shoe)
    db.session.commit()
    return '', 204

@app.route('/assets/<path:filename>')
def serve_assets(filename):
    return send_from_directory('assets', filename)

debug_mode = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'
port = int(os.getenv('FLASK_PORT', '5000'))
host = os.getenv('FLASK_HOST', '0.0.0.0')

if __name__ == '__main__':
    app.run(debug=debug_mode, host=host, port=port)