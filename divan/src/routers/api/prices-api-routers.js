const { Router } = require("express");
const { price } = require("../../Controllers/api/prices-api-controller");
const router = Router();

router.post("/api/prices", price);

module.exports = router;
