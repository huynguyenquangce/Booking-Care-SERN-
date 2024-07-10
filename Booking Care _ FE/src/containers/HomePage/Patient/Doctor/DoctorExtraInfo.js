import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfo.scss";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router-dom";
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
class DoctorExtraInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenMore: false,
      doctorInfoState: [],
      nameClinic: "",
    };
  }

  handleMoreInfo = () => {
    this.setState({
      isOpenMore: !this.state.isOpenMore,
    });
  };
  componentDidMount() {
    this.props.fetchDoctorInfo(this.props.inputId);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.doctorInfoRedux !== this.props.doctorInfoRedux) {
      this.setState({
        doctorInfoState: this.props.doctorInfoRedux,
      });
    }
  }
  render() {
    let { language } = this.props;
    let { isOpenMore, nameClinic } = this.state;
    let { doctorInfoState } = this.state;
    console.log("check info", doctorInfoState);
    return (
      <>
        <div className="content-right ms-3">
          <div className="extra-doctor-container">
            <div className="first-section">
              <div className="extra-doctor-title">
                <FormattedMessage id="homeheader.doctor_section.extra-doctor-title-address"></FormattedMessage>
              </div>
              <div className="extra-doctor-name-clinic fw-bold">
                {doctorInfoState &&
                doctorInfoState.InfoTableData &&
                doctorInfoState.InfoTableData.nameClinic
                  ? doctorInfoState.InfoTableData.nameClinic
                  : ""}
              </div>
              <div className="extra-doctor-name-address">
                {doctorInfoState &&
                doctorInfoState.InfoTableData &&
                doctorInfoState.InfoTableData.addressClinic
                  ? doctorInfoState.InfoTableData.addressClinic
                  : ""}
              </div>
            </div>
            <div className="second-section d-flex mt-3">
              <div className="second-section-content d-flex align-items-center">
                GIÁ KHÁM:
              </div>
              <span className="d-flex align-items-center d-flex">
                {doctorInfoState &&
                  doctorInfoState.InfoTableData &&
                  doctorInfoState.InfoTableData.priceInfo &&
                  (language === LANGUAGE.VI
                    ? VND.format(
                        doctorInfoState.InfoTableData.priceInfo.valueVi
                      )
                    : USDollar.format(
                        doctorInfoState.InfoTableData.priceInfo.valueEn
                      ))}
              </span>
              <div
                className="more-info-modal d-flex align-items-center"
                onClick={() => this.handleMoreInfo()}
              >
                <span>Xem chi tiết</span>
              </div>
              {isOpenMore === true && (
                <>
                  <div className="modal-info d-flex flex-column justify-content-between w-100 mt-3">
                    <div className="info-1 d-flex justify-content-between w-100 mb-2">
                      <div>Giá khám thường</div>
                      <div>
                        {doctorInfoState &&
                          doctorInfoState.InfoTableData &&
                          doctorInfoState.InfoTableData.priceInfo &&
                          (language === LANGUAGE.VI
                            ? VND.format(
                                parseInt(
                                  doctorInfoState.InfoTableData.priceInfo
                                    .valueVi
                                ) + parseInt("100000")
                              )
                            : USDollar.format(
                                parseInt(
                                  doctorInfoState.InfoTableData.priceInfo
                                    .valueEn
                                ) + parseInt("5")
                              ))}
                      </div>
                    </div>
                    <div className="info-2 d-flex justify-content-between w-100 mb-2 pt-2">
                      <div>Giá khám bảo hiểm</div>
                      <div>
                        {" "}
                        {doctorInfoState &&
                          doctorInfoState.InfoTableData &&
                          doctorInfoState.InfoTableData.priceInfo &&
                          (language === LANGUAGE.VI
                            ? VND.format(
                                parseInt(
                                  doctorInfoState.InfoTableData.priceInfo
                                    .valueVi
                                ) + parseInt("50000")
                              )
                            : USDollar.format(
                                parseInt(
                                  doctorInfoState.InfoTableData.priceInfo
                                    .valueEn
                                ) + parseInt("2")
                              ))}
                      </div>
                    </div>
                    <div className="info-3 d-flex justify-content-between w-100 pt-2">
                      <div>Giá khám dịch vụ</div>
                      <div>
                        {" "}
                        {doctorInfoState &&
                          doctorInfoState.InfoTableData &&
                          doctorInfoState.InfoTableData.priceInfo &&
                          (language === LANGUAGE.VI
                            ? VND.format(
                                parseInt(
                                  doctorInfoState.InfoTableData.priceInfo
                                    .valueVi
                                ) + parseInt("200000")
                              )
                            : USDollar.format(
                                parseInt(
                                  doctorInfoState.InfoTableData.priceInfo
                                    .valueEn
                                ) + parseInt("10")
                              ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
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
  connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo)
);
