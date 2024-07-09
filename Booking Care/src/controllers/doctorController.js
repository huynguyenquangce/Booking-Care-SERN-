import db from "../models";
import {
  getTopDoctorService,
  getDoctorSelectService,
  PostDoctorInfoService,
  getDoctorInfoService,
  createDoctorScheduleService,
  getDoctorScheduleService,
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

let handlePostDoctorInfo = async (req, res) => {
  try {
    console.log("check body", req.body);
    let response = await PostDoctorInfoService(req.body);
    return res.status(200).json({
      errCode: response.errCode,
      errMessage: response.errMessage,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let handleGetDoctorInfo = async (req, res) => {
  try {
    let response = await getDoctorInfoService(req.query.id);
    return res.status(200).json({
      errCode: response.errCode,
      errMessage: response.errMessage,
      data: response.data,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let handleCreateDoctorSchedule = async (req, res) => {
  try {
    console.log("check body", req.body);
    let response = await createDoctorScheduleService(req.body);
    return res.status(200).json({
      errCode: response.errCode,
      errMessage: response.errMessage,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let handleGetDoctorSchedule = async (req, res) => {
  try {
    console.log("check query", req.query);
    if (!req.query.id && !req.query.date) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Missing Input Data",
      });
    } else {
      let response = await getDoctorScheduleService(req.query);
      return res.status(200).json({
        errCode: response.errCode,
        errMessage: response.errMessage,
        data: response.data,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
module.exports = {
  handleGetTopDoctor: handleGetTopDoctor,
  handleGetDoctorSelect: handleGetDoctorSelect,
  handlePostDoctorInfo: handlePostDoctorInfo,
  handleGetDoctorInfo: handleGetDoctorInfo,
  handleCreateDoctorSchedule: handleCreateDoctorSchedule,
  handleGetDoctorSchedule: handleGetDoctorSchedule,
};
