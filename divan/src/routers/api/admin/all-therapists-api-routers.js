const { Router } = require("express");
const {
  allTherapists,
} = require("../../../Controllers/api/all-therapists-api-controller");
const router = Router();

router.post("/api/therapists", allTherapists);

module.exports = router;
