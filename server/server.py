from flask import Flask, request
print("Imported flask")
import fastai.vision as fastai
print("Imported fastai.vision")
from flask_cors import CORS
print("Imported CORS")


app = Flask(__name__)
cors = CORS(app)

CLASSIFIER = fastai.load_learner(".", "classifier.pkl")
REGRESSION = fastai.load_learner(".", "regression.pkl")


@app.route("/classify",  methods=["POST", "OPTIONS"])
def classify():
    print("Classifying new image")
    files = request.files
    image = fastai.image.open_image(files['image'])
    prediction = CLASSIFIER.predict(image)
    price_prediction = REGRESSION.predict(image)
    return {
        "pricePrediction": round(float(price_prediction[1]), 2),
        "brandPredictions": sorted(
            list(
                zip(
                    CLASSIFIER.data.classes,
                    [round(x, 4) for x in map(float, prediction[2])]
                )
            ),
            key=lambda p: p[1],
            reverse=True
        )
    }


if __name__ == "__main__":
    app.run(host="0.0.0.0")
