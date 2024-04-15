const { Router } = require("express");
const {
  addressTherapist,
} = require("../../Controllers/api/address-therapist-api-controller");
const router = Router();

router.post("/api/address-therapist", addressTherapist);

module.exports = router;
