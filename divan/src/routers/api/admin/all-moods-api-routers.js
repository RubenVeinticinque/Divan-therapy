const { Router } = require("express");
const {
  allMoods,
} = require("../../../Controllers/api/all-moods-api-controller");
const router = Router();

router.post("/api/moods", allMoods);

module.exports = router;
