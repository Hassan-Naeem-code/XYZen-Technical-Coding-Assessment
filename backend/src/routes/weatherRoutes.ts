import WeatherController from "../controllers/weatherController";
import { z } from "zod";
import { requireLatLon, validateQuery } from "../middleware/validateRequest";

const weatherController = new WeatherController();

const weatherQuerySchema = z.object({
  lat: z.string().min(1),
  lon: z.string().min(1),
});

export function setWeatherRoutes(app: any) {
  app.get(
    "/api/weather/current",
    requireLatLon,
    validateQuery(weatherQuerySchema),
    weatherController.getCurrentWeather.bind(weatherController)
  );
  app.get(
    "/api/weather/forecast",
    requireLatLon,
    validateQuery(weatherQuerySchema),
    weatherController.getWeatherForecast.bind(weatherController)
  );
}
