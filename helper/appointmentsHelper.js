const AppointmentModel = require("../db/appointment/appointment.model");
const UserModel = require("../db/user/user.model");
const moment = require("moment");

async function getAvailableSlots(seller, appointmentDate) {
  try {
    const slotId = moment(appointmentDate).day();
    let { startTime, endTime, duration, status } = await UserModel.getTimeSlot(
      seller,
      slotId
    );
    if (!startTime || !endTime || !duration || status === "disabled") {
      return [];
    }
    startTime = moment(startTime, "HH:mm");
    endTime = moment(endTime, "HH:mm");
    let slotTime = startTime;
    let availableTimeSlots = [];
    // const scheduledAppointments = AppointmentModel.
    const appointments = await AppointmentModel.getAppointments({
      seller,
      slotId,
      appointmentDate,
    });

    while (slotTime < endTime) {
      let slotEnd = slotTime.clone();
      slotEnd.add(duration, "minutes");
      if (!isBookedSlot(slotTime, slotEnd, appointments)) {
        availableTimeSlots.push({
          startTime: slotTime.format("HH:mm"),
          endTime: slotEnd.format("HH:mm"),
          slotId: slotId,
        });
      }
      slotTime.add(duration, "minutes");
    }
    console.log(availableTimeSlots);
    return availableTimeSlots;
  } catch (e) {
    throw e;
  }
}
function isPastSlot(startTime) {
  return moment("HH:mm").isAfter(startTime);
}
function isBookedSlot(startTime, endTime, appointments) {
  return appointments.some((appointment) => {
    const bool =
      (moment(appointment.startTime, "HH:mm").isBefore(startTime) &&
        moment(appointment.endTime, "HH:mm").isAfter(startTime)) ||
      (moment(appointment.startTime, "HH:mm").isBefore(endTime) &&
        moment(appointment.endTime, "HH:mm").isAfter(endTime)) ||
      (moment(appointment.startTime, "HH:mm").isSame(startTime) &&
        moment(appointment.endTime, "HH:mm").isSame(endTime));
    console.log(bool);
    return bool;
  });
}

const appointmentsHelper = {
  getAvailableSlots,
};

module.exports = appointmentsHelper;
