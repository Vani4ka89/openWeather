import { IWeather } from "../types";

export class WeatherPresenter {
  public static weatherToResponse(weather: IWeather) {
    return {
      id: weather.id,
      icon: weather.weather[0].icon,
      iconInfo: weather.weather[0].main,
      description: weather.weather[0].description.toUpperCase(),
      country: weather.sys.country,
      cityName: weather.name,
      temperature: weather.main.temp,
      windSpeed: weather.wind.speed,
      humidity: weather.main.humidity,
      pressure: weather.main.pressure,
      lon: weather.coord.lon,
      lat: weather.coord.lat,
    };
  }
}
