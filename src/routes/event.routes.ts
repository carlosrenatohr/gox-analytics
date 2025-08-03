import { Router } from "express";
import { postEvents } from "../controllers/event.controller";

const router = Router();

router.post("/event", postEvents);

export default router;
