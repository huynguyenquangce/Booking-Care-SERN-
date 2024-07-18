import db from "../models";
import specialtyService from "../services/specialtyService";
let handleCreateSpecialty = async (req, res) => {
  if (req && req.body) {
    let response = await specialtyService.handleCreateSpecialtyService(
      req.body
    );
    return res.status(200).json({
      errCode: response.errCode,
      errMessage: response.errMessage,
    });
  } else {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let handleGetSpecialty = async (req, res) => {
  let inputId = req.query.id;
  let response = await specialtyService.handleGetSpecialtyService(inputId);
  if (response && response.errCode === 0) {
    return res.status(200).json({
      errCode: response.errCode,
      errMessage: response.errMessage,
      specialtyData: response.data,
    });
  } else {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

module.exports = {
  handleCreateSpecialty: handleCreateSpecialty,
  handleGetSpecialty: handleGetSpecialty,
};
