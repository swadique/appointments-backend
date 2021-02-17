const AppointmentModel = require("../db/appointment/appointment.model");
const appointmentsHelper = require("../helper/appointmentsHelper");
const HttpCodes = require("../constants/HttpCode");
const ResponseMessages = require("../constants/ResponseMessage");
const AppointmentStatus = require("../constants/AppointmentStatus");

async function createNewAppointment(req, res, next) {
  try {
    const buyer = req.userId || "";
    const {
      seller,
      duration,
      startTime,
      endTime,
      appointmentDate,
      slotId,
    } = req.body;
    const createdAppointment = await AppointmentModel.createNewAppointment({
      seller,
      duration,
      startTime,
      endTime,
      appointmentDate,
      slotId,
      buyer,
    });
    res.status(HttpCodes.CREATED).send(JSON.stringify(createdAppointment));
  } catch (e) {
    console.log(e);
    res
      .status(HttpCodes.INTERNAL_SERVER_ERROR)
      .send(ResponseMessages.FAILED_OPERATION);
  }
}
async function getAppointments(req, res, next) {
  try {
    const {
      seller,
      duration,
      startTime,
      endTIme,
      appointmentDate,
      slotId,
      buyer,
      status = [AppointmentStatus.PENDING],
      page,
      limit,
    } = req.query;
    const appointments = await AppointmentModel.getAppointments({
      seller,
      status,
      duration,
      startTime,
      endTIme,
      slotId,
      buyer,
      page,
      limit,
      appointmentDate,
    });
    res.status(HttpCodes.OK).send(appointments);
  } catch (e) {
    console.log(e.message);
    res
      .status(HttpCodes.INTERNAL_SERVER_ERROR)
      .send(ResponseMessages.FAILED_OPERATION);
  }
}
async function getAvailableSlots(req, res, next) {
  try {
    const { appointmentDate, seller, slotId } = req.query;
    const availableSlots = await appointmentsHelper.getAvailableSlots(
      seller,
      slotId,
      appointmentDate
    );
    res.status(HttpCodes.OK).send(availableSlots);
  } catch (e) {
    console.log(e.message);
    res
      .status(HttpCodes.INTERNAL_SERVER_ERROR)
      .send(ResponseMessages.FAILED_OPERATION);
  }
}

const AppointmentController = {
  createNewAppointment,
  getAvailableSlots,
  getAppointments,
};

module.exports = AppointmentController;
