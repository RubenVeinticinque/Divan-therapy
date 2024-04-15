const { Router } = require("express");
const {
  allContacts,
} = require("../../../Controllers/api/all-contacts-api-controller");
const router = Router();

router.post("/api/contacts", allContacts);

module.exports = router;
