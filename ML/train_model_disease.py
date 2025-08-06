import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.metrics import classification_report
import joblib
from xgboost import XGBClassifier

df = pd.read_csv("dataset_disease.csv")

features = ["Temperature","Humidity","Wind_Speed","fever","cough","fatigue"]
target = "prognosis"

le = LabelEncoder()
df[target] = le.fit_transform(df[target])
df = df.dropna(subset=features+[target])
x = df[features]
y = df[target]

scaler = StandardScaler()
x_scaled = scaler.fit_transform(x)

x_train, x_test, y_train, y_test = train_test_split(
    x_scaled, y, test_size=0.2,random_state=42, stratify=y
)

model = XGBClassifier(
    objective = "multi:softprob",
    num_class = len(le.classes_),
    eval_metric = "mlogloss",
    random_state = 42
)
model.fit(x_train,y_train)

print("MODELL BUILD")
y_pred = model.predict(x_test)
print("class disease",le.classes_)
print(classification_report(y_test,y_pred,target_names=le.classes_))

joblib.dump(model,"disease_model.pkl")
joblib.dump(scaler,"disease_scaler.pkl")
joblib.dump(le,"disease_label.pkl")