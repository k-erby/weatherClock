const express = require('express');
const axios = require('axios');

const app = express();
const port = 4000;

// TODO: this will result in 'undefined' when deployed, so fix that.
let apiKey = process.env.WEATHER_API;
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

// TODO: zeit is still unhappy with this and throws a 502.
app.get("/", (req, res) => {
  getCurrentLocalWeather().then(weatherData => {
    res.send(weatherData.main)
  })
});

const server = app.listen(port);