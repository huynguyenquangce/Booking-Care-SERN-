import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router-dom";
import HomeHeader from "../../HomeHeader";
import * as actions from "../../../../store/actions";
import { LANGUAGE, dateFormat } from "../../../../utils";
import Select from "react-select";
import moment from "moment";
import DoctorModal from "./Modal/DoctorModal";
// import "moment/locale/vi";
const generateDateOptions = () => {
  const today = moment();
  const options = [];

  // Create Select with next 4 day with format Day - DD/MM ( Wednesday - 07/08 )
  for (let i = 0; i < 7; i++) {
    let date = today.clone().add(i, "days");
    let label = `${date.format("dddd")} - ${date.format("DD/MM")}`;
    options.push({ value: date.format(dateFormat.SEND_TO_SERVER), label });
  }
  return options;
};
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    const { location } = this.props;
    const match = location.pathname.match(/id=(\d+)/);
    const id = match ? match[1] : null;
    this.state = {
      selectOption: {},
      options: generateDateOptions(),
      idFromURL: id,
      isModalOpen: false,
      timeToSend: {},
    };
  }

  handleChangeSelect = async (inPutselectedOption) => {
    await this.setState({
      selectOption: inPutselectedOption,
    });
    console.log("check selected option", this.state.selectOption);
  };
  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectOption !== this.state.selectOption) {
      this.props.getDoctorSchedule({
        id: this.state.idFromURL,
        date: this.state.selectOption.value,
      });
    }
  }
  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  };
  handleOpenModal = () => {
    this.setState({
      isModalOpen: true,
    });
  };
  handleOnClickSchedule = (data) => {
    let objSend = this.buildDateToSend(data);
    this.setState({
      timeToSend: objSend,
    });
    this.handleOpenModal();
  };
  buildDateToSend = (inputData) => {
    let obj = {};
    obj.date = inputData.date;
    obj.timeType = inputData.timeType;
    obj.TimeData = {};
    obj.TimeData.valueEn = inputData.timeTypeData.valueEn;
    obj.TimeData.valueVi = inputData.timeTypeData.valueVi;
    return obj;
  };

  render() {
    let arrSchedule = this.props.arrScheduleRedux;
    console.log("check schedule", this.state.arrSchedule);
    return (
      <>
        <div className="content-left">
          <DoctorModal
            isOpen={this.state.isModalOpen}
            toggleModalFromParent={this.toggleModal}
            doctorId={this.state.idFromURL}
            timeData={this.state.timeToSend}
          ></DoctorModal>
          <div className="schedule-container ms-5">
            <div className="schedule-select col-4">
              <Select
                value={this.state.selectedOption}
                onChange={this.handleChangeSelect}
                options={this.state.options}
                placeholder={
                  <div className="text-primary">
                    {" "}
                    <FormattedMessage id="homeheader.doctor_section.placeholder-select-date"></FormattedMessage>
                  </div>
                }
              />
            </div>
            <div className="schedule-icon mt-4">
              <i class="fa-solid fa-calendar-days me-3 icon-calendar"></i>
              <span>
                <FormattedMessage id="homeheader.doctor_section.icon-title"></FormattedMessage>
              </span>
            </div>
            <div className="schedule-zone mt-4 d-flex">
              {arrSchedule && arrSchedule.length > 0 ? (
                arrSchedule.map((item, index) => (
                  <button
                    key={index}
                    className="btn-schedule btn"
                    onClick={() => this.handleOnClickSchedule(item)}
                  >
                    {this.props.language && this.props.language === LANGUAGE.VI
                      ? item.timeTypeData.valueVi
                      : item.timeTypeData.valueEn}
                  </button>
                ))
              ) : (
                <div className="h5">
                  <FormattedMessage id="homeheader.doctor_section.no-select"></FormattedMessage>
                </div>
              )}
            </div>
            <div className="sub-text mt-4">
              <FormattedMessage id="homeheader.doctor_section.choose"></FormattedMessage>
              <i className="fa-regular fa-hand-point-up mx-2"></i>
              <FormattedMessage id="homeheader.doctor_section.book-free"></FormattedMessage>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    arrScheduleRedux: state.admin.arrSchedule,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDoctorSchedule: (inputData) =>
      dispatch(actions.fetchScheduleStart(inputData)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule)
);
