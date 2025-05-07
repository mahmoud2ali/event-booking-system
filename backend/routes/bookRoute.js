const router = require("express").Router();
const {bookEvent} = require("../controllers/bookController");
const {protect} = require("../middleware/authMiddleware")

router.put("/:eventId", protect ,bookEvent);

module.exports = router;