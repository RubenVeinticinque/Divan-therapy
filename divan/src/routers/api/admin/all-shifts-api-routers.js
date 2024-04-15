const { Router } = require("express");
const {
  allTurns,
} = require("../../../Controllers/api/all-shifts-api-controller");
const router = Router();

router.post("/api/turns", allTurns);

module.exports = router;
