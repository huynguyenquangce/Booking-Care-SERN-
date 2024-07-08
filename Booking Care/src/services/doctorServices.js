import { where } from "sequelize";
import db from "../models";
import { raw } from "body-parser";
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

// let PostDoctorInfoService = (data) => {
//   console.log("Check data", data.actions);
//   return new Promise(async (resolve, reject) => {
//     try {
//       if (!data || !data.action) {
//         resolve({
//           errCode: 1,
//           errMessage: "Missing Data",
//         });
//       } else {
//         if (data.actions === "CREATE") {
//           await db.MarkDown.create({
//             contentHTML: data.contentHTML,
//             contentMarkDown: data.contentMarkDown,
//             description: data.description,
//             doctorId: data.doctorId,
//           });
//           resolve({
//             errCode: 0,
//             errMessage: "Create OK",
//           });
//         }
//       }
//       // contentHTML: data.contentHTML,
//       // contentMarkDown: data.contentMarkDown,
//       // description: data.description,
//       // doctorId: data.doctorId,
//       else if(data.actions === "UPDATE"){
//         await db.MarkDown.findOne({
//           where: { doctorId: data.doctorId },
//         });
//         resolve({
//           errCode: 0,
//           errMessage: "Update OK",
//         });
//       }
//       }
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

let PostDoctorInfoService = (data) => {
  console.log("Check data", data.actions);
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
          resolve({
            errCode: 0,
            errMessage: "Create OK",
          });
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
            resolve({
              errCode: 0,
              errMessage: "Update OK",
            });
          } else {
            resolve({
              errCode: 2,
              errMessage: "Doctor not found",
            });
          }
        }
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
          ],
          raw: true,
          nest: true,
        });
        doctorInfo.image = new Buffer(doctorInfo.image, "base64").toString(
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
};
