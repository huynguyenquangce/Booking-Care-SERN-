import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailsSpecialty.scss";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router-dom";
import { LANGUAGE } from "../../../../utils";
import HomeHeader from "../../HomeHeader";
import { getSpecialty } from "../../../../services/userService";

class DetailsSpecialty extends Component {
  constructor(props) {
    super(props);
    const { location } = this.props;
    const match = location.pathname.match(/id=(\d+)/);
    const id = match ? match[1] : null;
    this.state = {
      idFromURL: id,
      specialtyData: {},
      showFullDescription: false,
      initialLines: 12,
    };
  }

  async componentDidMount() {
    console.log("hello from detail");
    let result = await getSpecialty(this.state.idFromURL);
    this.setState({
      specialtyData: result.specialtyData,
    });
    console.log("check 17", this.state.specialtyData);
  }

  toggleDescription = () => {
    this.setState((prevState) => ({
      showFullDescription: !prevState.showFullDescription,
    }));
  };

  render() {
    let { specialtyData, showFullDescription, initialLines } = this.state;
    let descriptionHTML = specialtyData.descriptionHTML || "";

    let displayedContent;
    if (!showFullDescription && descriptionHTML) {
      let lines = descriptionHTML.split("\n");
      let limitedContent = lines.slice(0, initialLines).join("\n");
      displayedContent = limitedContent;
    } else {
      displayedContent = descriptionHTML;
    }

    return (
      <>
        <HomeHeader />
        <div className="specialty-container">
          <div className="specialty-description container mt-5">
            <div
              className="specialty-description-content"
              dangerouslySetInnerHTML={{ __html: displayedContent }}
            ></div>
            {descriptionHTML && (
              <p className="text-primary" onClick={this.toggleDescription}>
                {showFullDescription ? "Ẩn bớt" : "Xem thêm"}
              </p>
            )}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailsSpecialty)
);
