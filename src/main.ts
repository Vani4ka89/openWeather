import express, { Request, Response, urlencoded } from "express";
import { engine } from "express-handlebars";
import * as path from "path";
import * as swaggerUi from "swagger-ui-express";

import { configs } from "./configs";
import { ApiError } from "./errors";
import { WeatherPresenter } from "./presenters";
import { weatherRouter } from "./routers";
import { weatherService } from "./services";
import * as swaggerDocument from "./utils/swagger.json";

const app = express();

const PORT = configs.PORT;

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use(express.static(path.join(process.cwd(), "static")));
app.set("view engine", ".hbs");
app.engine(".hbs", engine({ defaultLayout: false }));
app.set("views", path.join(process.cwd(), "static"));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", async (req: Request, res: Response) => {
  res.render("home");
});

app.get("/info", async (req: Request, res: Response) => {
  try {
    const city = (req.query.city as string) || "Ternopil";
    const info = await weatherService.getWeather(city);
    const temp = Math.round(info.main.temp - 273.15);
    const feelsLike = Math.round(info.main.feels_like - 273.15);
    const weather = WeatherPresenter.weatherToResponse(info);
    res.render("weather", {
      weather,
      temp,
      feelsLike,
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
});

app.use("/weather", weatherRouter);

app.use("*", (err: ApiError, req: Request, res: Response) => {
  const status = err.status || 500;
  res.json({
    message: err.message,
    status: status,
  });
});

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
