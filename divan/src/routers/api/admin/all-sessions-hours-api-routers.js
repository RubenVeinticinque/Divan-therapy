const { Router } = require("express");
const {
  allSessionsHours,
} = require("../../../Controllers/api/all-sessions-hours-api-controller");
const router = Router();

router.post("/api/sessions-hours", allSessionsHours);

module.exports = router;
