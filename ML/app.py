from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd

app = Flask(__name__)

health_model = joblib.load("health_model.pkl")
health_scaler = joblib.load("health_scaler.pkl")
health_label = joblib.load("health_label.pkl")

@app.route("/predict/health", methods = ["POST"])
def predict_health():
    try:
        data = request.json
        features = [
            data["Temperature"],
            data["Humidity"],
            data["PM2_5"],
            data["PM10"],
            data["SO2"],
            data["NO2"],
            data["CO"],
        ]
        print(features)

        input_scaled = health_scaler.transform([features])
        pred_class = int(health_model.predict(input_scaled)[0])
        pred_label = health_label.inverse_transform([pred_class])[0]

        return jsonify(
            {
                "healthLabel" : pred_label
            }
        )
    except Exception as e:
        raise e
    
if __name__ == ("__main__"):
    app.run(port=5000, debug=True)
