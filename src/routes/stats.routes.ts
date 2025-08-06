import express from "express";
import { getPageViewsStats, getTopPages, getTopUsers, getUserActivityStats } from "../controllers/stats.controller";
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
 *     description: Get total of page views for a given time range and other metric
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
 *           example: "count"
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

/**
 * @swagger
 * /api/v1/stats/user-activity:
 *   get:
 *     tags:
 *       - Events Stats
 *     summary: Get user activity stats
 *     description: Stats for a given userId and time range
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           example: "123"
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
 *           example: "count"   
 *       - name: orderDirection
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           example: "desc"   
 *     responses:
 *       200:
 *         description: User activity stats retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: number
 *                   description: Current page number
 *                 limit:
 *                   type: number
 *                   description: Number of items per page
 *                 total:
 *                   type: number
 *                   description: Total number of items
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
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
 * 
 */ 

router.get("/user-activity", authenticateToken, validateStatsQuery, getUserActivityStats);

/**
 * @swagger
 * /api/v1/stats/top-pages:
 *   get:
 *     tags:
 *       - Events Stats
 *     summary: Get top pages stats
 *     description: Get top pages stats for a given time range
 *     security: []
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
 *           example: "count"
 *       - name: orderDirection
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           example: "desc"
 *     responses:
 *       200:
 *         description: Top pages stats retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: number
 *                   description: Current page number
 *                 limit:
 *                   type: number
 *                   description: Number of items per page
 *                 total:
 *                   type: number
 *                   description: Total number of items
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Invalid query parameters. Check the query parameters and try again.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

router.get("/top-pages", validateStatsQuery, getTopPages);

/**
 * @swagger
 * /api/v1/stats/top-users:
 *   get:
 *     tags:
 *       - Events Stats
 *     summary: Get top users stats
 *     description: Get top users stats for a given time range
 *     security: []
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
 *           example: "count"
 *       - name: orderDirection
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           example: "desc"
 *     responses:   
 *       200:
 *         description: Top users stats retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: number
 *                   description: Current page number               
 *                 limit:
 *                   type: number
 *                   description: Number of items per page
 *                 total:
 *                   type: number
 *                   description: Total number of items
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object 
 */

router.get("/top-users", validateStatsQuery, getTopUsers);

export default router;