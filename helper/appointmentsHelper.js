const AppointmentModel = require("../db/appointment/appointment.model");
const UserModel = require("../db/user/user.model");
const moment = require("moment");

async function getAvailableSlots(seller, slotId, appointmentDate) {
  try {
    let { startTime, endTime, duration } = await UserModel.getTimeSlot(
      seller,
      slotId
    );
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
    function isBookedSlot(startTime, endTime, appointments) {
      return appointments.some((appointment) => {
        // console.log(
        //   moment(appointment.startTime, "HH:mm"),
        //   startTime,
        //   moment(appointment.endTime, "HH:mm"),
        //   endTime
        // );
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

    while (slotTime < endTime) {
      let slotEnd = slotTime.clone();
      slotEnd.add(duration, "minutes");
      if (!isBookedSlot(slotTime, slotEnd, appointments)) {
        availableTimeSlots.push({
          startTime: slotTime.format("HH:mm"),
          endTime: slotEnd.format("HH:mm"),
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

const appointmentsHelper = {
  getAvailableSlots,
};

module.exports = appointmentsHelper;
