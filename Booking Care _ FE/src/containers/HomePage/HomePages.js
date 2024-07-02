import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import Specialty from "./Section/Specialty";
import Facility from "./Section/Facility";
import Doctor from "./Section/Doctor";
import HandBook from "./Section/HandBook";
import About from "./Section/About";
import "./HomePage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class HomePage extends Component {
  render() {
    let settings = {
      // dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 2,
    };
    return (
      <div>
        <HomeHeader showBanner={true}></HomeHeader>
        <Specialty settings={settings}></Specialty>
        <Facility settings={settings}></Facility>
        <Doctor settings={settings}></Doctor>
        <HandBook settings={settings}></HandBook>
        <About></About>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
