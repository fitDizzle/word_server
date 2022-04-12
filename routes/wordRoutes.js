const router = require("express").Router();
const wordController = require("../controllers/wordController")

router.route("/check/:words").get(wordController.validateWord)

module.exports = router;
