const { Router } = require("express");
const {
  therapistDestroy,
} = require("../../../Controllers/api/therapist-destroy-api-controller");
const router = Router();

router.delete("/api/therapist-destroy", therapistDestroy);

module.exports = router;
