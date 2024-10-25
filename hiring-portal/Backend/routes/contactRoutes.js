const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

router.post("/contact", contactController.postContact);
router.get("/contact", contactController.getContact);

router.post("/email", contactController.sendEmail);

module.exports = router;
