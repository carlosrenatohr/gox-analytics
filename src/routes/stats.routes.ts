import express from "express";
import { getPageViewsStats } from "../controllers/stats.controller";
import { validateStatsQuery } from "../middlewares/statsQueryParams.middleware";
import { authenticateToken } from "../middlewares/auth.middleware";

const router = express.Router();

// -- Stats routes --
/**
 * @swagger
 * /api/v1/stats/page-views:
 *   get:
 *     tags:
 *       - Events Stats
 *     summary: Get page views stats
 *     description: Get page views stats for a given time range
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: from
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           example: "2025-07-04"
 *       - name: to
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           example: "2025-08-25"
 *       - name: limit
 *         in: query
 *         required: false
 *         schema:
 *           type: number
 *           example: 10
 *       - name: page
 *         in: query
 *         required: false
 *         schema:
 *           type: number
 *           example: 1
 *       - name: orderBy
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           example: "views"
 *       - name: orderDirection 
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           example: "desc"
 *       - name: groupBy
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           example: "url"
 *     responses:
 *       200:
 *         description: Page views stats retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pageViews:
 *                   type: number
 *                   description: Total number of page views
 *                 uniqueVisitors:
 *                   type: number
 *                   description: Total number of unique visitors
 *                 totalTimeSpent:
 *                   type: number
 *                   description: Total time spent by visitors
 *                 averageTimeSpent:
 *                   type: number
 *                   description: Average time spent per visit
 *                 topPages:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       url:
 *                         type: string
 *                       views:
 *                         type: number
 *                       timeSpent:
 *                         type: number
 *                       bounceRate:
 *                         type: number
 *       400:
 *         description: Invalid query parameters. Check the query parameters and try again.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized. Please provide a valid token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error. Please try again later.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
router.get("/page-views", authenticateToken, validateStatsQuery, getPageViewsStats);
// router.get("/activity", validateActivityQuery, getActivityStats);

export default router;