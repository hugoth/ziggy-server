const router = require("express").Router();

// - Plural is a pattern
router.use("/admins", require("./admins/routes"));
router.use("/users", require("./users/routes"));
router.use("/pets", require("./pets/routes"));
router.use("/meals", require("./meals/routes"));
router.use("/createcustomer", require("./stripe/routes"));

module.exports = router;
