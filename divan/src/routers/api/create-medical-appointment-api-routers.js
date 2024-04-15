const { Router } = require("express");
const {
  createMedicalAppointment,
} = require("../../Controllers/api/create-medical-appointment-api-controller");
const router = Router();

router.post("/api/enter-datetime", createMedicalAppointment);

module.exports = router;
