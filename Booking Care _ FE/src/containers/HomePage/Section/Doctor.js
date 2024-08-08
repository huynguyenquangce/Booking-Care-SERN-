import React, { Component } from "react";
import { connect } from "react-redux";
import "./Doctor.scss";
import Slider from "react-slick";
import { LANGUAGE } from "../../../utils/constant";
import * as actions from "../../../store/actions";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";

class Doctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctor: [],
    };
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.doctorRedux !== this.props.doctorRedux) {
      this.setState({
        arrDoctor: this.props.doctorRedux,
      });
    }
  }

  handleViewDetailsDoctor = (data) => {
    this.props.history.push(`/detail-doctor/id=${data.id}`);
  };
  async componentDidMount() {
    this.props.getTopDoctor(10);
  }
  render() {
    let language = this.props.language;
    let doctor = this.state.arrDoctor;
    return (
      <div className="section-container doctor-container">
        <div className="section-content d-flex flex-column">
          <div className="section-header mt-5 justify-content-between">
            <span className="h2">
              <FormattedMessage id="outstanding-doctor.title" />
            </span>
            <span className="btn btn-primary p-3 justify-content-center align-items-center d-flex">
              Xem thêm
            </span>
          </div>
          <div className="section-body mt-5">
            <Slider {...this.props.settings}>
              {doctor &&
                doctor.length > 0 &&
                doctor.map((item, index) => {
                  let imageBase64 = "";
                  if (item.image) {
                    imageBase64 = new Buffer(item.image, "base64").toString(
                      "binary"
                    );
                  }
                  let name_doctor_position =
                    language === LANGUAGE.EN
                      ? item.positionData.valueEn +
                        " " +
                        item.lastName +
                        " " +
                        item.firstName
                      : item.positionData.valueVi +
                        " " +
                        item.firstName +
                        " " +
                        item.lastName;
                  return (
                    <div
                      className="img-customize"
                      key={index}
                      onClick={() => this.handleViewDetailsDoctor(item)}
                    >
                      <div className="customize-circle-img d-flex justify-content-center">
                        <img
                          className="custom-doctor-img"
                          src={imageBase64 ? imageBase64 : ""}
                        ></img>
                      </div>
                      <div className="text-center mt-4">
                        <div className="h4">{name_doctor_position}</div>
                        <div>Cơ xương khớp</div>
                      </div>
                    </div>
                  );
                })}
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
    language: state.app.language,
    doctorRedux: state.admin.doctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTopDoctor: (data) => dispatch(actions.fetchDoctorStart(data)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Doctor));
