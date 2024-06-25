import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./HomeHeader.scss";
class HomeHeader extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="home-header-container w-100">
          <div className="home-header-content d-flex w-100">
            <div className="col-4 home-header-left d-flex">
              <i class="fa-solid fa-bars menu-icon"></i>
              <div className="logo"></div>
            </div>
            <div className="col-6 home-header-center">
              <div className="col-2 d-flex flex-column justify-content-center align-items-center">
                <div className="row fw-bold">Chuyên Khoa</div>
                <div className="row text-center">
                  Tìm bác sĩ theo chuyên khoa
                </div>
              </div>
              <div className="col-1"></div>
              <div className="col-2 d-flex flex-column justify-content-center align-items-center">
                <div className="row fw-bold">Cơ sở y tế </div>
                <div className="row text-center">Chọn bệnh viện phòng khám</div>
              </div>
              <div className="col-1"></div>
              <div className="col-2 d-flex flex-column justify-content-center align-items-center">
                <div className="row fw-bold">Bác sĩ</div>
                <div className="row text-center">Chọn bác sĩ giỏi</div>
              </div>
              <div className="col-1"></div>
              <div className="col-2 d-flex flex-column justify-content-center align-items-center">
                <div className="row fw-bold">Gói khám</div>
                <div className="row text-center">Khám sức khỏe tổng quát</div>
              </div>
            </div>
            <div className="col-2 home-header-right">
              <i class="fa-solid fa-circle-question support-icon me-2"></i>
              Hỗ trợ
            </div>
          </div>
        </div>
        <div className="home-header-banner d-flex flex-column align-items-center dark-overlay">
          <div className="content-up d-flex flex-column align-items-center">
            <div className="title1">Nền tảng y tế</div>
            <div className="title2">Chăm sóc sức khỏe toàn diện</div>
            <div className="search-bar d-flex justify-content-center align-items-center mt-3">
              <i class="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                placeholder="Tìm chuyên khoa khám bệnh"
              ></input>
            </div>
          </div>
          <div className="content-down">
            <div className="options d-flex justify-content-center align-items-center text-center">
              <div className="col-1"></div>
              <div className="option-1 col-1 d-flex justify-content-center align-items-center flex-column">
                <div className="option-1-logo"></div>
                <div className="option-1-title fw-bold">Khám chuyên khoa</div>
              </div>
              <div className="option-2 col-1 d-flex justify-content-center align-items-center flex-column">
                <div className="option-2-logo"></div>
                <div className="option-2-title fw-bold">Khám chuyên khoa</div>
              </div>
              <div className="option-3 col-1 d-flex justify-content-center align-items-center flex-column">
                <div className="option-3-logo"></div>
                <div className="option-3-title fw-bold">Khám chuyên khoa</div>
              </div>
              <div className="option-4 col-1 d-flex justify-content-center align-items-center flex-column">
                <div className="option-4-logo"></div>
                <div className="option-4-title fw-bold">Khám chuyên khoa</div>
              </div>
              <div className="option-5 col-1 d-flex justify-content-center align-items-center flex-column">
                <div className="option-5-logo"></div>
                <div className="option-5-title fw-bold">Khám chuyên khoa</div>
              </div>
              <div className="option-6 col-1 d-flex justify-content-center align-items-center flex-column">
                <div className="option-6-logo"></div>
                <div className="option-6-title fw-bold">Khám chuyên khoa</div>
              </div>
              <div className="col-1"></div>
            </div>
          </div>
        </div>
      </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
