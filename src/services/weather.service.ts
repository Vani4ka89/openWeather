import axios from "axios";

import { urls } from "../constants";
import { ApiError } from "../errors";
import { IWeather } from "../types";

class WeatherService {
  public async getWeather(city: string): Promise<IWeather> {
    try {
      const url = `${urls.weatherUrl}${city}&appid=${urls.apiKey}&lang=ua`;
      const { data } = await axios.get(url);
      return await data;
    } catch (err) {
      throw new ApiError("Please enter a correct city name!...", 400);
    }
  }
}

export const weatherService = new WeatherService();
