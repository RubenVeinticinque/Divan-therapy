const { Router } = require("express");
const {
  donationProcess,
} = require("../../Controllers/api/donation-checkout-bricks-api-controller");
const router = Router();

router.post("/api/checkout-donation", donationProcess);

module.exports = router;
