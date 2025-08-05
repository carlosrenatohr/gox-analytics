import { Router } from "express";
import { postTrackEvent, postTrackExternalEvent } from "../controllers/event.controller";
import { validateEvent } from "../middlewares/eventValidation.middleware";
import { eventArraySchema, externalEventArraySchema } from "../schemas/event.schema"; 
import { authenticateToken } from "../middlewares/auth.middleware";


const router = Router();

// -- Event routes --
router.post("/", authenticateToken, validateEvent(eventArraySchema), postTrackEvent);
router.post("/external", authenticateToken, validateEvent(externalEventArraySchema), postTrackExternalEvent);

export default router;
