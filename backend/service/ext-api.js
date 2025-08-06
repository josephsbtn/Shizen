const { KEY_AQI, KEY_OPENWEATHER } = require("../config/config");
const axios = require("axios");

const getCity = async (city) => {
  try {
    const result = (
      await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${KEY_OPENWEATHER}
`)
    ).data;
    return {
      city: result[0].name,
      lat: result[0].lat,
      lon: result[0].lon,
    };
  } catch (error) {
    console.log("Failed to get city", city);
    return Error("Failed to get city", city);
  }
};

const getPollution = async (lat, lon) => {
  try {
    const result = (
      await axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${KEY_OPENWEATHER}
`)
    ).data;

    return {
      PM10: result.list[0].components.pm10,
      PM2_5: result.list[0].components.pm2_5,
      NO2: result.list[0].components.no2,
      SO2: result.list[0].components.so2,
      CO: result.list[0].components.co,
    };
  } catch (error) {
    console.log("Failed to get pollution");
    return Error("Failed to get pollution");
  }
};

const getWeather = async (lat, lon) => {
  try {
    console.log("lat", lat, "lon", lon);
    const result = (
      await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${KEY_OPENWEATHER}&units=metric`
      )
    ).data;
    return {
      Temperature: result.main.temp,
      Humidity: result.main.humidity,
      WindSpeed: result.wind.speed,
    };
  } catch (error) {
    console.log("Failed to get weather");
    return Error("Failed to get weather");
  }
};

const getAQI = async (lat, lon) => {
  try {
    const result = (
      await axios.get(`https://api.waqi.info/feed/geo:${lat};${lon}/?token=${KEY_AQI}
`)
    ).data;
  } catch (error) {
    console.log("Failed to get AQI");
    return Error("Failed to get AQI");
  }
};

module.exports = {
  getAQI,
  getCity,
  getPollution,
  getWeather,
};
