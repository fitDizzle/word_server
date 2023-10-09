const router = require("express").Router();
const wordSearchController = require("../controllers/wordSearchController");

router.route("/relative/:letters").get(wordSearchController.findRelativeWords);
router.route("/filter/:letters").get(wordSearchController.getAllWords);

module.exports = router;
