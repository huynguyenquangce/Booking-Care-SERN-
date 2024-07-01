import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import { getAllCodeData } from "../../../services/userService";
import { get } from "lodash";
import * as actions from "../../../store/actions";
import "./UserReduxModal.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app
import CommonUtils from "../../../utils/CommonUtils";
class UserReduxModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImageURL: "",
      // For user saving
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      position: "",
      role: "",
      avatarURL: "",
    };
  }

  componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }

  // Compare current props vs props previous, then set state to genderArr
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGender = this.props.genderRedux;
      this.setState({
        // TH người dùng k chọn gì cả, xử lí lấy giá trị mặc định
        genderArr: arrGender,
        gender: arrGender && arrGender.length > 0 ? arrGender[0].key : " ",
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPosition = this.props.positionRedux;
      this.setState({
        positionArr: arrPosition,
        position:
          arrPosition && arrPosition.length > 0 ? arrPosition[0].key : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRole = this.props.roleRedux;
      this.setState({
        roleArr: arrRole,
        role: arrRole && arrRole.length > 0 ? arrRole[0].key : "",
      });
    }
  }

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.convertBase64(file);
      let objectURL = URL.createObjectURL(file);
      this.setState({
        previewImageURL: objectURL,
        avatarURL: base64,
      });
    }
  };

  handleOnShowImage = () => {
    this.setState({
      isOpen: true,
    });
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrInput = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
      "address",
      "gender",
      "role",
      "position",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Please enter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };
  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    console.log(copyState);
    this.setState({
      ...copyState,
    });
  };
  handleOnClickSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (!isValid) {
      return;
    }
    this.props.createNewUser({
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      gender: this.state.gender,
      phoneNumber: this.state.phoneNumber,
      roleId: this.state.role,
      positionId: this.state.position,
      image: this.state.avatarURL,
    });
    // Process the async when saving user and updating table
    setTimeout(() => {
      this.props.getAllUser("ALL");
    }, 1000);
  };

  // For modal
  toggle = () => {
    this.props.toggleModalFromParent();
  };

  render() {
    let language = this.props.language;
    let genders = this.state.genderArr;
    let positions = this.state.positionArr;
    let roles = this.state.roleArr;
    let {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      gender,
      position,
      role,
      avatarURL,
    } = this.state;

    let isOpen = this.props.isOpen;
    return (
      <Modal
        isOpen={isOpen}
        toggle={() => {
          this.toggle();
        }}
        size="lg"
        className="user-redux-modal"
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Create a New User
        </ModalHeader>
        <div className="user-redux-container mt-3">
          <div className="user-redux-body">
            <div className="container">
              <form class="row g-3">
                <div class="col-md-6">
                  <label for="inputEmail4" class="form-label">
                    <FormattedMessage id="manage-user.email"></FormattedMessage>
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="inputEmail4"
                    onChange={(event) => this.onChangeInput(event, "email")}
                    value={email}
                  />
                </div>
                <div class="col-md-6">
                  <label for="inputPassword4" class="form-label">
                    <FormattedMessage id="manage-user.password"></FormattedMessage>
                  </label>
                  <input
                    type="password"
                    class="form-control"
                    id="inputPassword4"
                    onChange={(event) => this.onChangeInput(event, "password")}
                    value={password}
                  />
                </div>
                <div class="col-6">
                  <label for="inputfirstName" class="form-label">
                    <FormattedMessage id="manage-user.first-name"></FormattedMessage>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="inputfirstName"
                    placeholder="Huy"
                    onChange={(event) => this.onChangeInput(event, "firstName")}
                    value={firstName}
                  />
                </div>
                <div class="col-6">
                  <label for="inputLastName" class="form-label">
                    <FormattedMessage id="manage-user.last-name"></FormattedMessage>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="inputLastName"
                    placeholder="Nguyen"
                    onChange={(event) => this.onChangeInput(event, "lastName")}
                    value={lastName}
                  />
                </div>
                <div class="col-5">
                  <label for="inputPhoneNumber" class="form-label">
                    <FormattedMessage id="manage-user.phone-number"></FormattedMessage>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="inputPhoneNumber"
                    placeholder="034476xxxx"
                    onChange={(event) =>
                      this.onChangeInput(event, "phoneNumber")
                    }
                    value={phoneNumber}
                  />
                </div>
                <div class="col-7">
                  <label for="inputAddress" class="form-label">
                    <FormattedMessage id="manage-user.address"></FormattedMessage>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="inputAddress"
                    placeholder="Apartment, studio, or floor"
                    onChange={(event) => this.onChangeInput(event, "address")}
                    value={address}
                  />
                </div>
                <div class="col-md-3">
                  <label for="inputGender" class="form-label">
                    <FormattedMessage id="manage-user.gender"></FormattedMessage>
                  </label>
                  <select
                    id="inputGender"
                    class="form-select"
                    onChange={(event) => this.onChangeInput(event, "gender")}
                  >
                    {genders &&
                      genders.length > 0 &&
                      genders.map((item, index) => {
                        return (
                          <option key={index} value={item.key}>
                            {language && language === "vi"
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div class="col-md-3">
                  <label for="inputRoleId" class="form-label">
                    <FormattedMessage id="manage-user.role"></FormattedMessage>
                  </label>
                  <select
                    id="inputRoleId"
                    class="form-select"
                    onChange={(event) => this.onChangeInput(event, "role")}
                    value={role}
                  >
                    {roles &&
                      roles.length > 0 &&
                      roles.map((item, index) => {
                        return (
                          <option key={index} value={item.key}>
                            {language && language === "vi"
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div class="col-md-3">
                  <label for="inputPosition" class="form-label">
                    <FormattedMessage id="manage-user.position"></FormattedMessage>
                  </label>
                  <select
                    id="inputPosition"
                    class="form-select"
                    onChange={(event) => this.onChangeInput(event, "position")}
                  >
                    {positions &&
                      positions.length > 0 &&
                      positions.map((item, index) => {
                        return (
                          <option key={index} value={item.key}>
                            {language && language === "vi"
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div class="col-md-3">
                  <label for="inputImage" class="form-label">
                    <FormattedMessage id="manage-user.image"></FormattedMessage>
                  </label>
                  <div className="w-100 ">
                    <input
                      type="file"
                      class="form-control"
                      id="inputImage"
                      placeholder="url Image"
                      onChange={(event) => this.handleOnChangeImage(event)}
                      // hidden
                    />
                    {/* <label htmlFor="inputImage">Tải ảnh</label> */}
                    <div
                      className="preview-image mt-3"
                      style={{
                        backgroundImage: `url(${this.state.previewImageURL})`,
                        width: "100%",
                        backgroundSize: "contain", // Ensures the image covers the entire div
                        backgroundPosition: "center", // Centers the image
                        backgroundRepeat: "no-repeat", // Prevents the image from repeating
                      }}
                      onClick={() => this.handleOnShowImage()}
                    ></div>
                  </div>
                </div>
                <ModalFooter>
                  <div class="col-12">
                    <button
                      onClick={() => this.handleOnClickSaveUser()}
                      class="btn btn-primary"
                    >
                      <FormattedMessage id="manage-user.save"></FormattedMessage>
                    </button>
                  </div>
                </ModalFooter>
              </form>
            </div>
          </div>
        </div>
        {this.state.isOpen && (
          <Lightbox
            mainSrc={this.state.previewImageURL}
            onCloseRequest={() => this.setState({ isOpen: false })}
            wrapperClassName="custom-lightbox"
          />
        )}
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    roleRedux: state.admin.roles,
    positionRedux: state.admin.position,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUsers(data)),
    // For updating table when adding new users
    getAllUser: (data) => dispatch(actions.getAllUsersAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserReduxModal);
