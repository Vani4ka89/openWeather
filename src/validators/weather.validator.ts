import Joi from "joi";

export class WeatherValidator {
  public static city = Joi.string()
    .regex(/^[a-zA-Zа-яєіїьА-ЯЄІЇЬ]+(?:[\s-][a-zA-Zа-яєіїьА-ЯЄІЇЬ]+)*$/)
    .min(2)
    .max(30)
    .trim()
    .required();
}
