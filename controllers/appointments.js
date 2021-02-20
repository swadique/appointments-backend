const AppointmentModel = require("../db/appointment/appointment.model");
const appointmentsHelper = require("../helper/appointmentsHelper");
const HttpCodes = require("../constants/HttpCode");
const ResponseMessages = require("../constants/ResponseMessage");
const AppointmentStatus = require("../constants/AppointmentStatus");
const UsersList = require("../permissions/usersList");

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
async function getMyAppointments(req, res, next) {
  try {
    const {
      duration,
      startTime,
      endTIme,
      appointmentDate,
      slotId,
      status,
      page,
      limit,
    } = req.query;
    
    let buyer;
    let seller;
    const userType = req.userType;
    if (userType === UsersList.BUYER) {
      buyer = req.userId;
    } else {
      seller = req.userId;
    }
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
    const { appointmentDate, seller } = req.query;
    const availableSlots = await appointmentsHelper.getAvailableSlots(
      seller,
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
  getMyAppointments,
};

module.exports = AppointmentController;
