import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./ModalUser.scss";
import { emitter } from "../../utils/emitter";
class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
    this.listenToEmitter();
  }

  listenToEmitter = () => {
    emitter.on("EVENT_CLEAR_USER_MODAL", () => {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
      });
    });
  };

  componentDidMount() {}
  toggle = () => {
    this.props.toggleModalFromParent();
  };

  // Add ID to use 1 function to all input fields
  handleOnChangeInput = (event, id) => {
    // Should copy state to new State and assign, then assign this.state to new State
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Please enter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };
  handleAddNewUser = async () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      // Send state data to parent
      this.props.getInputFromChild(this.state);
    }
  };
  render() {
    let isOpen = this.props.isOpen;
    return (
      <Modal
        isOpen={isOpen}
        toggle={() => {
          this.toggle();
        }}
        size="lg"
        className="modal-custom-addUser"
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Create a New User
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label>Email</label>
              <input
                type="text"
                onChange={(event) => this.handleOnChangeInput(event, "email")}
                value={this.state.email}
              ></input>
            </div>
            <div className="input-container">
              <label>Password</label>
              <input
                type="password"
                onChange={(event) =>
                  this.handleOnChangeInput(event, "password")
                }
                value={this.state.password}
              ></input>
            </div>
            <div className="input-container">
              <label>FirstName</label>
              <input
                type="text"
                onChange={(event) =>
                  this.handleOnChangeInput(event, "firstName")
                }
                value={this.state.firstName}
              ></input>
            </div>
            <div className="input-container">
              <label>LastName</label>
              <input
                type="text"
                onChange={(event) =>
                  this.handleOnChangeInput(event, "lastName")
                }
                value={this.state.lastName}
              ></input>
            </div>
            <div className="input-container max-width">
              <label>Address</label>
              <input
                type="text"
                onChange={(event) => this.handleOnChangeInput(event, "address")}
                value={this.state.address}
              ></input>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-4"
            onClick={() => this.handleAddNewUser()}
          >
            Add New
          </Button>{" "}
          <Button
            color="secondary"
            className="px-4"
            onClick={() => this.toggle()}
          >
            Close
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
