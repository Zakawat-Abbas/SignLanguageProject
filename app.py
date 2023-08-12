# from flask import Flask, request

# app = Flask(__name__)


# # @app.route('/predict', methods=['POST'])
# # def predict():
# #     img = request.files['file']
# #     filename = 'input.jpg'
# #     # img.save(filename)

# #     # result = predict_image(filename)

# #     result = 'H'

# #     return result
# @app.route('/')
# def hello():
#     return 'Hello, World!'


# app.run(host="0.0.0.0", port=5000)

from flask import Flask, request

app = Flask(__name__)


@app.route("/")
def home():
    return "Hello, World!"


@app.route('/predict', methods=['POST'])
def predict():
    img = request.files['file']
    filename = 'input.jpg'
    # img.save(filename)

    # result = predict_image(filename)

    result = 'H'

    return result


if __name__ == "__main__":
    app.run(debug=True)
