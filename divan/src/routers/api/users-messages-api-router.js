const { Router } = require("express");
const {
  userMessage,
} = require("../../Controllers/api/users-messages-api-controller");
const validateUsersMessages = require("../../middleware/validate-users-messages-middleware");
const router = Router();

router.post("/api/user-message", validateUsersMessages, userMessage);

module.exports = router;
