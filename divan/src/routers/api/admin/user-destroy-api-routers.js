const { Router } = require("express");
const {
  userDestroy,
} = require("../../../Controllers/api/user-destroy-api-controller");

const router = Router();

router.delete("/api/user-destroy", userDestroy);

module.exports = router;
