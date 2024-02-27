import { Router } from "express";

import { weatherController } from "../controllers";
import { weatherMiddleware } from "../middlewares";
import { WeatherValidator } from "../validators";

const router = Router();

router.get(
  "/",
  weatherMiddleware.isCityValid(WeatherValidator.city),
  weatherController.getWeather,
);

export const weatherRouter = router;
