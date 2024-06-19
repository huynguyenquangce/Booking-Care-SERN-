import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
// import * as actions from "../store/actions";
import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handleLogin } from "../../services/userService";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
    };
  }
  handleOnChangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleOnClickLogin = async () => {
    console.log("username:" + this.state.username);
    console.log("password:" + this.state.password);
    await handleLogin(this.state.username, this.state.password);
  };
  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };
  render() {
    return (
      <div className="login-background d-flex justify-content-center align-items-center">
        <div className="login-container mt-5">
          <div className="login-content container d-flex justify-content-center flex-column">
            <div className="row h2 justify-content-center fw-bold mb-5">
              Login
            </div>
            <div className="row form-group">
              <label className="mb-2 h5">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter username"
                value={this.state.username}
                onChange={(event) => this.handleOnChangeUsername(event)}
              ></input>
              <label className="mb-2 h5 mt-4">Password</label>
              <div className="custom-input-password position-relative">
                <input
                  type={this.state.isShowPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter password"
                  value={this.state.password}
                  onChange={(event) => this.handleOnChangePassword(event)}
                ></input>
                <span onClick={() => this.handleShowHidePassword()}>
                  <i
                    className={
                      this.state.isShowPassword
                        ? "fa-regular fa-eye position-absolute icon-password-hider"
                        : "fa-regular fa-eye-slash position-absolute icon-password-hider"
                    }
                  ></i>
                </span>
              </div>
              <div className="row mt-4 w-100">
                <button
                  type="submit"
                  className="btn-login"
                  onClick={() => this.handleOnClickLogin()}
                >
                  Login
                </button>
              </div>
              <div className="row mt-3 text-center forgot-pw">
                <span>Forgot password?</span>
              </div>
              <div className="row text-center login-with">
                <span>May also signup with</span>
              </div>
              <div className="row social-login d-flex justify-content-center mt-3">
                <i className="fa-brands fa-google-plus-g google"></i>
                <i className="fa-brands fa-facebook facebook"></i>
                <i className="fa-brands fa-linkedin linkedin"></i>
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
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    adminLoginSuccess: (adminInfo) =>
      dispatch(actions.adminLoginSuccess(adminInfo)),
    adminLoginFail: () => dispatch(actions.adminLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
