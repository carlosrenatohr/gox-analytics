import express from "express";
import { getPageViewsStats } from "../controllers/stats.controller";
import { validateStatsQuery } from "../middlewares/statsQueryParams.middleware";
import { authenticateToken } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/page-views", authenticateToken, validateStatsQuery, getPageViewsStats);
// router.get("/activity", validateActivityQuery, getActivityStats);

export default router;