import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./About.scss";
class About extends Component {
  render() {
    return (
      <div className="section-container about-container">
        <div className="section-content d-flex flex-column">
          <div className="section-header mt-5 content-header">
            <span className="h2">Truyền thông nói về BookingCare</span>
          </div>
          <div className="section-body mt-5 row">
            <div className="col-12 col-md-6">
              <div className="radius-video-about">
                <iframe
                  className="rounded-video"
                  width="100%"
                  height="400px"
                  src="https://www.youtube.com/embed/hlU_ugrplVM"
                  title="Đen - FRIENDSHIP ft. Friends (M/V)"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
            <div className="col-12 col-md-5">
              <div className="description-video">
                "BookingCare là Nền tảng Y tế chăm sóc sức khỏe toàn diện cung
                cấp nền tảng công nghệ giúp bệnh nhân dễ dàng lựa chọn dịch vụ y
                tế từ mạng lưới bác sĩ chuyên khoa giỏi, phòng khám/ bệnh viện
                uy tín với thông tin đã xác thực và đặt lịch nhanh chóng."
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
