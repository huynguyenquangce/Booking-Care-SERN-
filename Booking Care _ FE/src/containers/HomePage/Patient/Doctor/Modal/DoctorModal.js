import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./DoctorModal.scss";
import * as actions from "../../../../../store/actions";
import ProfileDoctor from "../ProfileDoctor";
import { postBookingPatient } from "../../../../../services/userService";
import { toast } from "react-toastify";
class DoctorModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idFromParent: "",
      timeObj: {},
      name_state: "",
      phone_state: "",
      email_state: "",
      address_state: "",
      note_state: "",
      who_state: "",
      gender_state: "",
      arr_gender: [],
      infoFromModal: {},
    };
  }
  handleOnChangeInput = (event, id) => {
    this.setState({
      [id]: event.target.value,
    });
  };
  async componentDidMount() {
    this.props.fetchGenderRedux();
    await this.setState({
      idFromParent: this.props.doctorId,
    });
    this.props.fetchShortDoctorInfo(this.props.doctorId);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.timeData !== this.props.timeData) {
      this.setState({
        timeObj: this.props.timeData,
      });
    }
    if (prevProps.genderRedux !== this.props.genderRedux) {
      this.setState({
        arr_gender: this.props.genderRedux,
        gender_state:
          this.props.genderRedux && this.props.genderRedux.length > 0
            ? this.props.genderRedux[0].keyMap
            : "",
      });
    }
    if (prevProps.doctorInfoRedux !== this.props.doctorInfoRedux) {
      this.setState({
        infoFromModal: this.props.doctorInfoRedux,
      });
    }
  }

  toggle = () => {
    this.props.toggleModalFromParent();
  };
  handleSaveBooking = async () => {
    let doctorName = "";
    if (
      this.state.infoFromModal &&
      this.state.infoFromModal.lastName &&
      this.state.infoFromModal.firstName
    ) {
      if (this.props.language === "vi") {
        doctorName =
          this.state.infoFromModal.lastName +
          " " +
          this.state.infoFromModal.firstName;
      } else {
        doctorName =
          this.state.infoFromModal.firstName +
          " " +
          this.state.infoFromModal.lastName;
      }
    }
    this.props.toggleModalFromParent();
    let res = await postBookingPatient({
      doctorId: this.props.doctorId,
      firstName: this.state.name_state,
      email: this.state.email_state,
      phoneNumber: this.state.phone_state,
      gender: this.state.gender_state,
      address: this.state.address_state,
      date: this.state.timeObj.date,
      timeType:
        this.props.language === "vi"
          ? this.state.timeObj.TimeData.valueVi
          : this.state.timeObj.TimeData.valueEn,
      time: this.state.timeObj.timeType,
      doctorName: doctorName,
      language: this.props.language,
    });
    if (res && res.errCode === 0) {
      toast.success("Success Booking");
      this.setState({
        name_state: "",
        phone_state: "",
        gender_state: this.props.genderRedux[0].keyMap,
        email_state: "",
        address_state: "",
        note_state: "",
        who_state: "",
      });
    } else {
      toast.error("Error booking");
    }
  };
  render() {
    let { timeObj, arr_gender } = this.state;
    let isOpen = this.props.isOpen;
    let { language } = this.props;
    return (
      <Modal
        isOpen={isOpen}
        toggle={() => {
          this.toggle();
        }}
        size="lg"
        className="modal-custom-schedule"
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
          className="d-flex justify-content-between"
        >
          <FormattedMessage id="homeheader.doctor_section.modal.title"></FormattedMessage>
        </ModalHeader>
        <ModalBody>
          <div className="modal-custom-schedule-body">
            <div className="doctor-section">
              <ProfileDoctor
                doctorId={this.props.doctorId}
                timeData={timeObj}
              ></ProfileDoctor>
            </div>
            <div className="input-container row mt-4">
              <div className="name-field col-6 d-flex flex-column">
                <label className="text-primary-customize">
                  {" "}
                  <FormattedMessage id="homeheader.doctor_section.modal.name"></FormattedMessage>
                </label>
                <input
                  type="text"
                  className="mt-1"
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "name_state")
                  }
                  value={this.state.name_state}
                ></input>
              </div>
              <div className="phone-field col-6 d-flex flex-column">
                <label className="text-primary-customize">
                  {" "}
                  <FormattedMessage id="homeheader.doctor_section.modal.phone"></FormattedMessage>
                </label>
                <input
                  type="text"
                  className="mt-1"
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "phone_state")
                  }
                  value={this.state.phone_state}
                ></input>
              </div>
            </div>
            <div className="input-container row mt-2">
              <div className="email-field col-6 d-flex flex-column">
                <label className="text-primary-customize">
                  {" "}
                  <FormattedMessage id="homeheader.doctor_section.modal.email"></FormattedMessage>
                </label>
                <input
                  type="email"
                  className="mt-1"
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "email_state")
                  }
                  value={this.state.email_state}
                ></input>
              </div>
              <div className="address-field col-6 d-flex flex-column">
                <label className="text-primary-customize">
                  {" "}
                  <FormattedMessage id="homeheader.doctor_section.modal.address"></FormattedMessage>
                </label>
                <input
                  type="text"
                  className="mt-1"
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "address_state")
                  }
                  value={this.state.address_state}
                ></input>
              </div>
            </div>
            <div className="input-container row mt-2">
              <div className="note-field col-12 d-flex flex-column">
                <label className="text-primary-customize">
                  <FormattedMessage id="homeheader.doctor_section.modal.note"></FormattedMessage>
                </label>
                <input
                  type="text"
                  className="mt-1"
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "note_state")
                  }
                  value={this.state.note_state}
                ></input>
              </div>
            </div>
            <div className="input-container row mt-2">
              <div className="who-field col-6 d-flex flex-column">
                <label className="text-primary-customize">
                  {" "}
                  <FormattedMessage id="homeheader.doctor_section.modal.who"></FormattedMessage>
                </label>
                <input
                  type="text"
                  className="mt-1"
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "who_state")
                  }
                  value={this.state.who_state}
                ></input>
              </div>
              <div className="gender-field col-3 d-flex flex-column">
                <label className="text-primary-customize">
                  {" "}
                  <FormattedMessage id="homeheader.doctor_section.modal.gender"></FormattedMessage>
                </label>
                <select
                  className="form-control gender-select"
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "gender_state")
                  }
                >
                  {arr_gender &&
                    arr_gender.length > 0 &&
                    arr_gender.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language && language === "vi"
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-4"
            onClick={() => this.handleSaveBooking()}
          >
            <FormattedMessage id="homeheader.doctor_section.modal.save"></FormattedMessage>
          </Button>
          <Button
            color="secondary"
            className="px-4"
            onClick={() => this.toggle()}
          >
            <FormattedMessage id="homeheader.doctor_section.modal.close-btn"></FormattedMessage>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    doctorInfoRedux: state.admin.shortInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGenderRedux: () => dispatch(actions.fetchGenderStart()),
    fetchShortDoctorInfo: (inputId) =>
      dispatch(actions.getShortDoctorInfoStart(inputId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorModal);
