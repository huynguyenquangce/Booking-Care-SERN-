import db from "../models";
import patientService from "../services/patientServices";
let handleBookingPatient = async (req, res) => {
  if (req && req.body) {
    let booking = await patientService.handleBookingPatientService(req.body);
    return res.status(200).json({
      errCode: booking.errCode,
      errMessage: booking.errMessage,
    });
  } else {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let verifyEmailBooking = async (req, res) => {
  console.log("check req", req.body);
  if (req && req.body) {
    let result = await patientService.verifyEmailBookingService(req.body);
    return res.status(200).json({
      errCode: result.errCode,
      errMessage: result.errMessage,
    });
  } else {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

module.exports = {
  handleBookingPatient: handleBookingPatient,
  verifyEmailBooking: verifyEmailBooking,
};
