import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserRedux.scss";
import UserReduxModal from "./UserReduxModal";
import * as actions from "../../../store/actions";
import UserReduxEditModal from "./UserReduxEditModal";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
      arrUser: [],
      isOpenEditModal: false,
      userEdit: [],
    };
  }

  componentDidMount() {
    this.props.getAllUser("ALL");
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listUser !== this.props.listUser) {
      this.setState({
        arrUser: this.props.listUser,
      });
    }
  }

  handleOnClickButtonModalRedux = () => {
    this.setState({ isOpenModal: true });
  };

  // Trường hợp muốn tắt mở modal
  toggleModal = () => {
    this.setState({ isOpenModal: !this.state.isOpenModal });
  };

  // Trường hợp on/off edit modal
  toggleEditModal = () => {
    this.setState({
      isOpenEditModal: !this.state.isOpenEditModal,
    });
  };

  // delete user
  handleDeleteUser = (user) => {
    if (user) {
      this.props.deleteUser(user.id);
      setTimeout(() => {
        this.props.getAllUser("ALL");
      }, 100);
    } else {
      console.log("Missing id user");
    }
    // Update table User after delete
  };

  // edit user
  handleEditUser = (user) => {
    console.log(user);
    this.setState({
      isOpenEditModal: true,
      userEdit: user,
    });
  };

  // function to send a empty function to get data from child
  getDataFromChild = async (user) => {
    console.log(user);
    // try {
    //   let message = await updateUser(user);
    //   if (message && message.errCode === 0) {
    //     await this.callAPIgetAllUsers();
    //     this.setState({ isOpenModalEdit: false });
    //   } else {
    //     alert(message.errMessage);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  render() {
    let arrUsers = this.state.arrUser;
    return (
      <div className="list-user-redux-container">
        <UserReduxModal
          isOpen={this.state.isOpenModal}
          toggleModalFromParent={this.toggleModal}
          // getInputFromChild={this.getInputFromChild}
        ></UserReduxModal>
        <UserReduxEditModal
          isOpen={this.state.isOpenEditModal}
          toggleModalFromParent={this.toggleEditModal}
          userEdit={this.state.userEdit}
          getDataFromChild={this.getDataFromChild}
        ></UserReduxEditModal>
        <div className="text-center title">
          <FormattedMessage id="manage-user.title"></FormattedMessage>
        </div>
        <div className="user-modal-button mx-1 mt-3">
          <button
            className="btn px-3 btn-primary text-center"
            onClick={() => this.handleOnClickButtonModalRedux()}
          >
            Create a new user
          </button>
        </div>
        <table className="user-table w-100 mx-1 mt-3">
          <tbody>
            <tr>
              <th className="text-center">Email</th>
              <th className="text-center">FirstName</th>
              <th className="text-center">LastName</th>
              <th className="text-center">Address</th>
              <th className="text-center">Action</th>
            </tr>
            {arrUsers &&
              arrUsers.length > 0 &&
              arrUsers.map((item, index) => {
                return (
                  <tr>
                    <td> {item.email}</td>
                    <td>{item.firstName}</td>
                    <td> {item.lastName}</td>
                    <td>{item.address}</td>
                    <td className="text-center">
                      <button
                        className="mx-2 btn-danger"
                        onClick={() => this.handleDeleteUser(item)}
                      >
                        <i className="fa-solid fa-trash">Delete</i>
                      </button>
                      <button
                        className="mx-2 btn-primary"
                        onClick={() => this.handleEditUser(item)}
                      >
                        <i className="fa-solid fa-user-pen">Edit</i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUser: state.admin.allUser,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUser: (data) => dispatch(actions.getAllUsersAction(data)),
    deleteUser: (data) => dispatch(actions.deleteUserStart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
