const { Router } = require("express");
const { profile } = require("../../Controllers/api/profile-api-controller");
const router = Router();

router.post("/api/profile", profile);

module.exports = router;
