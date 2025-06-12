from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes by default

@app.route('/api/login', methods = ['POST'])
def login():
    data = request.get_json()
    print(data)
    return {"message": "Received login data"}, 200

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    print(data)
    return jsonify({"message": "Received register data"}), 200


@app.route('/api/hello', methods=['GET'])
def hello():
    return jsonify({"message": "Hello from Flask!"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
