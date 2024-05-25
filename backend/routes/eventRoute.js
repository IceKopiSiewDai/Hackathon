const express = require("express");

const EventController = require("../controllers/eventController");

const router = express.Router();

router.get("/getEvents", EventController.getEvents);
router.get("getEventId/:eventId", EventController.getEventId);

router.post("/postEvent", EventController.postEvents);
router.get("/getEventDetails/:id", EventController.getEventDetails);

router.get("/getPastEvents", EventController.getPastEvents);
module.exports = router;
