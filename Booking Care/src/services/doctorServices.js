import { where } from "sequelize";
import db from "../models";
import { raw } from "body-parser";
require("dotenv").config();
let getTopDoctorService = (limitInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctor = await db.Users.findAll({
        limit: limitInput,
        where: { roleid: "R2" },
        order: [["createdAt", "DESC"]],
        attributes: { exclude: ["password"] },
        include: [
          {
            model: db.Allcode,
            as: "positionData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.Allcode,
            as: "genderData",
            attributes: ["valueEn", "valueVi"],
          },
        ],
        raw: true,
        nest: true,
      });
      resolve({
        errCode: 0,
        errMessage: "OK",
        data: doctor,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let getDoctorSelectService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctorSelect = await db.Users.findAll({
        where: { roleid: "R2" },
        attributes: { exclude: ["password", "image"] },
      });
      resolve({
        errCode: 0,
        errMessage: "OK",
        data: doctorSelect,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let PostDoctorInfoService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data || !data.actions) {
        // Corrected 'action' to 'actions'
        resolve({
          errCode: 1,
          errMessage: "Missing Data",
        });
      } else {
        if (data.actions === "CREATE") {
          await db.MarkDown.create({
            contentHTML: data.contentHTML,
            contentMarkDown: data.contentMarkDown,
            description: data.description,
            doctorId: data.doctorId,
          });
          // resolve({
          //   errCode: 0,
          //   errMessage: "Create OK",
          // });
        } else if (data.actions === "UPDATE") {
          // Moved the else if inside the main if-else block
          let doctor = await db.MarkDown.findOne({
            where: { doctorId: data.doctorId },
            raw: false,
          });
          if (doctor) {
            // Updating the fields manually
            doctor.contentHTML = data.contentHTML;
            doctor.contentMarkDown = data.contentMarkDown;
            doctor.description = data.description;
            await doctor.save(); // Save the changes
            // resolve({
            //   errCode: 0,
            //   errMessage: "Update OK",
            // });
          } else {
            resolve({
              errCode: 2,
              errMessage: "Doctor not found",
            });
          }
        }
      }
      // for insert to doctor_info table
      let doctorInfo = await db.Doctor_Info.findOne({
        where: {
          doctorId: data.doctorId,
        },
        raw: false,
      });
      // for saving
      if (!doctorInfo) {
        console.log("Check point");
        await db.Doctor_Info.create({
          doctorId: data.doctorId,
          priceId: data.priceId,
          provinceId: data.provinceId,
          paymentId: data.paymentId,
          addressClinic: data.address_clinic,
          nameClinic: data.nameClinic,
          note: data.note,
        });
        resolve({
          errCode: 0,
          errMessage: "Insert OK to doctor_info table",
        });
      } else {
        doctorInfo.doctorId = data.doctorId;
        doctorInfo.priceId = data.priceId;
        doctorInfo.provinceId = data.provinceId;
        doctorInfo.paymentId = data.paymentId;
        doctorInfo.addressClinic = data.address_clinic;
        doctorInfo.nameClinic = data.nameClinic;
        doctorInfo.note = data.note;
        await doctorInfo.save(); // Save the changes
        resolve({
          errCode: 1,
          errMessage: "Fail to insert to doctor info",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getDoctorInfoService = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing Data",
          data: [],
        });
      } else {
        let doctorInfo = await db.Users.findOne({
          where: { id: inputId },
          attributes: { exclude: ["password"] },
          include: [
            {
              model: db.Allcode,
              as: "positionData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.MarkDown,
              attributes: [
                "contentHTML",
                "contentMarkDown",
                "description",
                "doctorId",
              ],
            },
            {
              model: db.Doctor_Info,
              attributes: [
                "priceId",
                "provinceId",
                "paymentId",
                "addressClinic",
                "nameClinic",
                "note",
              ],
              as: "InfoTableData",
              include: [
                {
                  model: db.Allcode,
                  attributes: ["valueEn", "valueVi"],
                  as: "priceInfo",
                },
                {
                  model: db.Allcode,
                  attributes: ["valueEn", "valueVi"],
                  as: "provinceInfo",
                },
                {
                  model: db.Allcode,
                  attributes: ["valueEn", "valueVi"],
                  as: "paymentInfo",
                },
              ],
            },
          ],
          raw: true,
          nest: true,
        });
        // get more info doctor in doctor_info table
        ////////////////////
        doctorInfo.image = Buffer.from(doctorInfo.image, "base64").toString(
          "binary"
        );
        resolve({
          errCode: 0,
          errMessage: "OK",
          data: doctorInfo,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let createDoctorScheduleService = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputData && !inputData.data) {
        resolve({
          errCode: 1,
          errMessage: "Missing Data",
        });
      } else {
        if (inputData.data && inputData.data.length > 0) {
          inputData.data.map((item) => {
            item.maxNumber = process.env.MAX_NUMBER;
            return item;
          });
          // Process data to insert different with two record in Schedule table
          let existData = await db.Schedule.findAll({
            where: {
              doctorId: inputData.data[0].doctorId,
              date: inputData.data[0].date,
              timeType: inputData.data.map((data) => data.timeType),
            },
          });
          let existingTimeTypes = new Set(
            existData.map((data) => data.timeType)
          );

          // Step 3: Filter out the existing data from the input data
          let newData = inputData.data.filter(
            (data) => !existingTimeTypes.has(data.timeType)
          );
          if (newData.length > 0) {
            await db.Schedule.bulkCreate(newData);
            resolve({
              errCode: 0,
              errMessage: "OK",
            });
          }
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getDoctorScheduleService = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let inputId = inputData.id;
      let inputDate = inputData.date;
      let respone = await db.Schedule.findAll({
        where: {
          doctorId: inputId,
          date: inputDate,
        },
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: db.Allcode,
            as: "timeTypeData",
            attributes: ["valueEn", "valueVi"],
          },
        ],
        raw: true,
        nest: true,
      });
      console.log(respone);
      resolve({
        errCode: 0,
        errMessage: "OK",
        data: respone,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let getDoctorShortInfoService = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing Data",
          data: [],
        });
      } else {
        let doctorInfo = await db.Users.findOne({
          where: { id: inputId },
          attributes: { exclude: ["password", "createdAt", "updatedAt"] },
          include: [
            {
              model: db.Allcode,
              as: "positionData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.MarkDown,
              attributes: ["description"],
            },
            {
              model: db.Doctor_Info,
              attributes: [
                // "priceId",
                // "provinceId",
                // "paymentId",
                "addressClinic",
                "nameClinic",
                "note",
              ],
              as: "InfoTableData",
              include: [
                {
                  model: db.Allcode,
                  attributes: ["valueEn", "valueVi"],
                  as: "priceInfo",
                },
                {
                  model: db.Allcode,
                  attributes: ["valueEn", "valueVi"],
                  as: "provinceInfo",
                },
                {
                  model: db.Allcode,
                  attributes: ["valueEn", "valueVi"],
                  as: "paymentInfo",
                },
              ],
            },
          ],
          raw: true,
          nest: true,
        });
        // get more info doctor in doctor_info table
        ////////////////////
        doctorInfo.image = Buffer.from(doctorInfo.image, "base64").toString(
          "binary"
        );
        resolve({
          errCode: 0,
          errMessage: "OK",
          data: doctorInfo,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  getTopDoctorService: getTopDoctorService,
  getDoctorSelectService: getDoctorSelectService,
  PostDoctorInfoService: PostDoctorInfoService,
  getDoctorInfoService: getDoctorInfoService,
  createDoctorScheduleService: createDoctorScheduleService,
  getDoctorScheduleService: getDoctorScheduleService,
  getDoctorShortInfoService: getDoctorShortInfoService,
};
