from flask import Flask, render_template

# Initialize the Flask app
app = Flask(__name__)

# Define a route for the homepage
@app.route('/')
def home():
    return render_template('index.html')


@app.route('/login')
def login():
    return render_template('loginorregister.html')



# Run the app
if __name__ == '__main__':
    app.run(debug=True)
