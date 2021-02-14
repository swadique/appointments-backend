const express = require("express");
const AppointmentController = require("../controllers/appointments");
const router = express.Router();

router.post("/", AppointmentController.createNewAppointment);
router.get("/", AppointmentController.getAvailableSlots);

module.exports.appointmentsRoutes = router;
