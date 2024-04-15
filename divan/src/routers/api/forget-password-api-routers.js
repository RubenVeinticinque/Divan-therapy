const { Router } = require("express");
const router = Router();

const {
  forgetPasswordProccess,
} = require("../../Controllers/api/forget-password-api-controller");
const {
  validateUserRegister,
} = require("../../middleware/validate-register-middleware");

router.post(
  "/api/forget-password",
  validateUserRegister[2],
  forgetPasswordProccess
);

module.exports = router;
