const { Router } = require("express");

const {
  validatePriceSearchEdit,
} = require("../../../middleware/validate-search-middleware");
const {
  priceSearchProccess,
} = require("../../../Controllers/api/price-search-api-controller");

const router = Router();

router.post("/api/price-search", validatePriceSearchEdit, priceSearchProccess);

module.exports = router;
