import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { LANGUAGE } from "../../../utils/constant";
import * as actions from "../../../store/actions";
import { getDoctorInfo } from "../../../services/userService";
import "./ManageDoctor.scss";
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
      dataExist: false,
    };
  }

  buildOptionSelect = (inputData) => {
    let result = [];
    let languages = this.props.language;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let dataVi = `${item.lastName} ${item.firstName}`;
        let dataEn = `${item.firstName} ${item.lastName}`;
        object.label = languages === LANGUAGE.VI ? dataVi : dataEn;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };
  componentDidMount() {
    this.props.getDoctorSelect();
  }
  handleEditorChange = ({ html, text }) => {
    console.log("handleEditorChange", html, text);
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  saveContentMarkDown = () => {
    let { dataExist } = this.state;
    this.setState({
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: "",
      description: "",
    });
    this.props.createInfoDoctor({
      doctorId: this.state.selectedOption.value,
      contentMarkDown: this.state.contentMarkdown,
      contentHTML: this.state.contentHTML,
      description: this.state.description,
      actions: dataExist === false ? "CREATE" : "UPDATE",
    });
  };
  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedOption }, () => console.log(`Option selected:`));
    let dataDoctor = await getDoctorInfo(selectedOption.value);
    console.log("check state 1", dataDoctor);
    if (
      dataDoctor &&
      dataDoctor.errCode === 0 &&
      dataDoctor.data &&
      dataDoctor.data.MarkDown &&
      dataDoctor.data.MarkDown.contentHTML
    ) {
      this.setState({
        dataExist: true,
        contentMarkdown: dataDoctor.data.MarkDown.contentMarkDown,
        contentHTML: dataDoctor.data.MarkDown.contentHTML,
        description: dataDoctor.data.MarkDown.description,
      });
    } else {
      this.setState({
        dataExist: false,
        contentMarkdown: "",
        contentHTML: "",
        description: "",
      });
    }
    console.log("check state", this.state);
  };
  handleChangeTextArea = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.arrDoctorSelect !== this.props.arrDoctorSelect) {
      let dataSelects = this.buildOptionSelect(this.props.arrDoctorSelect);
      this.setState({
        options: dataSelects,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelects = this.buildOptionSelect(this.props.arrDoctorSelect);
      this.setState({
        options: dataSelects,
      });
    }
  }
  render() {
    return (
      <div className="markdown-editor-container">
        <div className="markdown-editor-title text-center m-5 h3 text-primary fw-bold">
          <FormattedMessage id="doctor.info-title"></FormattedMessage>
        </div>
        <label className="ms-2 text-secondary h4">
          {" "}
          <FormattedMessage id="doctor.select"></FormattedMessage>
        </label>
        <div className="more-info row mb-3 ms-2">
          <div className="col-3 select-doctor">
            <Select
              value={this.state.selectedOption}
              onChange={this.handleChangeSelect}
              options={this.state.options}
            />
          </div>
          <div data-mdb-input-init class="form-outline col-5">
            <textarea
              class="form-control"
              id="textAreaExample1"
              rows="5"
              onChange={(event) => this.handleChangeTextArea(event)}
              value={this.state.description}
            ></textarea>
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
          {this.state.dataExist == true ? "Sửa thông tin" : "Lưu thông tin"}
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
    createInfoDoctor: (data) => dispatch(actions.createDoctorInfoStart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
