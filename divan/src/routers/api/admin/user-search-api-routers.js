const { Router } = require("express");

const {
  validateUserSearchEdit,
} = require("../../../middleware/validate-search-middleware");
const {
  userSearchProccess,
} = require("../../../Controllers/api/user-search-api-controller");
const router = Router();

router.post("/api/user-search", validateUserSearchEdit, userSearchProccess);

module.exports = router;
