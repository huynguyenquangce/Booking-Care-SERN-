import db from "../models";
require("dotenv").config();
import bcrypt, { hash } from "bcrypt";
import emailService from "./emailService";
import { v4 as uuidv4 } from "uuid";
let buildEmailUrl = (InputDoctorId, inputToken) => {
  let url = `${process.env.REACT_URL}/verify-email?token=${inputToken}&doctorId=${InputDoctorId}`;
  return url;
};
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
        let token = uuidv4();
        emailService.sendEmailBooking({
          email: inputData.email,
          name: inputData.firstName,
          date: inputData.date,
          time: inputData.timeType,
          doctorName: inputData.doctorName,
          urlLink: buildEmailUrl(inputData.doctorId, token),
        });
        let patient = await db.Users.findOrCreate({
          where: { email: inputData.email },
          raw: true,
          defaults: {
            roleid: "R3",
            firstName: inputData.firstName,
            email: inputData.email,
            address: inputData.address,
            gender: inputData.gender,
            phoneNumber: inputData.phoneNumber,
          },
        });
        if (patient && patient[0]) {
          await db.Booking.findOrCreate({
            where: { patientId: patient[0].id },
            defaults: {
              statusId: "S1",
              doctorId: inputData.doctorId,
              patientId: patient[0].id,
              date: inputData.date,
              timeType: inputData.timeType,
              token: token,
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
