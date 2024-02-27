import axios from "axios";

import { urls } from "../constants";
import { ApiError } from "../errors";
import { IWeather, IWeatherQuery } from "../types";

class WeatherService {
  public async getWeather(city: IWeatherQuery): Promise<IWeather> {
    try {
      const url = `${urls.weatherUrl}${city}&appid=${urls.apiKey}&lang=ua`;
      const { data } = await axios.get(url);
      return await data;
    } catch (err) {
      throw new ApiError("City name is wrong!...", 400);
    }
  }
}

export const weatherService = new WeatherService();
