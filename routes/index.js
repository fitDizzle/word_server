const router = require('express').Router();

router.use('/gameplay/word', require("./wordRoutes"));
router.use("/search", require("./wordSearchRoutes"));

module.exports = router;