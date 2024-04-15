const { Router } = require("express");
const {
  medicalApointments,
} = require("../../Controllers/api/medical-appointments-api-controller");

const router = Router();

router.post("/api/medical-appointments", medicalApointments);

module.exports = router;
