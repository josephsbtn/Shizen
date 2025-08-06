import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib

df = pd.read_csv("dataset_plant.csv")

features = ["Skor APTI","Skor API","PM2_5","SO2","NO2"]
target = "Direkomendasikan"

x = df[features]
y = df[target]

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(x,y)

print("DONEE MODELLL PLANTTT")

joblib.dump(model,"plant_model.pkl")
joblib.dump(features,"plant_features.pkl")