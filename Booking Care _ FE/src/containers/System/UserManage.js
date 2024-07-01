import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
  getAllUsers,
  createNewUser,
  deleteUser,
  updateUser,
} from "../../services/userService";
import { get } from "lodash";
import ModalUser from "./ModalUser";
import { emitter } from "../../utils/emitter";
import ModalEditUser from "./ModalEditUser";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUser: [],
      isOpenModal: false,
      isOpenModalEdit: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    await this.callAPIgetAllUsers();
  }

  // Call API function
  callAPIgetAllUsers = async () => {
    let respone = await getAllUsers("ALL");
    if (respone && respone.errCode === 0) {
      await this.setState({
        arrUser: respone.user,
      });
    }
  };
  //////////////////////////////
  handleOnClickButtonModal = () => {
    this.setState({
      isOpenModal: true,
    });
  };

  toggleModal = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
    });
  };

  toggleModalEdit = () => {
    this.setState({
      isOpenModalEdit: !this.state.isOpenModalEdit,
    });
  };

  getInputFromChild = async (data) => {
    try {
      let message = await createNewUser(data);
      if (message && message.errCode !== 0) {
        alert(message.errMessage);
      } else {
        await this.callAPIgetAllUsers();
        this.setState({ isOpenModal: false });
        emitter.emit("EVENT_CLEAR_USER_MODAL");
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleDeleteUser = async (user) => {
    try {
      let message = await deleteUser(user.id);
      if (message && message.errCode === 0) {
        await this.callAPIgetAllUsers();
      } else {
        alert("Error when deleting user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleEditUser = async (user) => {
    this.setState({ isOpenModalEdit: true, userEdit: user });
  };
  getInputFromChildToEditUser = async (data) => {
    try {
      let message = await updateUser(data);
      if (message && message.errCode === 0) {
        await this.callAPIgetAllUsers();
        this.setState({ isOpenModalEdit: false });
      } else {
        alert(message.errMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Chú ý, khi truyền props từ cha sang con, nó sẽ truyền ngay từ khi run chương trình, sau đó sẽ không truyền
  //nữa mặc cho cha có thay đổi ở state để truyền biến state đó cho con, cho nên ta phải thêm điều kiện hiển
  // thị trong ModalEditUser
  render() {
    let arrUser = this.state.arrUser;
    return (
      <div className="user-container m-1">
        <ModalUser
          isOpen={this.state.isOpenModal}
          toggleModalFromParent={this.toggleModal}
          getInputFromChild={this.getInputFromChild}
        ></ModalUser>
        {this.state.isOpenModalEdit && (
          <ModalEditUser
            isOpen={this.state.isOpenModalEdit}
            toggleModalEditFromParent={this.toggleModalEdit}
            userEdit={this.state.userEdit}
            getInputFromChildToEditUser={this.getInputFromChildToEditUser}
          ></ModalEditUser>
        )}
        <div className="title text-center">Manage User Booking Care</div>
        <div className="user-modal-button mx-1 mt-3">
          <button
            className="btn px-3 btn-primary text-center"
            onClick={() => this.handleOnClickButtonModal()}
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
            {arrUser &&
              arrUser.length > 0 &&
              arrUser.map((item, index) => {
                return (
                  <tr>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td className="text-center">
                      <button
                        className="mx-2 btn-danger"
                        onClick={() => this.handleDeleteUser(item)}
                      >
                        <i className="fa-solid fa-trash">Delete</i>
                      </button>
                      <button
                        className="mx-2"
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
