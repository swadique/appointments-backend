const { date } = require("joi");
const { Types } = require("mongoose");
const AppointmentStatus = require("../../constants/AppointmentStatus");
const moment = require("moment");

async function createNewAppointment({
  buyer,
  seller,
  startTime,
  endTime,
  appointmentDate,
  duration,
  slotId,
}) {
  try {
    console.log(buyer, seller, startTime, endTime, duration, slotId);
    const activeAppointments = await this.getAppointments({
      seller,
      slotId,
      startTime,
      endTime,
      appointmentDate,
      status: [AppointmentStatus.PENDING, AppointmentStatus.ACCEPTED],
    });
    if (activeAppointments.length > 0) {
      throw new Error("Appointment already booked");
    }
    const newAppointment = await this.create({
      buyer,
      seller,
      startTime,
      endTime,
      appointmentDate,
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
  buyer,
  seller,
  slotId,
  startTime,
  endTime,
  status = [],
  appointmentDate,
  page = 0,
  limit = 5,
}) {
  try {
    const skipPage = page * limit;
    let query = {};
    if (seller) {
      query["seller"] = seller;
    }
    if (buyer) {
      query["buyer"] = buyer;
    }
    if (slotId) {
      query["slotId"] = slotId;
    }
    if (startTime) {
      query["startTime"] = startTime;
    }
    if (endTime) {
      query["startTime"] = startTime;
    }
    if (status.length > 0) {
      query["status"] = { $in: status };
    }
    if (appointmentDate) {
      query["appointmentDate"] = {
     
        $gte: moment(appointmentDate).clone().startOf("day").toISOString(),
        $lte: moment(appointmentDate).clone().endOf("day").toISOString(),
      };
    }
    const appointments = await this.find(query)
      .populate("seller")
      .limit(limit)
      .skip(skipPage);
    return appointments;
  } catch (e) {
    throw e;
  }
}

module.exports = { createNewAppointment, getAppointments };
