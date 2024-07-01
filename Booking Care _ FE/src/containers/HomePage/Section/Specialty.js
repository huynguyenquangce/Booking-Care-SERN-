import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import image from "../../../assets/images/specialty/xuong-khop.png";
import { changeLanguageApp } from "../../../store/actions/appActions";

class Specialty extends Component {
  changeLanguage = (language) => {
    //fire redux actions
    this.props.changeLanguageAppRedux(language);
  };
  render() {
    return (
      <div className="specialty-container section-container">
        <div className="section-content d-flex flex-column">
          <div className="section-header mt-5 justify-content-between">
            <span className="h2">
              <FormattedMessage id="specialty.title" />
            </span>
            <span className="btn btn-primary p-3 justify-content-center align-items-center d-flex">
              <FormattedMessage id="specialty.extension-btn" />
            </span>
          </div>
          <div className="section-body mt-5">
            <Slider {...this.props.settings}>
              <div className="img-customize">
                <img src={image}></img>
                <div>Chuyên nhóm cơ</div>
              </div>
              <div className="img-customize">
                <img src={image}></img>
                <div>Chuyên nhóm cơ</div>
              </div>
              <div className="img-customize">
                <img src={image}></img>
                <div>Chuyên nhóm cơ</div>
              </div>
              <div className="img-customize">
                <img src={image}></img>
                <div>Chuyên nhóm cơ</div>
              </div>
              <div className="img-customize">
                <img src={image}></img>
                <div>Chuyên nhóm cơ</div>
              </div>
              <div className="img-customize">
                <img src={image}></img>
                <div>Chuyên nhóm cơ</div>
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
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
