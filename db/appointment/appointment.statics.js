const AppointmentModel = require("./appointment.model");

async function createNewAppointment({
  buyerId,
  sellerId,
  startTime,
  duration,
  slotId,
}) {
  const scheduledAppointments = await this.find({
    sellerId,
  }).exec();
  //   if (scheduledAppointments.length) {
  //     throw new Error("Conflict");
  //   }
  try {
    const newAppointment = await this.create({
      buyerId,
      sellerId,
      startTime,
      duration,
      slotId,
    });
    return newAppointment;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function getAppointments({
  buyerId,
  sellerId,
  slotId,
  date,
  status = [],
  page = 0,
  limit = 5,
}) {
  try {
    const skipPage = page * limit;
    let query = { sellerId };
    const appointments = await this.find(query);
    return appointments;
  } catch (e) {
    throw e;
  }
}

module.exports = { createNewAppointment, getAppointments };
