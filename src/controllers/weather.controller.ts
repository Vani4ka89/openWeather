import { NextFunction, Request, Response } from "express";

import { WeatherPresenter } from "../presenters";
import { weatherService } from "../services";
import { IWeather, IWeatherQuery } from "../types";

class WeatherController {
  public async getWeather(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IWeather>> {
    try {
      const city = req.res.locals.city as IWeatherQuery;
      const weather = await weatherService.getWeather(city);
      return res.status(200).json({
        data: WeatherPresenter.weatherToResponse(weather),
      });
    } catch (e) {
      next(e);
    }
  }
}

export const weatherController = new WeatherController();
