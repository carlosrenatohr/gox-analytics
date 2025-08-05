import express from "express";
import { getPageViewsStats } from "../controllers/stats.controller";
import { validateStatsQuery } from "../middlewares/statsQueryParams.middleware";

const router = express.Router();

router.get("/page-views", validateStatsQuery, getPageViewsStats);
// router.get("/activity", validateActivityQuery, getActivityStats);

export default router;