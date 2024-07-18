import { where } from "sequelize";
import db from "../models";
let handleCreateSpecialtyService = async (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("check data:", inputData);
      if (
        !inputData ||
        !inputData.name ||
        !inputData.image ||
        !inputData.contentMarkDown ||
        !inputData.contentHTML
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required input",
        });
      } else {
        // let translatedText = await translate(inputData.name, "en");
        await db.Speciality.create({
          descriptionHTML: inputData.contentHTML,
          descriptionContent: inputData.contentMarkDown,
          image: inputData.image,
          nameVi: inputData.name,
          nameEn: inputData.name,
        });
        resolve({
          errCode: 0,
          errMessage: "OK",
        });
      }
    } catch (error) {
      console.log(error);
      resolve({
        errCode: 2,
        errMessage: "Error from Server",
      });
    }
  });
};

let handleGetSpecialtyService = async (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (inputId === "ALL") {
        let getSpecialty = await db.Speciality.findAll({
          raw: "true",
          attributes: {
            exclude: ["createdAt", "updatedAt", "descriptionContent"],
          },
        });
        getSpecialty.forEach((specialty) => {
          if (specialty.image) {
            specialty.image = new Buffer(specialty.image, "base64").toString(
              "binary"
            );
          }
        });
        resolve({
          errCode: 0,
          errMessage: "OK",
          data: getSpecialty,
        });
      } else {
        let getSpecialty = await db.Speciality.findOne({
          raw: "true",
          attributes: {
            exclude: ["createdAt", "updatedAt", "descriptionContent"],
          },
          where: {
            id: inputId,
          },
        });
        if (getSpecialty.image) {
          getSpecialty.image = new Buffer(
            getSpecialty.image,
            "base64"
          ).toString("binary");
        }
        resolve({
          errCode: 0,
          errMessage: "OK",
          data: getSpecialty,
        });
      }
    } catch (error) {
      console.log(error);
      resolve({
        errCode: 2,
        errMessage: "Error from Server",
      });
    }
  });
};

module.exports = {
  handleCreateSpecialtyService: handleCreateSpecialtyService,
  handleGetSpecialtyService: handleGetSpecialtyService,
};
