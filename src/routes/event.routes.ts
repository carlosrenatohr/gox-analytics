import { Router } from "express";
import { postTrackEvent, trackExternalEvent } from "../controllers/event.controller";
import { validateEvent } from "../middlewares/validation.middleware";
import { eventSchema, externalEventSchema } from "../schemas/event.schema"; 

const router = Router();

router.post("/event", validateEvent(eventSchema), postTrackEvent);
router.get("/event/external", trackExternalEvent);

export default router;
