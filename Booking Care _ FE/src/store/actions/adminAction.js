import actionTypes from "./actionTypes";
import {
  getAllCodeData,
  createNewUser,
  getAllUsers,
  deleteUser,
  updateUser,
  getTopDoctor,
  getDoctorSelect,
  postDoctorInfo,
  getDoctorInfo,
} from "../../services/userService";
import { toast } from "react-toastify";

// export const fetchGenderStart = () => ({
//   type: actionTypes.FETCH_GENDER_START,
// });

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeData("gender");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (error) {
      dispatch(fetchGenderFailed());
      console.log(error);
    }
  };
};
export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeData("position");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (error) {
      dispatch(fetchPositionFailed());
      console.log(error);
    }
  };
};

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeData("role");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (error) {
      dispatch(fetchRoleFailed());
      console.log(error);
    }
  };
};

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FECTH_ROLE_FAILED,
});

export const createNewUsers = (inputData) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUser(inputData);
      if (res && res.errCode === 0) {
        toast.success("Create New User Success");
        dispatch(saveUserSuccess());
      } else {
        dispatch(saveUserFailed());
      }
    } catch (error) {
      dispatch(fetchRoleFailed());
      console.log(error);
    }
  };
};

export const saveUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});

export const getAllUsersAction = (inputData) => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers(inputData);
      if (res && res.errCode === 0) {
        dispatch(fetchUserSuccess(res.user));
      } else {
        dispatch(fetchUserFailed());
      }
    } catch (error) {
      dispatch(fetchUserFailed());
    }
  };
};

export const fetchUserSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USER_SUCCESS,
  users: data,
});

export const fetchUserFailed = () => ({
  type: actionTypes.FETCH_ALL_USER_FAILED,
});

export const deleteUserStart = (inputData) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUser(inputData);
      if (res && res.errCode === 0) {
        toast.success("Delete User Success");
        dispatch(deleteUserSuccess());
      } else {
        dispatch(deleteUserFailed());
      }
    } catch (error) {
      dispatch(deleteUserFailed());
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

export const updateUserStart = (inputData) => {
  return async (dispatch, getState) => {
    try {
      let res = await updateUser(inputData);
      console.log(res);
      if (res && res.errCode === 0) {
        toast.success("Update User Success!");
        dispatch(updateUserSuccess());
      } else {
        dispatch(updateUserFailed());
      }
    } catch (error) {
      dispatch(updateUserFailed());
      console.log(error);
    }
  };
};

export const updateUserSuccess = () => ({
  type: actionTypes.UPDATE_USER_SUCCESS,
});

export const updateUserFailed = () => ({
  type: actionTypes.UPDATE_USER_FAILED,
});

// fetch data doctor
export const fetchDoctorStart = (limitInput) => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctor(limitInput);
      if (res && res.errCode === 0) {
        dispatch(fetchDoctorSuccess(res.data));
      } else {
        dispatch(fetchDoctorFailed());
      }
    } catch (error) {
      dispatch(fetchDoctorFailed());
    }
  };
};

export const fetchDoctorSuccess = (input) => ({
  type: actionTypes.FETCH_DOCTOR_SUCCESS,
  doctor: input,
});

export const fetchDoctorFailed = () => ({
  type: actionTypes.UPDATE_USER_FAILED,
});

// fetch data doctor for select
export const fetchDoctorSelectStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getDoctorSelect();
      if (res && res.errCode === 0) {
        dispatch(fetchDoctorSelectSuccess(res.data));
      } else {
        dispatch(fetchDoctorSelectFailed());
      }
    } catch (error) {
      dispatch(fetchDoctorSelectFailed());
    }
  };
};

export const fetchDoctorSelectSuccess = (input) => ({
  type: actionTypes.FETCH_DOCTOR_SELECT_SUCCESS,
  doctorSelect: input,
});

export const fetchDoctorSelectFailed = () => ({
  type: actionTypes.FETCH_DOCTOR_SELECT_FAILED,
});

export const createDoctorInfoStart = (inputData) => {
  return async (dispatch, getState) => {
    try {
      let res = await postDoctorInfo(inputData);
      if (res && res.errCode === 0) {
        if (inputData.actions === "CREATE") {
          toast.success("Create Info Doctor Success");
          dispatch(createDoctorInfoSuccess());
        } else {
          toast.success("Update Info Doctor Success");
          dispatch(createDoctorInfoSuccess());
        }
      } else {
        dispatch(createDoctorInfoFailed());
      }
    } catch (error) {
      dispatch(createDoctorInfoFailed());
      console.log(error);
    }
  };
};

export const createDoctorInfoSuccess = () => ({
  type: actionTypes.CREATE_DOCTOR_INFO_SUCCESS,
});

export const createDoctorInfoFailed = () => ({
  type: actionTypes.CREATE_DOCTOR_INFO_FAILED,
});

///////getDoctorInfo//////////
export const getDoctorInfoStart = (inputData) => {
  return async (dispatch, getState) => {
    try {
      let res = await getDoctorInfo(inputData);
      if (res && res.errCode === 0) {
        dispatch(getDoctorInfoSuccess(res.data));
      } else {
        dispatch(getDoctorInfoFailed());
      }
    } catch (error) {
      dispatch(getDoctorInfoFailed());
      console.log(error);
    }
  };
};

export const getDoctorInfoSuccess = (inputData) => ({
  type: actionTypes.GET_DOCTOR_INFO_SUCCESS,
  doctorInfo: inputData,
});

export const getDoctorInfoFailed = () => ({
  type: actionTypes.GET_DOCTOR_INFO_FAILED,
});
