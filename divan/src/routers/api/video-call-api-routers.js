const { Router } = require("express");
const router = Router();
const {
  videoCall,
} = require("../../Controllers/api/video-call-api-controller");

router.post("/api/video-call", videoCall);

module.exports = router;
