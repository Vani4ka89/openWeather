import { NextFunction, Request, Response } from "express";

import { weatherToRenderService } from "../services";
import { IWeatherQuery } from "../types";

class WeatherToRenderController {
  public async getToRender(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const city = req.res.locals.city as IWeatherQuery;
      const weather = await weatherToRenderService.getToRender(city, res);
      return res.render("weather", { weather });
    } catch (e) {
      next(e);
    }
  }
}

export const weatherToRenderController = new WeatherToRenderController();
