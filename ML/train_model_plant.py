import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib

df = pd.read_csv("dataset_plant.csv")

features = ["Skor APTI","Skor API","PM2_5","SO2","NO2"]
target = "Direkomendasikan"

