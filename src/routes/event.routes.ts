import { Router } from "express";
import { postTrackEvent, postTrackExternalEvent } from "../controllers/event.controller";
import { validateEvent } from "../middlewares/eventValidation.middleware";
import { eventArraySchema, externalEventArraySchema } from "../schemas/event.schema"; 
import { authenticateToken } from "../middlewares/auth.middleware";


const router = Router();

// -- Event routes --
/**
 * @swagger
 * /api/v1/event:
 *   post:
 *     tags:
 *       - Events
 *     summary: Track event
 *     description: Track a single user event (page view, click, etc)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "u_abc123"
 *               sessionId:
 *                 type: string
 *                 example: "s_xyz987"
 *               event:
 *                 type: string
 *                 example: "page_view"
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-07-30T14:22:00Z"
 *               metadata:
 *                 type: object
 *                 properties:
 *                   url:
 *                     type: string
 *                     example: "/home"
 *                   referrer:
 *                     type: string
 *                     example: "/login"
 *                   device:
 *                     type: string
 *                     example: "mobile"
 *                   browser:
 *                     type: string
 *                     example: "Chrome"
 *     responses:
 *       200:
 *         description: Event tracked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     eventId:
 *                       type: string
 *                     userId:
 *                       type: string
 *                     timestamp:
 *                       type: string
 *       400:
 *         description: Invalid request body. Check the request body and try again.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
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
 *                 error:
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
router.post("/", authenticateToken, validateEvent(eventArraySchema), postTrackEvent);

/**
 * @swagger
 * /api/v1/event/external:
 *   post:
 *     tags:
 *       - Events
 *     summary: Track external event
 *     description: Track an event from an external source (e.g. Pixel, API call, etc)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 example: "/faqs"
 *               referrer:
 *                 type: string
 *                 example: "/home"
 *               device:
 *                 type: string
 *                 example: "mobile"
 *               browser:
 *                 type: string
 *                 example: "Chrome"
 * 
 *     responses:
 *       200:
 *         description: Event tracked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     eventId:
 *                       type: string
 *                     userId:
 *                       type: string
 *                     timestamp:
 *                       type: string  
 *       400:
 *         description: Invalid request body. Check the request body and try again.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
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
 *                 error:
 *                   type: string
 */
router.post("/external", authenticateToken, validateEvent(externalEventArraySchema), postTrackExternalEvent);

export default router;
