// required dependencies
const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./homeroutes");

// establish routes ... does this order matter
router.use("/", homeRoutes);
router.use("/api", apiRoutes);

module.exports = router;
