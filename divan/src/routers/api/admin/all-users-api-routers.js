const { Router } = require("express");
const {
  allUsers,
} = require("../../../Controllers/api/all-users-api-controller");
const router = Router();

router.post("/api/users", allUsers);

module.exports = router;
