import { Router } from "express";

import { weatherController } from "../controllers";

const router = Router();

router.get("/", weatherController.getWeather);

export const weatherRouter = router;
