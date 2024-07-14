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

module.exports = {
  handleCreateSpecialty: handleCreateSpecialty,
};
