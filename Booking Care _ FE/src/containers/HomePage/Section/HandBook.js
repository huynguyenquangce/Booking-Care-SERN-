import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./HandBook.scss";
import Slider from "react-slick";
import image from "../../../assets/images/facility/bv108.jpg";
class HandBook extends Component {
  render() {
    return (
      <div className="section-container">
        <div className="section-content d-flex flex-column">
          <div className="section-header mt-5 justify-content-between">
            <span className="h2">Cẩm nang</span>
            <span className="btn btn-primary p-4 justify-content-center align-items-center d-flex">
              Xem thêm
            </span>
          </div>
          <div className="section-body mt-5">
            <Slider {...this.props.settings}>
              <div className="img-customize">
                <img src={image}></img>
                <div>Thể thao</div>
              </div>
              <div className="img-customize">
                <img src={image}></img>
                <div>Thể thao</div>
              </div>
              <div className="img-customize">
                <img src={image}></img>
                <div>Thể thao</div>
              </div>
              <div className="img-customize">
                <img src={image}></img>
                <div>Thể thao</div>
              </div>
              <div className="img-customize">
                <img src={image}></img>
                <div>Thể thao</div>
              </div>
              <div className="img-customize">
                <img src={image}></img>
                <div>Thể thao</div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
