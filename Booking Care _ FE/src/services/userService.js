import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};

const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-user?id=${inputId}`);
};

const createNewUser = (data) => {
  return axios.post("/api/create-new-user", data);
};

const deleteUser = (userId) => {
  return axios.delete("/api/delete-user", {
    // headers: {
    //   Authorization: authorizationToken
    // },
    data: {
      id: userId,
    },
  });
};

const updateUser = (inputData) => {
  return axios.put("/api/edit-user", inputData);
};

const getAllCodeData = (inputData) => {
  return axios.get(`/allcode?type=${inputData}`);
};

const getTopDoctor = (inputData) => {
  return axios.get(`/api/get-top-doctor?limit=${inputData}`);
};

const getDoctorSelect = () => {
  return axios.get("/api/get-doctor-home-select");
};

const postDoctorInfo = (inputData) => {
  return axios.post("/api/post-info-doctor", inputData);
};

const getDoctorInfo = (inputId) => {
  return axios.get(`/api/get-doctor-info?id=${inputId}`);
};

const postDoctorSchedule = (inputData) => {
  return axios.post("/api/create-doctor-schedule", inputData);
};

const getDoctorSchedule = (inputData) => {
  const { id, date } = inputData;
  return axios.get(`/api/get-doctor-schedule?id=${id}&date=${date}`);
};

const getDoctorShortInfo = (inputId) => {
  return axios.get(`/api/get-doctor-short-info?id=${inputId}`);
};

const postBookingPatient = (inputData) => {
  return axios.post("/api/patient-createBooking", inputData);
};

const verifyEmailBooking = (inputData) => {
  return axios.post("/verify-email-booking", inputData);
};

const createSpecialty = (inputData) => {
  return axios.post("/api/create-specialty", inputData);
};

const getSpecialty = (inputId) => {
  return axios.get(`/api/get-specialty?id=${inputId}`);
};
export {
  handleLoginApi,
  getAllUsers,
  createNewUser,
  deleteUser,
  updateUser,
  getAllCodeData,
  getTopDoctor,
  getDoctorSelect,
  postDoctorInfo,
  getDoctorInfo,
  postDoctorSchedule,
  getDoctorSchedule,
  getDoctorShortInfo,
  postBookingPatient,
  verifyEmailBooking,
  createSpecialty,
  getSpecialty,
};
