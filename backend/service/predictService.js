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
    return filter;
  } catch (error) {
    console.log("Failed to get list city", error);
    return Error("Failed to get list city", error);
  }
};

const getInputData = async (lat, lon) => {
  try {
    const [pollution, weather] = await Promise.all([
      getPollution(lat, lon),
      getWeather(lat, lon),
    ]);

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
    console.log("Failed to get Input Data", error);
    return Error("Failed to get Input Data", error);
  }
};

const getHealtLabel = async (inputData) => {
  try {
    const result = (
      await axios.get(`http://127.0.0.1:5000/predict/health`, inputData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).data;

    return result.healthLabel;
  } catch (error) {
    console.log("Failed to get Input Data", error);
    return Error("Failed to get Health Label", error);
  }
};

const getRecomendPlants = async (inputData) => {
  try {
    const result = (
      await axios.get(`http://127.0.0.1:5000/predict/plants`, inputData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).data;
    return result.plant;
  } catch (error) {
    console.log("Failed to get Input Data", error);
    return Error("Failed to get Health Label", error);
  }
};

const MLresult = async (name) => {
  try {
    const cities = await getListCity(name);

    const result = cities.map(async (city) => {
      console.log(city);
      const lat = city.location.coordinates[0];
      const lon = city.location.coordinates[1];
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
    console.log("Failed to get Input Data", error);
    return Error("Failed to get Health Label", error);
  }
};

module.exports = { MLresult };
