// import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
// import { connect } from "react-redux";
// import HomeHeader from "./HomeHeader";
// import Specialty from "./Section/Specialty";
// import Facility from "./Section/Facility";
// import Doctor from "./Section/Doctor";
// import HandBook from "./Section/HandBook";
// import About from "./Section/About";
// import "./HomePage.scss";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// class HomePage extends Component {
//   render() {
//     let settings = {
//       // dots: true,
//       infinite: false,
//       speed: 500,
//       slidesToShow: 4,
//       slidesToScroll: 2,
//     };
//     return (
//       <div>
//         <HomeHeader showBanner={true}></HomeHeader>
//         <Specialty settings={settings}></Specialty>
//         <Facility settings={settings}></Facility>
//         <Doctor settings={settings}></Doctor>
//         <HandBook settings={settings}></HandBook>
//         <About></About>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     isLoggedIn: state.user.isLoggedIn,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {};
// };

// export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import "./HomePage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Function to simulate lazy loading with delay
function lazyLoadComponent(importFunc, delay = 1000) {
  return class LazyComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        component: null,
      };
      setTimeout(() => {
        importFunc().then((module) => {
          this.setState({ component: module.default });
        });
      }, delay);
    }

    render() {
      const LazyComponent = this.state.component;
      return LazyComponent ? <LazyComponent {...this.props} /> : null;
    }
  };
}

// Lazy load các component với delay
const LazySpecialty = lazyLoadComponent(() => import("./Section/Specialty"));
const LazyFacility = lazyLoadComponent(() => import("./Section/Facility"));
const LazyDoctor = lazyLoadComponent(() => import("./Section/Doctor"));
const LazyHandBook = lazyLoadComponent(() => import("./Section/HandBook"));
const LazyAbout = lazyLoadComponent(() => import("./Section/About"));

class HomePage extends Component {
  render() {
    let settings = {
      // settings của Slider
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 2,
    };

    return (
      <div>
        <HomeHeader showBanner={true} />
        <Suspense fallback={<div>Loading...</div>}>
          <LazySpecialty settings={settings} />
          <LazyFacility settings={settings} />
          <LazyDoctor settings={settings} />
          <LazyHandBook settings={settings} />
          <LazyAbout />
        </Suspense>
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
