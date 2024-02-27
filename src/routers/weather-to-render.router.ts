import { Router } from "express";

import { weatherToRenderController } from "../controllers";
import { weatherMiddleware } from "../middlewares";
import { WeatherValidator } from "../validators";

const router = Router();

router.get(
  "/",
  weatherMiddleware.isCityValidToRender(WeatherValidator.city),
  weatherToRenderController.getToRender,
);

export const weatherToRenderRouter = router;
