import express, { Request, Response, urlencoded } from "express";
import { engine } from "express-handlebars";
import * as path from "path";
import * as swaggerUi from "swagger-ui-express";

import { configs } from "./configs";
import { ApiError } from "./errors";
import { weatherRouter, weatherToRenderRouter } from "./routers";
import * as swaggerDocument from "./utils/swagger.json";

const app = express();

const PORT = configs.PORT;

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.static(path.join(process.cwd(), "static")));
app.set("view engine", ".hbs");
app.engine(".hbs", engine({ defaultLayout: false }));
app.set("views", path.join(process.cwd(), "static"));

app.use("/weather-info", weatherToRenderRouter);

app.use("/weather", weatherRouter);

app.use("*", (err: ApiError, req: Request, res: Response) => {
  const status = err.status || 500;
  res.json({
    message: err.message,
    status: status,
  });
});

app.listen(PORT, () => {
  console.log(`Server has started on ${PORT} port`);
});
