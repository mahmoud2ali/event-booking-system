const router = require("express").Router();
const {getAllEvents, bookEvent, cancelBooking, adminCreateEvent, adminDeleteEvent, updateEvent } = require("../controllers/eventController");
const {protect, adminOnly} = require("../middleware/authMiddleware")
const {imageUpload} = require("../middleware/imageUpload")

router.get("/", getAllEvents);
router.post("/book/:eventId", protect ,bookEvent);
router.delete('/book/:eventId', protect, cancelBooking); 

router.post("/admin/create",protect , adminOnly , imageUpload.single('image'),adminCreateEvent);
router.put("/admin/update/:eventId",protect , adminOnly , imageUpload.single('image'), updateEvent);
router.delete("/admin/delete/:eventId",protect , adminOnly ,adminDeleteEvent);

module.exports = router;
