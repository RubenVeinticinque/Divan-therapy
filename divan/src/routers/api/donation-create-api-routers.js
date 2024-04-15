const { Router } = require("express");
const {
  donationCreate,
} = require("../../Controllers/api/donation-create-api-controller");
const router = Router();

router.post("/api/donation-create", donationCreate);

module.exports = router;
