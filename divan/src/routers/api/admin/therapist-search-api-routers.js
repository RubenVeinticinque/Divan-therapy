const { Router } = require("express");
const {
  therapistsSearchProccess,
} = require("../../../Controllers/api/therapist-search-api-controller");
const {
  validateTherapistSearchEdit,
} = require("../../../middleware/validate-search-middleware");
const router = Router();

router.post(
  "/api/therapist-search",
  validateTherapistSearchEdit,
  therapistsSearchProccess
);

module.exports = router;
