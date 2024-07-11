import db from "../models";
import bcrypt, { hash } from "bcrypt";
let handleBookingPatientService = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !inputData ||
        !inputData.doctorId ||
        !inputData.timeType ||
        !inputData.date ||
        !inputData.firstName ||
        !inputData.email
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let patient = await db.Users.findOrCreate({
          where: { email: inputData.email },
          raw: true,
          defaults: {
            roleid: "R3",
            firstName: inputData.firstName,
            email: inputData.email,
            address: inputData.address,
            gender: inputData.gender,
            phoneNumber: inputData.phonenumber,
          },
        });
        if (patient && patient[0]) {
          await db.Booking.findOrCreate({
            where: { patientId: patient[0].id },
            defaults: {
              statusId: "S1",
              doctorId: inputData.doctorId,
              patientId: patient[0].id,
              //   patientId: inputData.patientId,
              date: inputData.date,
              timeType: inputData.timeType,
            },
          });
        }
        resolve({
          errCode: 0,
          errMessage: "OK",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  handleBookingPatientService: handleBookingPatientService,
};
