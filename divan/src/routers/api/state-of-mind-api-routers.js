const { Router } = require("express");
const {
  stateOfMind,
} = require("../../Controllers/api/state-of-mind-api-controller");
const router = Router();

router.post("/api/state-of-mind", stateOfMind);

module.exports = router;
