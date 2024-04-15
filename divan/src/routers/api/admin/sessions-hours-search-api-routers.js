const { Router } = require("express");
const {
  sessionHoursEdit,
} = require("../../../Controllers/api/sessions-hours-search-api-controller");
const {
  validateSessionsHoursSearchEdit,
} = require("../../../middleware/validate-search-middleware");
const router = Router();

router.post(
  "/api/sessions-hours-search",
  validateSessionsHoursSearchEdit,
  sessionHoursEdit
);

module.exports = router;
