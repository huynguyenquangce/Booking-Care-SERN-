import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailsSpecialty.scss";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router-dom";
import { LANGUAGE } from "../../../../utils";
import HomeHeader from "../../HomeHeader";
import { getSpecialty } from "../../../../services/userService";
import * as actions from "../../../../store/actions";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
class DetailsSpecialty extends Component {
  constructor(props) {
    super(props);
    const { location } = this.props;
    const match = location.pathname.match(/id=(\d+)/);
    const id = match ? match[1] : null;
    this.state = {
      idFromURL: id,
      specialtyData: {},
      showFullDescription: false,
      initialLines: 12,
      idDoctor: 33,
      isOpenModalFromExtraInfo: false,
    };
  }

  async componentDidMount() {
    await this.props.fetchDoctorInfo(33);
    let result = await getSpecialty(this.state.idFromURL);
    this.setState({
      specialtyData: result.specialtyData,
    });
  }

  toggleDescription = () => {
    this.setState((prevState) => ({
      showFullDescription: !prevState.showFullDescription,
    }));
  };
  render() {
    let info = this.props.doctorInfoRedux;

    let {
      specialtyData,
      showFullDescription,
      initialLines,
      isOpenModalFromExtraInfo,
    } = this.state;
    let descriptionHTML = specialtyData.descriptionHTML || "";
    let displayedContent;
    if (!showFullDescription && descriptionHTML) {
      let lines = descriptionHTML.split("\n");
      let limitedContent = lines.slice(0, initialLines).join("\n");
      displayedContent = limitedContent;
    } else {
      displayedContent = descriptionHTML;
    }
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
        <HomeHeader />
        <div className="specialty-container">
          <div className="specialty-description container mt-5">
            <div
              className="specialty-description-content"
              dangerouslySetInnerHTML={{ __html: displayedContent }}
            ></div>
            {descriptionHTML && (
              <p className="text-primary" onClick={this.toggleDescription}>
                {showFullDescription ? "Ẩn bớt" : "Xem thêm"}
              </p>
            )}
          </div>
          <div className="doctor-list">
            <div className="mt-3">Select Position</div>
            <div className="doctor-component padding-bottom-modal container mt-3 py-4 d-flex justify-content-center align-items-center">
              <div className="row left-content col-6 d-flex justify-content-center align-items-center">
                {" "}
                <div className="col-1"></div>
                <div className="col-2 img-doctor-spec d-flex justify-content-center align-items-center">
                  <img src={info && info.image ? info.image : ""}></img>
                </div>
                <div className="col-9 content-doctor">
                  <div className="content-doctor-title h4 fw-bold mt-2">
                    {this.props.language === LANGUAGE.VI ? viTitle : enTitle}
                  </div>
                  <div className="content-doctor-subtitle">
                    {info && info.MarkDown && info.MarkDown.description
                      ? info.MarkDown.description
                      : ""}
                  </div>
                </div>
              </div>
              <div className="right-content col-6 ms-4">
                <div className="dt-schedule">
                  <DoctorSchedule id={this.state.idDoctor}></DoctorSchedule>
                </div>
                <div className="dt-extra mt-5">
                  <DoctorExtraInfo
                    inputId={this.state.idDoctor}
                  ></DoctorExtraInfo>
                </div>
              </div>
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
    doctorInfoRedux: state.admin.doctorInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDoctorInfo: (inputId) => dispatch(actions.getDoctorInfoStart(inputId)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailsSpecialty)
);
