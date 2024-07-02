import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailsDoctor.scss";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router-dom";
import HomeHeader from "../../HomeHeader";
class DetailsDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { location } = this.props;

    // Extract the 'id' parameter from the URL path
    const match = location.pathname.match(/id=(\d+)/);
    const id = match ? match[1] : null;
    console.log("Check id", id);
    return (
      <>
        <HomeHeader showBanner={false}></HomeHeader>
        <div className="container-fluid">
          <div className="row mt-5 doctor-header-content">
            {" "}
            <div className="col-1"></div>
            <div className="col-2 img-doctor">
              <img></img>
            </div>
            <div className="col-6 content-doctor">
              <div className="content-doctor-title h2 fw-bold">
                Thầy thuốc Ưu tú, Bác sĩ CKII Nguyễn Tiến Lãng
              </div>
              <div className="content-doctor-subtitle">
                Nguyên Trưởng khoa Ngoại chung ~ Bệnh viện Nội tiết Trung ương
                <br></br>
                Gần 40 năm kinh nghiệm trong lĩnh vực Nội tiết, hơn 30 năm phẫu
                thuật tuyến giáp <br></br>Bác sĩ nhận khám trên 3 tuổi
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailsDoctor)
);
