import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailsDoctor.scss";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router-dom";
import HomeHeader from "../../HomeHeader";
import * as actions from "../../../../store/actions";
import { LANGUAGE } from "../../../../utils";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfo from "./DoctorExtraInfo";
class DetailsDoctor extends Component {
  constructor(props) {
    super(props);
    const { location } = this.props;
    const match = location.pathname.match(/id=(\d+)/);
    const id = match ? match[1] : null;
    this.state = {
      idFromURL: id,
    };
  }

  componentDidMount() {
    this.props.fetchDoctorInfo(this.state.idFromURL);
  }
  render() {
    let info = this.props.doctorInfoRedux;
    let viTitle =
      info && info.positionData && info.positionData.valueVi
        ? info.positionData.valueVi + " " + info.lastName + " " + info.firstName
        : "";
    let enTitle =
      info && info.positionData && info.positionData.valueEn
        ? info.positionData.valueEn + " " + info.firstName + " " + info.lastName
        : "";
    return (
      <>
        <HomeHeader showBanner={false}></HomeHeader>
        <div className="container-fluid content">
          <div className="row mt-5 doctor-header-content">
            {" "}
            <div className="col-2 img-doctor d-flex justify-content-center align-items-center">
              <img src={info && info.image ? info.image : ""}></img>
            </div>
            <div className="col-6 content-doctor">
              <div className="content-doctor-title h2 fw-bold mt-2">
                {this.props.language === LANGUAGE.VI ? viTitle : enTitle}
              </div>
              <div className="content-doctor-subtitle">
                {info && info.MarkDown && info.MarkDown.description
                  ? info.MarkDown.description
                  : ""}
              </div>
            </div>
          </div>
          <div className="schedule-doctor mt-5 row">
            <div className="col-6 schedule-doctor-left">
              <DoctorSchedule></DoctorSchedule>
            </div>
            <div className="col-4 schedule-doctor-right">
              <DoctorExtraInfo inputId={this.state.idFromURL}></DoctorExtraInfo>
            </div>
          </div>
          <div className="doctor-main-info">
            <div
              className="doctor-main-info-content mt-3"
              dangerouslySetInnerHTML={{
                __html:
                  info && info.MarkDown && info.MarkDown.contentHTML
                    ? info.MarkDown.contentHTML
                    : "",
              }}
            ></div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    doctorInfoRedux: state.admin.doctorInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDoctorInfo: (inputId) => dispatch(actions.getDoctorInfoStart(inputId)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailsDoctor)
);
