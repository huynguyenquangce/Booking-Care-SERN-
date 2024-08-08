import db from "../models";
require("dotenv").config();
import bcrypt, { hash } from "bcrypt";
import emailService from "./emailService";
import { v4 as uuidv4 } from "uuid";
import { raw } from "body-parser";
let buildEmailUrl = (InputDoctorId, inputToken) => {
  let url = `${process.env.REACT_URL}/verify-email?token=${inputToken}&doctorId=${InputDoctorId}`;
  return url;
};
let handleBookingPatientService = (inputData) => {
  console.log(inputData);
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !inputData ||
        !inputData.doctorId ||
        !inputData.timeType ||
        !inputData.date ||
        !inputData.firstName ||
        !inputData.email ||
        !inputData.time
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
          language: inputData.language,
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
              timeType: inputData.time,
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

let verifyEmailBookingService = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      {
        if (!inputData || !inputData.inputToken || !inputData.inputDoctorId) {
          resolve({
            errCode: 1,
            errMessage: "Missing parameter",
          });
        } else {
          let result = await db.Booking.findOne({
            where: {
              token: inputData.inputToken,
              doctorId: inputData.inputDoctorId,
              statusId: "S1",
            },
            raw: false,
          });
          if (result) {
            result.statusId = "S2";
            await result.save();
            resolve({
              errCode: 0,
              errMessage: "Lịch hẹn đã được xác nhận thành công.",
            });
          } else {
            resolve({
              errCode: 2,
              errMessage:
                "Lịch hẹn không tồn tại hoặc đã được xác nhận thành công.",
            });
          }
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleBookingPatientService: handleBookingPatientService,
  verifyEmailBookingService: verifyEmailBookingService,
};
