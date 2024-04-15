const { Router } = require("express");
const {
  therapistsSelected,
  therapistsSelectedErrors,
} = require("../../Controllers/api/therapists-selected-api-controller");
const router = Router();

router.post("/api/therapists-selected", therapistsSelected);
router.post("/api/therapists-selected-errors", therapistsSelectedErrors);

module.exports = router;
