const express = require("express");
const AppointmentController = require("../controllers/appointments");
const checkPermission = require("../middlewares/checkPermission");
const PermissionsList = require("../permissions/permissions");
const router = express.Router();

router.post("/", AppointmentController.createNewAppointment);
router.get(
  "/",
  checkPermission(PermissionsList.CREATE_APPOINTMENTS),
  AppointmentController.getAppointments
);
router.get(
  "/available-intervals",
  checkPermission(PermissionsList.VIEW_AVAILABLE_INTERVALS),
  AppointmentController.getAvailableSlots
);

module.exports.appointmentsRoutes = router;
