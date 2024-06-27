import actionTypes from "./actionTypes";
import { getAllCodeData, createNewUser } from "../../services/userService";

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
