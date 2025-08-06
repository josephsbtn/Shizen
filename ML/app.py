from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd

app = Flask(__name__)

health_model = joblib.load("health_model.pkl")
health_scaler = joblib.load("health_scaler.pkl")
health_label = joblib.load("health_label.pkl")

def desk_health(pred_label):
    if pred_label == "Good":
        return "Udara dalam kondisi sangat baik. Kadar polutan berada jauh di bawah ambang batas yang membahayakan kesehatan."
    elif pred_label == "Hazardous":
        return "Udara berada dalam kondisi sangat berbahaya. Polutan berada jauh di atas ambang batas aman."
    elif pred_label == "Moderate":
        return "Kualitas udara masih dalam batas aman, namun terdapat sedikit peningkatan kadar polutan."
    elif pred_label == "Poor":
        return "Udara tercemar cukup berat. Kadar beberapa polutan melebihi ambang batas aman untuk kesehatan."
    else :
        return "Maaf Belum Memasukan Kota" 
    
def dampak_health(pred_label):
    if pred_label == "Good":
        return "Tidak ada risiko kesehatan yang berarti untuk seluruh populasi, termasuk anak-anak, lansia, dan penderita penyakit pernapasan."
    elif pred_label == "Moderate":
        return "Orang dengan gangguan pernapasan, lansia, dan anak-anak mungkin mulai merasakan gejala ringan seperti batuk atau sesak."
    elif pred_label == "Poor":
        return "Kelompok sensitif akan merasakan efek yang lebih berat. Masyarakat umum mungkin mulai merasakan dampak ringan setelah paparan dalam waktu lama."
    elif pred_label == "Hazardous":
        return "Efek merugikan bisa langsung dirasakan oleh semua orang. Kelompok rentan sangat berisiko mengalami gangguan serius."
    else :
        return "Maaf Belum Memasukan Kota"
    
def aktivitas(pred_label):
    if pred_label == "Good":
        return "Bebas beraktivitas di luar ruangan seperti olahraga, berkendara, dan bermain."
    elif pred_label == "Moderate":
        return "Aktivitas luar ruangan masih diperbolehkan, namun disarankan mengurangi durasi atau intensitas bagi kelompok rentan."
    elif pred_label == "Poor":
        return "Hindari aktivitas fisik berat di luar ruangan. Gunakan masker dan perbanyak minum air putih."
    elif pred_label == "Hazardous":
        return "Hindari aktivitas luar ruangan sebisa mungkin. Tutup rapat pintu dan jendela. Gunakan air purifier atau masker khusus jika harus keluar." 
    else : 
        return "Maaf Belum Memasukan Kota"
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
        deskripsi_health = desk_health(pred_label)
        dampak = dampak_health(pred_label)
        activity = aktivitas(pred_label)
        return jsonify(
            {
                "healthLabel" : pred_label,
                "deskripsi" : deskripsi_health,
                "dampak": dampak,
                "activity":activity,
            }
        )
    except Exception as e:
        raise e
    
plant_model = joblib.load("plant_model.pkl")
plant_features = joblib.load("plant_features.pkl")
plant_dataset = pd.read_csv("dataset_plant.csv")

def recoment_plant(pollution_level,plant_db, model, columns):
    test_df = plant_db.copy()
    test_df["PM2_5"] = pollution_level["PM2_5"]
    test_df["SO2"]
    test_df["NO2"]
    test_df = test_df[columns]

    predictions = model.predict(test_df)

    recomendations_plant_df = plant_db[predictions==1].copy()

    if not recomendations_plant_df.empty:
        recomendations = recomendations_plant_df[
            ["Nama Spesies","Skor API", "Skor APTI"]
        ].to_dict(orient = "records")
        for rec in recomendations:
            rec["Nama"] = rec.pop("Nama Spesies")
            rec["API"] = rec.pop("Skor API")
            rec["APTI"] = rec.pop("Skor APTI")

        return sorted(recomendations, key = lambda x:x["API"],reverse=True)
    return []

def convert_PM2_5(PM2_5):
    if PM2_5 <= 15.4 :
        return 1
    elif 15.5 <= PM2_5 <= 55.4:
        return 2
    else : 
        return 3
    
def convert_SO2(SO2):
    if SO2 <= 75:
        return 1
    elif 76 <= SO2 <= 800:
        return 2
    else : 
        return 3

def convert_NO2(NO2):
    if NO2 <= 100:
        return 1
    elif 101 <= NO2 <= 200:
        return 2
    else : 
        return 3

@app.route("/predict/plants", methods = ["POST"])
def predict_plant():
    try:
        data = request.get_json()
        pollution_level = {
            "PM2_5" : convert_PM2_5(float(data["PM2_5"])),
            "SO2" : convert_SO2(float(data["SO2"])),
            "NO2" : convert_NO2(float(data["NO2"])),
        }
        recomended_plant = recoment_plant(pollution_level, plant_dataset, plant_model, plant_features)

        return jsonify(
            {
                "plant" : recomended_plant
            }
        )
    except Exception as e:
        raise e     
    


disease_model = joblib.load("disease_model.pkl")
disease_scaler = joblib.load("disease_scaler.pkl")
disease_label = joblib.load("disease_label.pkl")

@app.route("/predict/disease", methods = ["POST"])
def predict_disease():
    try:
        data = request.json
        features = [
            data["Temperature"],
            data["Humidity"],
            data["Wind_Speed"],
            data["fever"],
            data["cough"],
            data["fatigue"]
        ]
        print(features)
        x_scaled = disease_scaler.transform([features])
        predict_class = int(disease_model.predict(x_scaled)[0])
        predict_label = disease_label.inverse_transform([predict_class])[0]

        return jsonify(
            {
                "disease" : predict_label
            }
        )
    except Exception as e:
        raise e




if __name__ == ("__main__"):
    app.run(port=5000, debug=True)
