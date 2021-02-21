const express = require("express");
const AppointmentController = require("../controllers/appointments");
const checkPermission = require("../middlewares/checkPermission");
const PermissionsList = require("../permissions/permissions");
const router = express.Router();

router.post(
  "/",
  checkPermission(PermissionsList.CREATE_APPOINTMENTS),
  AppointmentController.createNewAppointment
);
router.get(
  "/",
  checkPermission(PermissionsList.VIEW_MY_APPOINTMENTS),
  AppointmentController.getMyAppointments
);
router.get(
  "/available-intervals",
  checkPermission(PermissionsList.VIEW_AVAILABLE_INTERVALS),
  AppointmentController.getAvailableSlots
);
router.post(
  "/reject",
  checkPermission(PermissionsList.REJECT_APPOINTMENT),
  AppointmentController.rejectAppointment
);
router.post(
  "/accept",
  checkPermission(PermissionsList.ACCEPT_APPOINTMENT),
  AppointmentController.acceptAppointment
);
router.post(
  "/cancel",
  checkPermission(PermissionsList.CANCEL_APPOINTMENT),
  AppointmentController.cancelAppointment
);

module.exports.appointmentsRoutes = router;
