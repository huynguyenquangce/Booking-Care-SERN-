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
    this.state = {
      selectOption: {},
      options: generateDateOptions(),
    };
  }

  handleChangeSelect = async (inPutselectedOption) => {
    await this.setState({
      selectOption: inPutselectedOption,
    });
    console.log("check selected option", this.state.selectOption);
  };
  componentDidMount() {}
  render() {
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule)
);
