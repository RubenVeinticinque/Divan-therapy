const { Router } = require("express");
const {
  priceEdit,
} = require("../../../Controllers/api/price-edit-api-controller");
const validatePriceEdit = require("../../../middleware/validate-price-edit-middleware");
const router = Router();

router.put("/api/price-edit", validatePriceEdit, priceEdit);

module.exports = router;
