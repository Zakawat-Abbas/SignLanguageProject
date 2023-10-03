from flask import Flask, request
from cvzone.HandTrackingModule import HandDetector
import cv2
import numpy as np
import math
from cvzone.ClassificationModule import Classifier

detector = HandDetector(detectionCon=0.8, maxHands=1)
classifier = Classifier("server/PSL_Model/SignToText.h5",
                        "server/PSL_Model/labels.txt")
offset = 20
imgSize = 300

labels = [
    "ا", "ب", "پ", "ت", "ٹ", "ث", "ج", "چ", "ح", "خ", "د", "ڈ", "ذ", "ر", "ڑ", "ز",
    "ژ", "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ", "ف", "ق", "ک", "گ", "ل", "م", "ن",
    "ں", "ه", "ة", "و", "ء", "آ", "ی", "ئ", "ے", "ۓ", "ہ", "ھ", "ۂ", "ۃ", "ؤ", "إ", "أ"
]


def predict_image(handimage):
    # Load the image
    img = cv2.imread(f'{handimage}')

    # img = cv2.resize(img, (960, 540))

    # Find the hand and its landmarks
    hands, img = detector.findHands(img)

    imgOutput = img.copy()

    if hands:
        hand = hands[0]
        x, y, w, h = hand['bbox']

        imgWhite = np.ones(
            (imgSize, imgSize, 3), np.uint8) * 255
        imgCrop = img[y - offset:y + h +
                      offset, x - offset:x + w + offset]

        aspectRatio = h / w

        if aspectRatio > 1:
            k = imgSize / h
            wCal = math.ceil(k * w)
            imgResize = cv2.resize(imgCrop, (wCal, imgSize))
            wGap = math.ceil((imgSize - wCal) / 2)
            imgWhite[:, wGap:wCal + wGap] = imgResize
            prediction, index = classifier.getPrediction(
                imgWhite, draw=False)

        else:
            k = imgSize / w
            hCal = math.ceil(k * h)
            imgResize = cv2.resize(imgCrop, (imgSize, hCal))
            hGap = math.ceil((imgSize - hCal) / 2)
            imgWhite[hGap:hCal + hGap, :] = imgResize
            prediction, index = classifier.getPrediction(
                imgWhite, draw=False)

        # cv2.rectangle(imgOutput, (x - offset, y - offset-50),
        #               (x - offset+200, y - offset-50+50), (0, 128, 0), cv2.FILLED)
        print(labels[index])

        return (labels[index])
        # cv2.putText(imgOutput, labels[index], (x, y - 26),
        #             cv2.FONT_HERSHEY_COMPLEX, 1.7, (255, 255, 255), 2)
        # cv2.rectangle(imgOutput, (x-offset, y-offset),
        #               (x + w+offset+50, y + h+offset), (0, 128, 0), 4)

    else:
        # cv2.putText(imgOutput, "nothing", (50, 450),
        #             cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 2)
        return "nothing"


app = Flask(__name__)


@app.route("/")
def home():
    return "Hello, World From PSL Server!"


@app.route('/predict', methods=['POST'])
def predict():
    img = request.files['file']
    filename = 'input.jpg'
    img.save(filename)

    result = predict_image(filename)

    # result = 'H'

    if result == 'nothing':
        return ' '
    else:
        return result


app.run(host="0.0.0.0", port=4000)
