const { Router } = require("express");
const { contact } = require("../../Controllers/api/contact-api-controller");
const validateContact = require("../../middleware/validate-contact-middleware");
const router = Router();

router.post("/api/contact", validateContact, contact);

module.exports = router;
