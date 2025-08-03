import { Router } from "express";
import { postTrackEvent, trackExternalEvent } from "../controllers/event.controller";

const router = Router();

router.post("/event", postTrackEvent);
router.get("/event/external", trackExternalEvent);

export default router;
