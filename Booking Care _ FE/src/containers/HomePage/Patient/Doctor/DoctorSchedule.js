import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router-dom";
import HomeHeader from "../../HomeHeader";
import * as actions from "../../../../store/actions";
import { LANGUAGE } from "../../../../utils";
import Select from "react-select";
import moment from "moment";
const generateDateOptions = () => {
  const today = moment();
  const options = [];

  // Create Select with next 4 day with format Day - DD/MM ( Wednesday - 07/08 )
  for (let i = 0; i < 4; i++) {
    const date = today.clone().add(i, "days");
    const label = `${date.format("dddd")} - ${date.format("DD/MM")}`;
    options.push({ value: date.format("YYYY-DD-MM"), label });
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
    };
  }

  handleChangeSelect = async (inPutselectedOption) => {
    await this.setState({
      selectOption: inPutselectedOption,
    });
    console.log("check selected option", this.state.selectOption);
  };
  componentDidMount() {
    // this.props.getDoctorSchedule({
    //   id: this.state.idFromURL,
    //   date: this.state.selectOption ? this.state.selectOption.value : null,
    // });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectOption !== this.state.selectOption) {
      this.props.getDoctorSchedule({
        id: this.state.idFromURL,
        date: this.state.selectOption.value,
      });
    }
  }
  render() {
    console.log("checking props 69", this.props.arrScheduleRedux);
    return (
      <>
        <div className="schedule-container ms-5">
          <div className="schedule-select col-3">
            <Select
              value={this.state.selectedOption}
              onChange={this.handleChangeSelect}
              options={this.state.options}
            />
          </div>
          <div className="schedule-icon mt-5">
            <i class="fa-solid fa-calendar-days me-3 icon-calendar"></i>
            <span>
              <FormattedMessage id="homeheader.doctor_section.icon-title"></FormattedMessage>
            </span>
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
