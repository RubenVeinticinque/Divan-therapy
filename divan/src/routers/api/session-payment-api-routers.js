const { Router } = require("express");
const {
  sessionPayment,
} = require("../../Controllers/api/session-payment-api-controller");
const router = Router();

router.post("/api/checkout-payment", sessionPayment);

module.exports = router;
