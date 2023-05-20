// required dependencies
const router = require("express").Router();
const userRoutes = require("./userRoutes");
const gameRoutes = require("./gameRoutes");

// establish routes
router.use("/users", userRoutes);
router.use("/games", gameRoutes);

module.exports = router;
