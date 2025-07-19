from flask import Flask, jsonify, request
from flask_cors import CORS
import jwt
import regex


def check_email_validity(email):
    # Implement email validation logic here
    pass

def check_name_validity(name):
    # Implement name validation logic here
    if len(name) < 2 or len(name) > 50:
        print("Name length is invalid")
        return False
    
    pattern = r"^[a-zA-Z' -]{1,50}$"

    if not regex.match(pattern, name):
        print("Name contains invalid characters")
        return False
    
    return True

def check_password_validity(password):
    # Implement password validation logic here
    pass



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
    print("Incoming registration data:", data)

    # First name check
    if not check_name_validity(data.get("first_name")):
        return jsonify({"error": "Invalid first name"}), 400

    # Surname check
    if not check_name_validity(data.get("surname")):
        return jsonify({"error": "Invalid surname"}), 400

    # Email check
    email = data.get("email")
    if not email or len(email) > 100:
        return jsonify({"error": "Invalid email length"}), 400
    if not check_email_validity(email):
        return jsonify({"error": "Invalid email format"}), 400

    # Password match check
    if data.get("password") != data.get("repeat_password"):
        return jsonify({"error": "Passwords do not match"}), 400

    # Password validity check
    if not check_password_validity(data.get("password")):
        return jsonify({"error": "Invalid password"}), 400

    # If all checks pass
    print("All validations passed.")
    return jsonify({"message": "Received register data"}), 200



    # Check validity of the first name, last name and email address fields.
    # First name and last name should be at least 2 characters long.
    # First name and last name should only contain alphabetic characters.
    # Length of first name and last name should not exceed 50 characters.
    # Length of email should not exceed 100 characters.

    # Check if the email is already registered.
    # Run a SQL query to check if the email exists in the database. 
    



    # Check if the password and repeat password fields match
    
    # Implement JWT generation and authentication here. 



@app.route('/api/hello', methods=['GET'])
def hello():
    return jsonify({"message": "Hello from Flask!"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
