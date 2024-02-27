import { NextFunction, Request, Response } from "express";
import { StringSchema } from "joi";

import { ApiError } from "../errors";
import { IWeatherQuery } from "../types";

class WeatherMiddleware {
  public isCityValid(validator: StringSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const city = req.query.city as IWeatherQuery;
        if (!city) {
          throw new ApiError("No city name", 400);
        }
        const { error, value } = validator.validate(city);
        if (error) {
          throw new ApiError(
            `Please enter a correct city name!... ${error.message}`,
            400,
          );
        }
        req.res.locals.city = value;
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public isCityValidToRender(validator: StringSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const city = req.query.city as IWeatherQuery;
        if (!city) {
          return res.render("home");
        }
        const { error, value } = validator.validate(city);
        if (error) {
          return res.render("error");
        }
        req.res.locals.city = value;
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const weatherMiddleware = new WeatherMiddleware();
