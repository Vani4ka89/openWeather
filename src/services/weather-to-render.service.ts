import { Response } from "express";

import { WeatherPresenter } from "../presenters";
import { IWeatherQuery, IWeatherToRender } from "../types";
import { weatherService } from "./weather.service";
class WeatherToRenderService {
  public async getToRender(
    city: IWeatherQuery,
    res: Response,
  ): Promise<IWeatherToRender> {
    try {
      const weatherData = await weatherService.getWeather(city);
      const weather = WeatherPresenter.weatherToResponse(weatherData);
      const cityName = weather.cityName;
      const humidity = weather.humidity;
      const windSpeed = weather.windSpeed;
      const temp = Math.round(weather.temperature - 273.15);
      const feelsLike = Math.round(weather.feelsLike - 273.15);
      const description = weather.description.toUpperCase();
      return {
        cityName,
        humidity,
        windSpeed,
        temp,
        feelsLike,
        description,
        icon: {
          clear: weather.iconInfo === "Clear",
          drizzle: weather.iconInfo === "Drizzle",
          clouds: weather.iconInfo === "Clouds",
          rain: weather.iconInfo === "Rain",
          snow: weather.iconInfo === "Snow",
          mist: weather.iconInfo === "Mist",
        },
      };
    } catch (e) {
      res.render("error");
    }
  }
}

export const weatherToRenderService = new WeatherToRenderService();
