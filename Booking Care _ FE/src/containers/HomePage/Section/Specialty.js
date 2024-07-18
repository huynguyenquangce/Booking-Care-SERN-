import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import image from "../../../assets/images/specialty/xuong-khop.png";
import { changeLanguageApp } from "../../../store/actions/appActions";
import { getSpecialty } from "../../../services/userService";
import { withRouter } from "react-router";
class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      specialtyData: [],
    };
  }
  async componentDidMount() {
    let dataSpecialty = await getSpecialty("ALL");

    this.setState({
      specialtyData: dataSpecialty.specialtyData,
    });
  }
  changeLanguage = (language) => {
    //fire redux actions
    this.props.changeLanguageAppRedux(language);
  };
  handleViewDetailsSpecialty = (item) => {
    this.props.history.push(`/detail-specialty/id=${item.id}`);
  };
  render() {
    let { specialtyData } = this.state;
    return (
      <div className="specialty-container section-container">
        <div className="section-content d-flex flex-column">
          <div className="section-header mt-5 justify-content-between">
            <span className="h2">
              <FormattedMessage id="specialty.title" />
            </span>
            <span className="btn btn-primary p-3 justify-content-center align-items-center d-flex">
              <FormattedMessage id="specialty.extension-btn" />
            </span>
          </div>
          <div className="section-body mt-5">
            <Slider {...this.props.settings}>
              {specialtyData &&
                specialtyData.length > 0 &&
                specialtyData.map((item, index) => {
                  return (
                    <div
                      className="img-customize"
                      key={index}
                      onClick={() => this.handleViewDetailsSpecialty(item)}
                    >
                      <div className="item-specialty">
                        <img src={item.image}></img>
                        <div className="mt-4 text-center h5">{item.nameVi}</div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Specialty)
);
