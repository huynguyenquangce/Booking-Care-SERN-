import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./DoctorModal.scss";
import * as actions from "../../../../../store/actions";
import ProfileDoctor from "../ProfileDoctor";
import { postBookingPatient } from "../../../../../services/userService";
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
    };
  }
  handleOnChangeInput = (event, id) => {
    this.setState({
      [id]: event.target.value,
    });
  };
  componentDidMount() {
    this.setState({
      idFromParent: this.props.doctorId,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.timeData !== this.props.timeData) {
      this.setState({
        timeObj: this.props.timeData,
      });
    }
  }
  toggle = () => {
    this.props.toggleModalFromParent();
  };
  handleSaveBooking = () => {
    postBookingPatient({
      doctorId: this.state.idFromParent,
      firstName: this.state.name_state,
      email: this.state.email_state,
      phoneNumber: this.state.phoneNumber_state,
      gender: this.state.gender_state,
      address: this.state.address_state,
      date: this.state.timeObj.date,
      timeType: this.state.timeObj.timeType,
    });
  };
  render() {
    let { timeObj } = this.state;
    let isOpen = this.props.isOpen;
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
                doctorId={this.state.idFromParent}
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
              <div className="gender-field col-6 d-flex flex-column">
                <label className="text-primary-customize">
                  {" "}
                  <FormattedMessage id="homeheader.doctor_section.modal.gender"></FormattedMessage>
                </label>
                <input
                  type="text"
                  className="mt-1"
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "gender_state")
                  }
                  value={this.state.gender_state}
                ></input>
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorModal);
