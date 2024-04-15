const { Router } = require("express");
const {
  newPasswordProccess,
} = require("../../Controllers/api/new-password-change-api-controller");
const {
  validateUserRegister,
} = require("../../middleware/validate-register-middleware");
const router = Router();

router.post(
  "/api/new-password-change",
  validateUserRegister[3],
  validateUserRegister[4],
  newPasswordProccess
);

module.exports = router;
