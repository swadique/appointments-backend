const AppointmentModel = require("../db/appointment/appointment.model");
const appointmentsHelper = require("../helper/appointmentsHelper");

async function createNewAppointment(req, res, next) {
  const buyerId = req.userId ||  "";
  const { sellerId, duration, startTime, slotId } = req.body;
  const createdAppointment = await AppointmentModel.createNewAppointment({
    sellerId,
    duration,
    startTime,
    slotId,
    buyerId,
  });
  console.log(createdAppointment);
}
async function getAvailableSlots(req, res, next) {
  const { date, sellerId, slotId } = req.query;
  const availableSlots = await appointmentsHelper.getAvailableSlots(
    sellerId,
    slotId,
    date
  );
  console.log(availableSlots);
}

const AppointmentController = { createNewAppointment, getAvailableSlots };

module.exports = AppointmentController;
