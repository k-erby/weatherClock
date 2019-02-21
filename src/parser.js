var api = require('./api');

let weatherData;

api.getCurrentLocalWeather().then(weather => {
  weatherData = weather;
})

