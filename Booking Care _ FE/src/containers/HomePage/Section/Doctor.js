import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./Doctor.scss";
import Slider from "react-slick";
import image from "../../../assets/images/doctor/bs-nguyen-ngoc-thanh.jpg";
class Doctor extends Component {
  render() {
    return (
      <div className="section-container doctor-container">
        <div className="section-content d-flex flex-column">
          <div className="section-header mt-5 justify-content-between">
            <span className="h2">Bác sĩ nổi bật</span>
            <span className="btn btn-primary p-4 justify-content-center align-items-center d-flex">
              Xem thêm
            </span>
          </div>
          <div className="section-body mt-5">
            <Slider {...this.props.settings}>
              <div className="img-customize">
                <div className="customize-circle-img d-flex justify-content-center">
                  <img src={image} className="custom-doctor-img"></img>
                </div>
                <div className="text-center mt-4">
                  <div className="h4">Bác Sĩ Nguyễn Ngọc Thanh 1</div>
                  <div>Cơ xương khớp</div>
                </div>
              </div>
              <div className="img-customize">
                <div className="customize-circle-img d-flex justify-content-center">
                  <img src={image} className="custom-doctor-img"></img>
                </div>
                <div className="text-center mt-4">
                  <div>Bác Sĩ Nguyễn Ngọc Thanh 1</div>
                  <div>Cơ xương khớp</div>
                </div>
              </div>
              <div className="img-customize">
                <div className="customize-circle-img d-flex justify-content-center">
                  <img src={image} className="custom-doctor-img"></img>
                </div>
                <div className="text-center mt-4">
                  <div>Bác Sĩ Nguyễn Ngọc Thanh 1</div>
                  <div>Cơ xương khớp</div>
                </div>
              </div>
              <div className="img-customize">
                <div className="customize-circle-img d-flex justify-content-center">
                  <img src={image} className="custom-doctor-img"></img>
                </div>
                <div className="text-center mt-4">
                  <div>Bác Sĩ Nguyễn Ngọc Thanh 1</div>
                  <div>Cơ xương khớp</div>
                </div>
              </div>
              <div className="img-customize">
                <div className="customize-circle-img d-flex justify-content-center">
                  <img src={image} className="custom-doctor-img"></img>
                </div>
                <div className="text-center mt-4">
                  <div>Bác Sĩ Nguyễn Ngọc Thanh 1</div>
                  <div>Cơ xương khớp</div>
                </div>
              </div>
              <div className="img-customize">
                <div className="customize-circle-img d-flex justify-content-center">
                  <img src={image} className="custom-doctor-img"></img>
                </div>
                <div className="text-center mt-4">
                  <div>Bác Sĩ Nguyễn Ngọc Thanh 1</div>
                  <div>Cơ xương khớp</div>
                </div>
              </div>
            </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
