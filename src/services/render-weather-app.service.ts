import { Request, Response } from "express";

import { WeatherPresenter } from "../presenters";
import { weatherService } from "./weather.service";

export const getWeatherInfoToRender = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    if (!("city" in req.query) || !"city".length) {
      res.render("home");
    }
    const city = (req.query.city as string) || "Ternopil";
    const info = await weatherService.getWeather(city);
    const weather = WeatherPresenter.weatherToResponse(info);
    const temp = Math.round(weather.temperature - 273.15);
    const feelsLike = Math.round(weather.feelsLike - 273.15);
    const description = weather.description.toUpperCase();
    res.render("weather", {
      weather,
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
    });
  } catch (e) {
    res.render("error");
  }
};
