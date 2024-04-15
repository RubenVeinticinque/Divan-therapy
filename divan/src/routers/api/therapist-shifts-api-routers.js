const { Router } = require("express");
const {
  therapistShifts,
} = require("../../Controllers/api/therapist-shifts-api-controller");
const {
  validateTherapistShifts,
} = require("../../middleware/validate-therapist-shifts-middleware");
const router = Router();

router.post("/api/therapist-shifts", validateTherapistShifts, therapistShifts);

module.exports = router;
