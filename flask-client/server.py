from flask import Flask, jsonify
import json

app = Flask(__name__)

# Load data from JSON
with open('countries.json', 'r') as json_file:
    countries_data = json.load(json_file)

# Members API Route
@app.route("/countries")
def members():
    return jsonify(countries_data)


if __name__ == "__main__":
    app.run(debug=True)
