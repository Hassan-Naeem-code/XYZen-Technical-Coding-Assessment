import { Router } from 'express';
import WeatherController from '../controllers/weatherController';

const router = Router();
const weatherController = new WeatherController();

export function setWeatherRoutes(app: Router) {
    app.get('/api/weather/current', weatherController.getCurrentWeather.bind(weatherController));
    app.get('/api/weather/forecast', weatherController.getWeatherForecast.bind(weatherController));
}