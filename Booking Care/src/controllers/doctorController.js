import db from "../models";
import { getTopDoctorService } from "../services/doctorServices";
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

module.exports = {
  handleGetTopDoctor: handleGetTopDoctor,
};
