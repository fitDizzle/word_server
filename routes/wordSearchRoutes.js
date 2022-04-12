const router = require("express").Router();
const wordSearchController = require("../controllers/wordSearchController");

router.route("/relative/:letters").get(wordSearchController.findRelativeWords); // Get suggested Words
router.route("/filter/:letters").get(wordSearchController.getAllWords); // Get suggested Words

module.exports = router;
