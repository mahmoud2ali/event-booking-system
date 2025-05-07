const router = require("express").Router();
const {getAllEvents, getSingleEvent, adminCreateEvent, adminDeleteEvent, updateEvent } = require("../controllers/eventController");
const {protect, adminOnly} = require("../middleware/authMiddleware")
const {imageUpload} = require("../middleware/imageUpload")


router.get("/", getAllEvents);
router.get("/:eventId", getSingleEvent);

router.post("/admin/create-event",protect , adminOnly , imageUpload.single('image'),adminCreateEvent);
router.put("/admin/update-event/:eventId",protect , adminOnly , imageUpload.single('image'), updateEvent);
router.delete("/admin/delete-event/:eventId",protect , adminOnly ,adminDeleteEvent);

module.exports = router;
