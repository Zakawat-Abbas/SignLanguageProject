from flask import Flask, request

app = Flask(__name__)


@app.route('/predict', methods=['POST'])
def predict():
    img = request.files['file']
    filename = 'input.jpg'
    # img.save(filename)

    # result = predict_image(filename)

    result = 'H'

    return result


app.run(host="0.0.0.0", port=5000)
