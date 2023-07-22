from flask import Flask, request

app = Flask(__name__)


@app.route('/predict', methods=['POST'])
def upload():
    photo = request.files['photo']
    photo.save('input.jpg')
    return 'Photo uploaded successfully!'


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)