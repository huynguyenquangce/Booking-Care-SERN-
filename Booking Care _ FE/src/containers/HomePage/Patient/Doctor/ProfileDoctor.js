import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./ProfileDoctor.scss";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";
import * as actions from "../../../../store/actions";
import { LANGUAGE } from "../../../../utils";
const USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});
class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorIndex: "",
      infoFromModal: {},
      dateInfo: {},
    };
  }
  componentDidMount() {
    this.setState({
      doctorIndex: this.props.doctorId,
    });
    this.props.fetchShortDoctorInfo(this.props.doctorId);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.infoDoctorRedux !== this.props.infoDoctorRedux) {
      this.setState({
        infoFromModal: this.props.infoDoctorRedux,
      });
    }
    // if (prevProps.timeData !== this.props.timeData) {
    //   this.setState({
    //     dateInfo: this.props.timeData,
    //   });
    // }
  }
  render() {
    let getTimeInfo = this.props.timeData;
    console.log("check time", getTimeInfo);
    let { language } = this.props;
    let { infoFromModal } = this.state;
    console.log("check info", this.state.infoFromModal);
    return (
      <div className="info-short-doctor-container">
        <div className="row first-section">
          <div className="col-2 img-doctor d-flex justify-content-center align-items-center">
            <img
              src={
                infoFromModal && infoFromModal.image ? infoFromModal.image : ""
              }
            ></img>
          </div>
          <div className="col-8 content-short-doctor">
            <div className="content-short-doctor-title h3 fw-bold mt-2 d-flex flex-row">
              {infoFromModal && infoFromModal.positionData && (
                <span className="position me-2">
                  {language === LANGUAGE.VI &&
                  infoFromModal.positionData.valueVi ? (
                    <p>{infoFromModal.positionData.valueVi}</p>
                  ) : (
                    <p>{infoFromModal.positionData.valueEn}</p>
                  )}
                </span>
              )}
              {infoFromModal && infoFromModal.lastName && (
                <span className="name">
                  {language === LANGUAGE.VI &&
                  infoFromModal.positionData.valueVi ? (
                    <p>
                      {infoFromModal.lastName + " " + infoFromModal.firstName}
                    </p>
                  ) : (
                    <p>
                      {infoFromModal.firstName + " " + infoFromModal.lastName}
                    </p>
                  )}
                </span>
              )}
            </div>
            <div className="content-short-doctor-subtitle">
              <span className="more-info d-flex">
                <span className="me-2 ">
                  -{" "}
                  <FormattedMessage id="homeheader.doctor_section.modal.title-price"></FormattedMessage>
                  :
                </span>
                {infoFromModal &&
                  infoFromModal.lastName &&
                  infoFromModal.InfoTableData.priceInfo && (
                    <span className="price">
                      {language === LANGUAGE.VI &&
                      infoFromModal.InfoTableData.priceInfo.valueVi ? (
                        <p>
                          {VND.format(
                            infoFromModal.InfoTableData.priceInfo.valueVi
                          )}
                        </p>
                      ) : (
                        <p>
                          {USDollar.format(
                            infoFromModal.InfoTableData.priceInfo.valueEn
                          )}
                        </p>
                      )}
                    </span>
                  )}
              </span>
            </div>
            <div className="content-short-doctor-subtitle">
              <span className="more-info d-flex">
                <span className="me-2 ">
                  -{" "}
                  <FormattedMessage id="homeheader.doctor_section.modal.time-booking"></FormattedMessage>
                  :
                </span>
                {getTimeInfo && getTimeInfo.date && getTimeInfo.TimeData && (
                  <span className="time">
                    {language === LANGUAGE.VI &&
                    getTimeInfo.TimeData.valueVi ? (
                      <div className="d-flex">
                        <div className="me-4">
                          {getTimeInfo.TimeData.valueVi}
                        </div>
                        <div>
                          {getTimeInfo.date.split("-").reverse().join("-")}
                        </div>
                      </div>
                    ) : (
                      <div className="d-flex">
                        <div className="me-4">
                          {getTimeInfo.TimeData.valueEn}
                        </div>
                        <div>{getTimeInfo.date}</div>
                      </div>
                    )}
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    infoDoctorRedux: state.admin.shortInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchShortDoctorInfo: (inputId) =>
      dispatch(actions.getShortDoctorInfoStart(inputId)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor)
);
