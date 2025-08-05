import { Router } from "express";
import { postTrackEvent, postTrackExternalEvent } from "../controllers/event.controller";
import { validateEvent } from "../middlewares/eventValidation.middleware";
import { eventArraySchema, externalEventArraySchema } from "../schemas/event.schema"; 


const router = Router();

// -- Event routes --
router.post("/", validateEvent(eventArraySchema), postTrackEvent);
router.post("/external", validateEvent(externalEventArraySchema), postTrackExternalEvent);

export default router;
