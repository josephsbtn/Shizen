import pandas as pd
import numpy as np
from xgboost import XGBClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.metrics import classification_report
import joblib

df = pd.read_csv("dataset_health.csv")

features = ["Temperature","Humidity","PM2_5","PM10","NO2","SO2","CO"]
target = "Air Quality"

le = LabelEncoder()
df[target] = le.fit_transform(df[target])
df = df.dropna(subset=features+[target])
x = df[features]
y = df[target].astype(int)

scaler = StandardScaler()
x_scaled = scaler.fit_transform(x)

x_train, x_test, y_train, y_test = train_test_split(
    x_scaled, y, test_size=0.2, random_state= 42, stratify=y
)

model = XGBClassifier(
    objective = "multi:softprob",
    num_class = len(np.unique(y)),
    eval_metric = "mlogloss",
    random_state = 42,
    n_estimators = 200,
    max_depth = 6
)
model.fit(x_train,y_train)

print("DONEEE MODELLL HEALTH")
y_pred = model.predict(x_test)
label_names = le.classes_.tolist()
print(classification_report(y_test,y_pred,target_names=label_names))

joblib.dump(model,"health_model.pkl")
joblib.dump(scaler,"health_scaler.pkl")
joblib.dump(le,"health_label.pkl")
