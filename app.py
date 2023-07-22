from flask import Flask, request

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    img = request.files['file']
    filename = 'input.jpg'

    result = 'H'

    return result


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
