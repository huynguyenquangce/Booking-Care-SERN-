import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { LANGUAGE } from "../../../utils/constant";
import * as actions from "../../../store/actions";

const mdParser = new MarkdownIt(/* Markdown-it options */);
// const options = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" },
// ];
class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: "",
      description: "",
      options: [],
    };
  }

  buildOptionSelect = (inputData) => {
    let result = [];
    let { language } = this.props.language;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let dataVi = `${item.lastName} ${item.firstName}`;
        let dataEn = `${item.firstName} ${item.lastName}`;
        object.label = language === LANGUAGE.Vi ? dataVi : dataEn;
        object.value = item.id;
        result.push(object);
      });
    }
  };
  componentDidMount() {
    this.props.getDoctorSelect();
    // let dataSelect = this.buildOptionSelect(this.props.arrDoctorSelect);
    // console.log("checker", dataSelect);
  }
  handleEditorChange = ({ html, text }) => {
    console.log("handleEditorChange", html, text);
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  saveContentMarkDown = () => {
    console.log("check state", this.state);
    this.setState({
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: "",
      description: "",
    });
  };
  handleChange = (selectedOption) => {
    this.setState({ selectedOption }, () =>
      console.log(`Option selected:`, this.state.selectedOption)
    );
  };
  handleChangeTextArea = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.arrDoctorSelect !== this.props.arrDoctorSelect) {
      let dataSelect = this.buildOptionSelect(this.props.arrDoctoSelect);
      console.log("Checking", this.props.arrDoctoSelect);
      this.setState({
        options: dataSelect,
      });
    }
  }
  render() {
    console.log("Check props", this.props.arrDoctoSelect);
    return (
      <div className="markdown-editor-container">
        <div className="markdown-editor-title text-center m-5 h2 text-primary">
          Markdown Doctor
        </div>
        <label className="ms-2 text-secondary h4">Thông tin thêm</label>
        <div className="more-info row mb-3 ms-2">
          <div data-mdb-input-init class="form-outline col-5">
            <textarea
              class="form-control"
              id="textAreaExample1"
              rows="5"
              onChange={(event) => this.handleChangeTextArea(event)}
              value={this.state.description}
            ></textarea>
          </div>
          <div className="col-2 select-doctor">
            <Select
              value={this.state.selectedOption}
              onChange={this.handleChange}
              options={this.state.options}
            />
          </div>
        </div>
        <div>
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>
        <div
          className="btn btn-primary p-2 m-3 float-end"
          onClick={() => this.saveContentMarkDown()}
        >
          Lưu thông tin
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    arrDoctorSelect: state.admin.doctorSelect,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDoctorSelect: () => dispatch(actions.fetchDoctorSelectStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
