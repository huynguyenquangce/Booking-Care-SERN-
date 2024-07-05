import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGE } from "../../../utils/constant";
import * as actions from "../../../store/actions";
import "./ManageSchedule.scss";
import Select from "react-select";
import { getDoctorInfo } from "../../../services/userService";
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import startOfISOWeek from "date-fns/startOfISOWeek";
import { startOfWeek } from "date-fns";

class ManagSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: {},
      options: [],
    };
  }
  componentDidMount() {
    this.props.getDoctorSelect();
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
  }
  handleChangeSelect = async (inPutselectedOption) => {
    await this.setState({
      selectedOption: inPutselectedOption,
    });
    console.log("check state 3", this.state.selectedOption);
  };
  render() {
    return (
      <div className="manage-schedule-container container">
        <div className="manage-schedule-title text-center mt-5 h3 fw-bold">
          <FormattedMessage id="manage-schedule-doctor.title"></FormattedMessage>
        </div>
        <div className="manage-schedule-content mt-5">
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
          <div className="col-6"></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    arrDoctorSelect: state.admin.doctorSelect,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDoctorSelect: () => dispatch(actions.fetchDoctorSelectStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagSchedule);
