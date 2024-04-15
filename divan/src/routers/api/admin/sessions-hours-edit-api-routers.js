const { Router } = require("express");

const {
  sessionHoursUpdate,
} = require("../../../Controllers/api/sessions-hours-edit-api-controller");
const validateSessionHoursEdit = require("../../../middleware/validate-session-hours-edit-middleware");
const router = Router();

router.put(
  "/api/session-hour-edit",
  validateSessionHoursEdit,
  sessionHoursUpdate
);

module.exports = router;
