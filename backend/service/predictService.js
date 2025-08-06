const { getAQI, getCity, getPollution, getWeather } = require("./ext-api.js");
const City = require("../model/cityModel.js");
const axios = require("axios");

const getListCity = async (name) => {
  try {
    const mainCity = await getCity(name);
    const nearestCity = await City.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [mainCity.lon, mainCity.lat],
          },
        },
      },
    }).limit(5);
    const filter = nearestCity.filter((city) => city.city !== mainCity.city);
    filter.push({
      city: mainCity.city,
      location: {
        type: "Point",
        coordinates: [mainCity.lon, mainCity.lat],
      },
    });
    console.log(filter);
    return filter;
  } catch (error) {
    console.log("Failed to get list city", error.message);
    return Error("Failed to get list city", error.message);
  }
};

const getInputData = async (lat, lon) => {
  try {
    console.log(lat, lon);
    const [pollution, weather] = await Promise.all([
      getPollution(lat, lon),
      getWeather(lat, lon),
    ]);
    console.log(pollution);
    console.log(weather);
    return {
      CO: pollution.CO,
      NO2: pollution.NO2,
      SO2: pollution.SO2,
      PM10: pollution.PM10,
      PM2_5: pollution.PM2_5,
      Temperature: weather.Temperature,
      Humidity: weather.Humidity,
    };
  } catch (error) {
    console.log("Failed to get Input Data", error.message);
    return Error("Failed to get Input Data", error.message);
  }
};

const getHealtLabel = async (inputData) => {
  try {
    const result = (
      await axios.post(`http://127.0.0.1:5000/predict/health`, inputData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).data;

    return result.healthLabel;
  } catch (error) {
    console.log("Failed to get Input Data", error.message);
    return Error("Failed to get Health Label", error.message);
  }
};

const getRecomendPlants = async (inputData) => {
  try {
    const result = (
      await axios.post(`http://127.0.0.1:5000/predict/plants`, inputData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).data;
    console.log(result);
    return;
  } catch (error) {
    console.log("Failed to get Input Data", error.message);
    return Error("Failed to get Health Label", error.message);
  }
};

const MLresult = async (name) => {
  try {
    const cities = await getListCity(name);

    const result = cities.map(async (city) => {
      console.log(city);
      const lat = city.location.coordinates[1];
      const lon = city.location.coordinates[0];
      const inputData = await getInputData(lat, lon);
      const healthLabel = await getHealtLabel(inputData);
      const plantRecomendation = await getRecomendPlants(inputData);
      const AQI = await getAQI(lat, lon);

      return {
        geometry: {
          type: "Point",
          coordinates: [lon, lat],
        },
        airPollution: {
          label: healthLabel,
          AQI: AQI,
          property: inputData,
        },
        plant: plantRecomendation,
      };
    });

    const final = await Promise.all(result);
    console.log(final);
    return final;
  } catch (error) {
    console.log("Failed to get Input Data", error.message);
    return Error("Failed to get Health Label", error.message);
  }
};

const getDiease = async (name, cough, fatigue, fever) => {
  try {
    const mainCity = await getCity(name);
    const weather = await getWeather(mainCity.lat, mainCity.lon);
    const cgh = cough ? 1 : 0;
    const ftg = fatigue ? 1 : 0;
    const fvr = fever ? 1 : 0;
    const inputData = {
      cough: cgh,
      fatigue: ftg,
      fever: fvr,
      Temperature: weather.Temperature,
      Humidity: weather.Humidity,
      Wind_Speed: weather.WindSpeed,
    };

    const result = await axios.get(
      `http://127.0.0.1:5000/predict/disease`,
      inputData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result.disease;
  } catch (error) {
    console.log("Failed to get Input Data", error.message);
    return Error("Failed to get Health Label", error.message);
  }
};

module.exports = { MLresult, getDiease, getInputData };
