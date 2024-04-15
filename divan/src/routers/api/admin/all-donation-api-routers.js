const { Router } = require("express");
const {
  allDonations,
} = require("../../../Controllers/api/all-donation-api-controller");
const router = Router();

router.post("/api/donations", allDonations);

module.exports = router;
