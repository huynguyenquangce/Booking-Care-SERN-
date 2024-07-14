import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import HomeHeader from "../HomeHeader";
import { verifyEmailBooking } from "../../../services/userService";
class VerifyEmailBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      errcode: "",
    };
  }

  async componentDidMount() {
    const queryParams = new URLSearchParams(this.props.location.search);
    const token = queryParams.get("token");
    const doctorId = queryParams.get("doctorId");
    // call api check in booking table
    console.log("checker", doctorId);
    let res = await verifyEmailBooking({
      inputToken: token,
      inputDoctorId: doctorId,
    });
    this.setState({
      message: res.errMessage,
      errcode: res.errCode,
    });
  }
  render() {
    return (
      <>
        <HomeHeader></HomeHeader>
        <div className="mt-5 text-primary h4 text-center">
          {this.state.message}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmailBooking);
