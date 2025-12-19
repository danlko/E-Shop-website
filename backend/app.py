from flask import Flask, jsonify, request
from flask_cors import CORS 
import uuid

app = Flask(__name__)
CORS(app)

shoes = [
    {
        "id": "1",
        "name": "Adidas Campus",
        "size": "43",
        "color": "Grey",
        "price": "150",
        "image": "/assets/campus.jpg"
    },
    {
        "id": "2",
        "name": "Converse Chuck 70",
        "size": "42",
        "color": "Black",
        "price": "100",
        "image": "/assets/converse.jpg"
    },
    {
        "id": "3",
        "name": "Asics Tiger",
        "size": "46",
        "color": "Black",
        "price": "120",
        "image": "/assets/tiger.jpg"
    },
    {
        "id": "4",
        "name": "Asics R71",
        "size": "39",
        "color": "Black",
        "price": "99",
        "image": "/assets/r71.webp"
    },
    {
        "id": "5",
        "name": "Asics Classic",
        "size": "44",
        "color": "White",
        "price": "130",
        "image": "/assets/asics.jpg"
    },
    {
        "id": "6",
        "name": "New Balance NB1",
        "size": "41",
        "color": "Green",
        "price": "110",
        "image": "/assets/nb_green.jpg"
    },
    {
        "id": "7",
        "name": "New Balance 574",
        "size": "42",
        "color": "Grey",
        "price": "120",
        "image": "/assets/nb_574.jpg"
    },
    {
        "id": "8",
        "name": "New Balance Classic",
        "size": "43",
        "color": "Blue",
        "price": "115",
        "image": "/assets/nb1.jpg"
    }
]


@app.route('/api/shoes', methods=['GET'])
def get_shoes():
    color = request.args.get('color')
    size = request.args.get('size')
    q = request.args.get('q')
    min_price = request.args.get('minPrice')
    max_price = request.args.get('maxPrice')

    results = shoes

    if color:
        results = [s for s in results if s.get('color') and s['color'].lower() == color.lower()]
    if size:
        results = [s for s in results if s.get('size') == size]
    if q:
        results = [s for s in results if q.lower() in s.get('name','').lower()]
    if min_price is not None:
        try:
            mp = float(min_price)
            results = [s for s in results if float(s.get('price', 0)) >= mp]
        except ValueError:
            pass
    if max_price is not None:
        try:
            mp = float(max_price)
            results = [s for s in results if float(s.get('price', 0)) <= mp]
        except ValueError:
            pass

    return jsonify(results), 200


@app.route('/api/shoes', methods=['POST'])
def add_shoe():
    data = request.json 
    new_shoe = {
        "id": str(uuid.uuid4()),
        "name": data.get("name"),
        "size": data.get("size"),
        "color": data.get("color"),
        "price": data.get("price"),
        "image": data.get("image")
    }
    shoes.append(new_shoe)
    return jsonify(new_shoe), 201 


@app.route('/api/shoes/<string:shoe_id>', methods=['GET'])
def get_shoe_by_id(shoe_id):
    shoe = next((s for s in shoes if s['id'] == shoe_id), None)
    if shoe is None:
        return jsonify({"message": "Shoe not found"}), 404
    return jsonify(shoe), 200


@app.route('/api/shoes/<string:shoe_id>', methods=['PUT'])
def update_shoe(shoe_id):
    data = request.json
    index = next((i for i, shoe in enumerate(shoes) if shoe["id"] == shoe_id), None)
    if index is None:
        return jsonify({"message": "Shoe not found"}), 404
    shoes[index].update(data)
    return jsonify(shoes[index]), 200


@app.route('/api/shoes/<string:shoe_id>', methods=['DELETE'])
def delete_shoe(shoe_id):
    global shoes 
    initial_length = len(shoes)
    shoes = [shoe for shoe in shoes if shoe["id"] != shoe_id]
    if len(shoes) < initial_length:
        return '', 204 
    else:
        return jsonify({"message": "Shoe not found"}), 404


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
