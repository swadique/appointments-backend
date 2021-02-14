const AppointmentModel = require("../db/appointment/appointment.model");
const UserModel = require("../db/user/user.model");

function getAvailableSlots(sellerId, slotId, date) {
  try {
    const { startTime, endTime, duration } = UserModel.getTimeSlot(
      sellerId,
      slotId
    );
    // const scheduledAppointments = AppointmentModel.
    const appointments = AppointmentModel.getAppointments({ sellerId, slotId });
    return appointments;
  } catch (e) {
    throw e;
  }
}

const appointmentsHelper = {
  getAvailableSlots,
};

module.exports = appointmentsHelper;
