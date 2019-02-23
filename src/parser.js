var api = require('./api');
var formatter = require('./formatter');

// General Info
let normWeather;
let mainWeatherInfo;

const weatherConfig = {
  main: "",
  temp: 0,
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
    weatherConfig.cloudPercentage = normWeather.clouds.all;

    // Rain isn't consistently stored in the JSON we get from the api, so wrap interacting with
    // it in a try-catch to catch when it's not in the JSON object.
    try {
      weatherConfig.rainAmount = normWeather.rain['3h'];
    } catch (e) {
      weatherConfig.rainAmount = 0;
    }

    return formatter.formatProtobuf(weatherConfig);
  }
}
