export interface IWeatherToRender {
  cityName: string;
  humidity: number;
  windSpeed: number;
  temp: number;
  feelsLike: number;
  description: string;
  icon: {
    clear: boolean;
    drizzle: boolean;
    clouds: boolean;
    rain: boolean;
    snow: boolean;
    mist: boolean;
  };
}
