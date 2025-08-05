import { Router } from "express";
import { postTrackEvent, postTrackExternalEvent } from "../controllers/event.controller";
import { validateEvent } from "../middlewares/eventValidation.middleware";
import { eventArraySchema, externalEventArraySchema } from "../schemas/event.schema"; 


const router = Router();

// -- Event routes --
router.post("/event", validateEvent(eventArraySchema), postTrackEvent);
router.post("/event/external", validateEvent(externalEventArraySchema), postTrackExternalEvent);

export default router;
