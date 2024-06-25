import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image from "../../../assets/images/specialty/xuong-khop.png";
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}

class Specialty extends Component {
  render() {
    function SampleNextArrow(props) {
      const { className, style, onClick } = props;
      return (
        <div
          className={className}
          style={{ ...style, display: "block", background: "red" }}
          onClick={onClick}
        />
      );
    }

    function SamplePrevArrow(props) {
      const { className, style, onClick } = props;
      return (
        <div
          className={className}
          style={{ ...style, display: "block", background: "green" }}
          onClick={onClick}
        />
      );
    }

    let settings = {
      // dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      // nextArrow: <SampleNextArrow />,
      // prevArrow: <SamplePrevArrow />,
    };
    return (
      <div className="specialty-container">
        <div className="specialty-content d-flex flex-column">
          <div className="specialty-header">
            <span>Chuyên khoa phổ biến</span>
            <span>Xem thêm</span>
          </div>
          <div className="specialty-body">
            <Slider {...settings}>
              <div className="img-customize">
                <img src={image}></img>
                <div>Chuyên nhóm cơ</div>
              </div>
              <div className="img-customize">
                <img src={image}></img>
                <div>Chuyên nhóm cơ</div>
              </div>
              <div className="img-customize">
                <img src={image}></img>
                <div>Chuyên nhóm cơ</div>
              </div>
              <div className="img-customize">
                <img src={image}></img>
                <div>Chuyên nhóm cơ</div>
              </div>
              <div className="img-customize">
                <img src={image}></img>
                <div>Chuyên nhóm cơ</div>
              </div>
              <div className="img-customize">
                <img src={image}></img>
                <div>Chuyên nhóm cơ</div>
              </div>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
