import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfo.scss";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router-dom";
import HomeHeader from "../../HomeHeader";
import * as actions from "../../../../store/actions";
import { LANGUAGE } from "../../../../utils";
import DoctorSchedule from "./DoctorSchedule";
class DoctorExtraInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpenMore: false,
    };
  }

  componentDidMount() {}
  handleMoreInfo = () => {
    this.setState({
      isOpenMore: !this.state.isOpenMore,
    });
  };
  render() {
    let { isOpenMore } = this.state;
    return (
      <>
        <div className="content-right ms-3">
          <div className="extra-doctor-container">
            <div className="first-section">
              <div className="extra-doctor-title">
                <FormattedMessage id="homeheader.doctor_section.extra-doctor-title-address"></FormattedMessage>
              </div>
              <div className="extra-doctor-name-clinic">
                Bệnh viện Đa khoa Bảo Sơn 2
              </div>
              <div className="extra-doctor-name-address">
                Số 52 Nguyễn Chí Thanh - Đống Đa - Hà Nội
              </div>
            </div>
            <div className="second-section d-flex mt-3">
              <div className="second-section-content">GIÁ KHÁM:</div>
              <span className="d-flex align-items-center">200.000 đ</span>
              <div
                className="more-info-modal d-flex align-items-center"
                onClick={() => this.handleMoreInfo()}
              >
                Xem chi tiết
              </div>
              {isOpenMore === true && <div>Open</div>}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDoctorInfo: (inputId) => dispatch(actions.getDoctorInfoStart(inputId)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo)
);
