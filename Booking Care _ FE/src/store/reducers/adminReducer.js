import actionTypes from "../actions/actionTypes";
const initialState = {
  genders: [],
  roles: [],
  position: [],
  allUser: [],
  doctor: [],
  doctorSelect: [],
  doctorInfo: [],
  arrTime: [],
  arrSchedule: {},
  provinces: [],
  prices: [],
  payments: [],
  shortInfo: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      let copyState = { ...state };
      copyState.genders = action.data;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      state.genders = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.position = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAILED:
      state.position = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;
      return {
        ...state,
      };
    case actionTypes.FECTH_ROLE_FAILED:
      state.roles = [];
      return {
        ...state,
      };
    // Get All User
    case actionTypes.FETCH_ALL_USER_SUCCESS:
      state.allUser = action.users;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USER_FAILED:
      state.allUser = [];
      return {
        ...state,
      };
    // Delete User
    case actionTypes.DELETE_USER_SUCCESS:
      console.log("Delete User Reducer", action);
      return {
        ...state,
      };
    case actionTypes.DELETE_USER_FAILED:
      return {
        ...state,
      };
    // Update User
    case actionTypes.UPDATE_USER_SUCCESS:
      console.log("Update User Reducer", action);
      return {
        ...state,
      };
    case actionTypes.UPDATE_USER_FAILED:
      return {
        ...state,
      };

    // get doctor
    case actionTypes.FETCH_DOCTOR_SUCCESS:
      state.doctor = action.doctor;
      return {
        ...state,
      };
    case actionTypes.FETCH_DOCTOR_FAILED:
      return {
        ...state,
      };
    // get doctor select
    case actionTypes.FETCH_DOCTOR_SELECT_SUCCESS:
      state.doctorSelect = action.doctorSelect;
      return {
        ...state,
      };
    case actionTypes.FETCH_DOCTOR_SELECT_FAILED:
      return {
        ...state,
      };
    // post info doctor
    case actionTypes.CREATE_DOCTOR_INFO_SUCCESS:
      return {
        ...state,
      };
    case actionTypes.CREATE_DOCTOR_INFO_FAILED:
      return {
        ...state,
      };

    // get doctor info
    case actionTypes.GET_DOCTOR_INFO_SUCCESS:
      state.doctorInfo = action.doctorInfo;
      return {
        ...state,
      };
    case actionTypes.GET_DOCTOR_INFO_FAILED:
      return {
        ...state,
      };
    // get time from allcode
    case actionTypes.FETCH_TIME_DOCTOR_SUCCESS:
      state.arrTime = action.timeData;
      return {
        ...state,
      };
    case actionTypes.FETCH_TIME_DOCTOR_FAILED:
      return {
        ...state,
      };
    // get data from schedule
    case actionTypes.FETCH_SCHEDULE_DOCTOR_SUCCESS:
      console.log("check schedule", action.scheduleData);
      state.arrSchedule = action.scheduleData;
      return {
        ...state,
      };
    case actionTypes.FETCH_SCHEDULE_DOCTOR_FAILED:
      return {
        ...state,
      };
    // fetch province from allcode
    case actionTypes.FETCH_PROVINCE_DOCTOR_SUCCESS:
      state.provinces = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_PROVINCE_DOCTOR_FAILED:
      return {
        ...state,
      };
    // fetch price from allcode
    case actionTypes.FETCH_PRICE_DOCTOR_SUCCESS:
      state.prices = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_PRICE_DOCTOR_FAILED:
      return {
        ...state,
      };
    // fetch payment from allcode
    case actionTypes.FETCH_PAYMENT_DOCTOR_SUCCESS:
      state.payments = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_PAYMENT_DOCTOR_FAILED:
      return {
        ...state,
      };

    // fetch short doctor info data
    case actionTypes.FETCH_SHORT_INFO_DOCTOR_SUCCESS:
      state.shortInfo = action.shortdoctorInfo;
      return {
        ...state,
      };
    case actionTypes.FETCH_SHORT_INFO_DOCTOR_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;
