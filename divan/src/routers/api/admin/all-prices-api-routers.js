const { Router } = require("express");
const {
  allPrices,
} = require("../../../Controllers/api/all-prices-api-controller");
const router = Router();

router.post("/api/all-prices", allPrices);

module.exports = router;
