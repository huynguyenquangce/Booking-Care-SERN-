import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGE } from "../../../utils/constant";
import * as actions from "../../../store/actions";
import "./ManageSchedule.scss";
import Select from "react-select";
import {
  getDoctorInfo,
  postDoctorSchedule,
} from "../../../services/userService";
import DatePicker from "../../../components/Input/DatePicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { dateFormat } from "../../../utils/constant";
import { toast } from "react-toastify";
class ManagSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: {},
      options: [],
      currentDate: new Date(),
      arrTimeGet: [],
    };
  }
  componentDidMount() {
    this.props.getDoctorSelect();
    this.props.fetchTimeDoctor();
  }
  buildOptionSelect = (inputData) => {
    let result = [];
    let languages = this.props.language;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let dataVi = `${item.lastName} ${item.firstName}`;
        let dataEn = `${item.firstName} ${item.lastName}`;
        object.label = languages === LANGUAGE.VI ? dataVi : dataEn;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.arrDoctorSelect !== this.props.arrDoctorSelect) {
      let dataSelects = this.buildOptionSelect(this.props.arrDoctorSelect);
      this.setState({
        options: dataSelects,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelects = this.buildOptionSelect(this.props.arrDoctorSelect);
      this.setState({
        options: dataSelects,
      });
    }

    // after receive data from redux, assign isActive of all item in array to false
    if (prevProps.arrTimeRedux !== this.props.arrTimeRedux) {
      console.log("check data", this.props.arrTimeRedux);
      let data = this.props.arrTimeRedux;
      if (data && data.length > 0) {
        data = data.map((item) => {
          item.isActive = false;
          return item;
        });
      }
      this.setState({
        arrTimeGet: this.props.arrTimeRedux,
      });
    }
  }
  handleChangeSelect = async (inPutselectedOption) => {
    await this.setState({
      selectedOption: inPutselectedOption,
    });
    console.log("check selected option", this.state.selectedOption);
  };
  handleDateChange = (date) => {
    this.setState({
      currentDate: date[0],
    });
    console.log("check date", this.state.currentDate);
  };
  handleChangeColorBtn = (time) => {
    let rangeTime = this.state.arrTimeGet;
    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map((item) => {
        if (item.id === time.id) item.isActive = !item.isActive;
        return item;
      });
      this.setState({
        arrTimeGet: rangeTime,
      });
      console.log("Check state", this.state.arrTimeGet);
    }
  };
  handleSaveSchedule = async () => {
    let result = [];
    if (!this.state.currentDate) {
      toast.error("Missing select date");
    }
    if (!this.state.selectedOption) {
      toast.error("Missing select doctor");
    }
    let formatDate = moment(this.state.currentDate).format(
      dateFormat.SEND_TO_SERVER
    );
    if (this.state.arrTimeGet && this.state.arrTimeGet.length > 0) {
      let selectedTime = this.state.arrTimeGet.filter(
        (item) => item.isActive === true
      );
      // console.log("Check selected time", selectedTime);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((time) => {
          let objData = {};
          objData.doctorId = this.state.selectedOption.value;
          objData.date = formatDate;
          objData.timeType = time.keyMap;
          result.push(objData);
        });
      }
    }
    console.log("formatDate", result);
    let res = await postDoctorSchedule({
      data: result,
    });
    if (res && res.errCode === 0) {
      toast.success("Save Schedule successfully");
    } else {
      toast.error("Error while saving Schedule");
    }
  };
  render() {
    let arrTimeToDisplay = this.state.arrTimeGet;
    let languageMain = this.props.language;
    return (
      <div className="manage-schedule-container container">
        <div className="manage-schedule-title text-center mt-5 h3 fw-bold">
          <FormattedMessage id="manage-schedule-doctor.title"></FormattedMessage>
        </div>
        <div className="manage-schedule-content mt-5 row">
          <div className="col-5 select-doctor-content">
            <div className="select-doctor-title h4">
              <FormattedMessage id="manage-schedule-doctor.doctor"></FormattedMessage>
              :
            </div>
            <div className="select-doctor-select">
              <Select
                value={this.state.selectedOption}
                onChange={this.handleChangeSelect}
                options={this.state.options}
              />
            </div>
          </div>
          <div className="ms-5 col-3">
            <div className="date-picker h4">
              {" "}
              <FormattedMessage id="manage-schedule-doctor.choose"></FormattedMessage>
              :
            </div>
            <div className="date-picker-content p-1">
              <DatePicker
                onChange={this.handleDateChange}
                className="form-control"
                value={this.state.currentDate}
                selected={this.state.currentDate}
                minDate={new Date()}
              />
            </div>
          </div>
          <div className="time-select-zone mt-5 d-flex flex-wrap col-12">
            {arrTimeToDisplay &&
              arrTimeToDisplay.map((item, index) => {
                return (
                  <button
                    className={
                      item.isActive === true
                        ? "btn btn-time p-2 action"
                        : "btn btn-time p-2"
                    }
                    key={index}
                    onClick={() => this.handleChangeColorBtn(item)}
                  >
                    {languageMain && languageMain === LANGUAGE.VI
                      ? item.valueVi
                      : item.valueEn}
                  </button>
                );
              })}
          </div>
        </div>
        <button
          className="btn btn-primary p-2 mt-5"
          onClick={() => this.handleSaveSchedule()}
        >
          Save Schedule
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    arrDoctorSelect: state.admin.doctorSelect,
    arrTimeRedux: state.admin.arrTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDoctorSelect: () => dispatch(actions.fetchDoctorSelectStart()),
    fetchTimeDoctor: () => dispatch(actions.fetchTimeStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagSchedule);
