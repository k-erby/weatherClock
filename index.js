// .env is needed; add var open_weather_secret=apiKeySecret
if (!process.env.now) { require("dotenv").config(); }

const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.now ? 8080 : 4000;

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

const getCurrentLocalWeather = async () => {
  const weather = await getWeather();

  if (weather.data) {
    return weather.data;
  }
}

app.get("/", (req, res) => {
  getCurrentLocalWeather().then(weatherData => {
    res.send(weatherData);
  })
});

const server = app.listen(port);