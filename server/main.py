from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, origins="*")

@app.route('/api/bro', methods=['GET'])
def bro():
    return jsonify({"message": "bro"})

if __name__ == '__main__':
    app.run(debug=True, port=8080)