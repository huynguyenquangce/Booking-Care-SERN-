import db from "../models";
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

module.exports = {
  getTopDoctorService: getTopDoctorService,
};
