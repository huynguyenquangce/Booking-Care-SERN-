import db from "../models";
import {
  getTopDoctorService,
  getDoctorSelectService,
} from "../services/doctorServices";
let handleGetTopDoctor = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;
  // Validate
  try {
    let respone = await getTopDoctorService(+limit);
    return res.status(200).json({
      errCode: respone.errCode,
      errMessage: respone.errMessage,
      data: respone.data,
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let handleGetDoctorSelect = async (req, res) => {
  try {
    let response = await getDoctorSelectService();
    return res.status(200).json({
      errCode: response.errCode,
      errMessage: response.errMessage,
      data: response.data,
    });
  } catch (error) {
    console.log(err);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
module.exports = {
  handleGetTopDoctor: handleGetTopDoctor,
  handleGetDoctorSelect: handleGetDoctorSelect,
};
