var api = require('./api');

// General Info
let normWeather;
let mainWeatherInfo;

const weatherConfig = {
  main: "",
  temp: 0,
  humidity: 0,
  cloudPercentage: 0,
  rainAmount: 0
};

module.exports = {
  getWeather: getWeather = async () => {
    await api.getCurrentLocalWeather().then(weather => {
      normWeather = weather;
      mainWeatherInfo = weather.weather[0];
    })

    weatherConfig.main = mainWeatherInfo.main;
    weatherConfig.temp = normWeather.main.temp;
    weatherConfig.humidity = normWeather.main.humidity;
    weatherConfig.cloudPercentage = normWeather.clouds.all;

    try {
      weatherConfig.rainAmount = normWeather.rain['3h'];
    } catch (e) {
      weatherConfig.rainAmount = 0;
    }

    return weatherConfig;
  }
}
