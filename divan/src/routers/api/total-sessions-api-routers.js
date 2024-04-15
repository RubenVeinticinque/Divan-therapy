const { Router } = require("express");
const {
  totalSessions,
} = require("../../Controllers/api/total-sessions-api-controller");
const router = Router();

router.post("/api/total-sessions", totalSessions);

module.exports = router;
