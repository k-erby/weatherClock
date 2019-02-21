// .env is needed; add var open_weather_secret=apiKeySecret
if (!process.env.now) { require("dotenv").config(); }

const axios = require('axios');

let apiKey = process.env.open_weather_secret;
let cityID = '6174041';
let weather;

const getWeather = async () => {
  try {
    return await axios.get(`http://api.openweathermap.org/data/2.5/weather?id=${cityID}&units=metric&appid=${apiKey}`)
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  getCurrentLocalWeather: getCurrentLocalWeather = async () => {
    const weather = await getWeather();

    if (weather.data) {
      return weather.data;
    }
  }
}
