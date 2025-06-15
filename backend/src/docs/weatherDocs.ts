// filepath: backend/src/docs/weatherDocs.ts

/**
 * @openapi
 * /api/weather/current:
 *   get:
 *     summary: Get current weather
 *     parameters:
 *       - in: query
 *         name: lat
 *         schema:
 *           type: string
 *         required: true
 *         description: Latitude
 *       - in: query
 *         name: lon
 *         schema:
 *           type: string
 *         required: true
 *         description: Longitude
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Missing or invalid parameters
 */

/**
 * @openapi
 * /api/weather/forecast:
 *   get:
 *     summary: Get weather forecast
 *     parameters:
 *       - in: query
 *         name: lat
 *         schema:
 *           type: string
 *         required: true
 *         description: Latitude
 *       - in: query
 *         name: lon
 *         schema:
 *           type: string
 *         required: true
 *         description: Longitude
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Missing or invalid parameters
 */