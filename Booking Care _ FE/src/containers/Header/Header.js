import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu } from "./menuApp";
import "./Header.scss";
import { LANGUAGE } from "../../utils/constant";
class Header extends Component {
  handleChangeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  render() {
    const { processLogout } = this.props;
    let userName = this.props.userInfo;
    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={adminMenu} />
        </div>
        <div className="languages">
          <span className="welcome-user me-4">
            <FormattedMessage id="homeheader.welcome"></FormattedMessage>,
            {userName ? userName.firstName : " "}!
          </span>
          <span
            className={
              this.props.language === LANGUAGE.VI
                ? "language-vi me-2 active"
                : "language-vi me-2"
            }
            onClick={() => this.handleChangeLanguage(LANGUAGE.VI)}
          >
            VN
          </span>
          <span
            className={
              this.props.language === LANGUAGE.EN
                ? "language-en me-5 active"
                : "language-en me-5"
            }
            onClick={() => this.handleChangeLanguage(LANGUAGE.EN)}
          >
            EN
          </span>
          <div
            className="btn btn-logout"
            onClick={processLogout}
            title="Log out"
          >
            <i className="fas fa-sign-out-alt"></i>
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
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) =>
      dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
