const { Router } = require("express");
const { regions } = require("../../Controllers/api/region-api-controller");
const router = Router();

router.post("/api/regions", regions);

module.exports = router;
