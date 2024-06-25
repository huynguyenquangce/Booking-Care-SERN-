import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./ModalUser.scss";
import { emitter } from "../../utils/emitter";
import { isEmpty } from "lodash";
class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
  }
  isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };
  componentDidMount() {
    let userEdit = this.props.userEdit;
    if (!isEmpty(userEdit)) {
      this.setState({
        id: userEdit.id,
        email: userEdit.email,
        password: "1232131233",
        firstName: userEdit.firstName,
        lastName: userEdit.lastName,
        address: userEdit.address,
      });
    } else {
    }
  }
  toggle = () => {
    this.props.toggleModalEditFromParent();
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

  handleUpdateUser = async () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      // Send state data to parent
      this.props.getInputFromChildToEditUser(this.state);
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
          Edit a User
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label>Email</label>
              <input
                type="text"
                onChange={(event) => this.handleOnChangeInput(event, "email")}
                value={this.state.email}
                disabled
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
                disabled
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
            onClick={() => this.handleUpdateUser()}
          >
            Update
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
