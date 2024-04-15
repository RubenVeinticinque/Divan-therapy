const { Router } = require("express");
const {
  therapists,
  allMessages,
} = require("../../Controllers/api/therapists-api-controller");

const router = Router();

router.post("/api/all-therapists", therapists);
router.post("/api/all-messages", allMessages);

module.exports = router;
