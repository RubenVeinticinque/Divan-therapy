const { Router } = require("express");
const { processLogin } = require("../../Controllers/api/login-api-controller");
const validateLogin = require("../../middleware/validate-login-middleware");
const router = Router();

router.post("/api/login", validateLogin, processLogin);

module.exports = router;
