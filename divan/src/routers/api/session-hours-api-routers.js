const { Router } = require("express");
const {
  sessionHours,
} = require("../../Controllers/api/session-hours-api-controller");
const router = Router();

router.post("/api/session-hours", sessionHours);

module.exports = router;
