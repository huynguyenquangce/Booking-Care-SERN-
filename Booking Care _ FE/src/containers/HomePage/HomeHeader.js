import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGE } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions/appActions";
class HomeHeader extends Component {
  changeLanguage = (language) => {
    //fire redux actions
    this.props.changeLanguageAppRedux(language);
  };
  render() {
    let currentLanguage = this.props.language;
    return (
      <React.Fragment>
        <div className="home-header-container w-100">
          <div className="home-header-content d-flex w-100">
            <div className="col-3 home-header-left d-flex">
              <i class="fa-solid fa-bars menu-icon me-3 me-md-1 me-lg-0"></i>
              <div className="logo"></div>
            </div>
            <div className="col-6 home-header-center ">
              <div className="col-2 d-flex flex-column justify-content-center align-items-center ">
                <div className="row fw-bold section text-center">
                  <FormattedMessage id="homeheader.title1" />
                </div>
                <div className="row text-center subsection">
                  <FormattedMessage id="homeheader.title1-des" />
                </div>
              </div>
              <div className="col-2 d-flex flex-column justify-content-center align-items-center ">
                <div className="row fw-bold section text-center">
                  <FormattedMessage id="homeheader.title2" />
                </div>
                <div className="row text-center subsection">
                  <FormattedMessage id="homeheader.title2-des" />
                </div>
              </div>
              <div className="col-2 d-flex flex-column justify-content-center align-items-center ">
                <div className="row fw-bold section text-center">
                  <FormattedMessage id="homeheader.title3" />
                </div>
                <div className="row text-center subsection">
                  <FormattedMessage id="homeheader.title3-des" />
                </div>
              </div>
              <div className="col-2 d-flex flex-column justify-content-center align-items-center ">
                <div className="row fw-bold section text-center">
                  <FormattedMessage id="homeheader.title4" />
                </div>
                <div className="row text-center subsection">
                  <FormattedMessage id="homeheader.title4-des" />
                </div>
              </div>
            </div>
            <div className="col-2 home-header-right d-flex justify-content-end align-items-center ">
              <div className="support d-flex align-items-center">
                <i class="fa-solid fa-circle-question support-icon me-2"></i>
                <FormattedMessage id="homeheader.support" />
              </div>
              <div
                className={
                  currentLanguage === LANGUAGE.VI
                    ? "language-vi active"
                    : "language-vi"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGE.VI)}>VN</span>
              </div>
              <div
                className={
                  currentLanguage === LANGUAGE.EN
                    ? "language-en active"
                    : "language-en"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGE.EN)}>EN</span>
              </div>
            </div>
            <div className="col-1"></div>
          </div>
        </div>
        <div className="home-header-banner d-flex flex-column align-items-center dark-overlay">
          <div className="content-up d-flex flex-column align-items-center">
            <div className="title1">
              <FormattedMessage id="banner.title1" />
            </div>
            <div className="title2">
              <FormattedMessage id="banner.title2" />
            </div>
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
                <div className="option-1-title mt-3 ">
                  <FormattedMessage id="banner.option-1-title" />
                </div>
              </div>
              <div className="option-2 col-1 d-flex justify-content-center align-items-center flex-column">
                <div className="option-2-logo"></div>
                <div className="option-2-title mt-3">
                  <FormattedMessage id="banner.option-2-title" />
                </div>
              </div>
              <div className="option-3 col-1 d-flex justify-content-center align-items-center flex-column">
                <div className="option-3-logo"></div>
                <div className="option-3-title mt-3">
                  <FormattedMessage id="banner.option-3-title" />
                </div>
              </div>
              <div className="option-4 col-1 d-flex justify-content-center align-items-center flex-column">
                <div className="option-4-logo"></div>
                <div className="option-4-title mt-3 ">
                  <FormattedMessage id="banner.option-4-title" />
                </div>
              </div>
              <div className="option-5 col-1 d-flex justify-content-center align-items-center flex-column">
                <div className="option-5-logo"></div>
                <div className="option-5-title mt-3 ">
                  <FormattedMessage id="banner.option-5-title" />
                </div>
              </div>
              <div className="option-6 col-1 d-flex justify-content-center align-items-center flex-column">
                <div className="option-6-logo"></div>
                <div className="option-6-title mt-3 ">
                  <FormattedMessage id="banner.option-6-title" />
                </div>
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
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
