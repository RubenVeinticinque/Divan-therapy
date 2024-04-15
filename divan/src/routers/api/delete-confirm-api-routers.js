const { Router } = require("express");
const {
  userDestroyConfirm,
  userDestroy,
} = require("../../Controllers/api/delete-confirm-api-controller");
const router = Router();

router.post("/api/delete-confirm", userDestroyConfirm);
router.post("/api/user-delete", userDestroy);

module.exports = router;
