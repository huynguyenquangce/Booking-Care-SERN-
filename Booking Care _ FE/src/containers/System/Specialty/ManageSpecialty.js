import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageSpecialty.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CommonUtils } from "../../../utils";
import { createSpecialty } from "../../../services/userService";
import { toast } from "react-toastify";
const mdParser = new MarkdownIt();
class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name_specialty: "",
      urlBase64: "",
      contentHTML: "",
      contentMarkdown: "",
    };
    this.fileInputRef = React.createRef(); // Create a ref for the file input
  }
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };
  saveSpecialty = async () => {
    console.log("check state", this.state);
    let res = await createSpecialty({
      name: this.state.name_specialty,
      image: this.state.urlBase64,
      contentMarkDown: this.state.contentMarkdown,
      contentHTML: this.state.contentHTML,
    });
    if (res && res.errCode === 0) {
      this.setState({
        name_specialty: "",
        urlBase64: "",
        contentHTML: "",
        contentMarkdown: "",
      });
      if (this.fileInputRef.current) {
        this.fileInputRef.current.value = null;
      }
      toast.success("Success creating specialty");
    } else {
      toast.error("Falied creating specialty");
    }
  };
  handleOnChangeInput = (event) => {
    this.setState({
      name_specialty: event.target.value,
    });
  };
  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.convertBase64(file);
      this.setState({
        urlBase64: base64,
      });
    }
  };
  render() {
    return (
      <div className="specialty-container">
        <div className="specialty-title text-center m-5 h3 fw-bold">
          Tạo thông tin chuyên khoa
        </div>
        <div className="ms-3 row">
          <div className="specialty-name col-5 d-flex flex-column">
            <label className="text-secondary h4">Tên chuyên khoa</label>
            <input
              type="text"
              className="form-control"
              value={this.state.name_specialty}
              onChange={(event) => this.handleOnChangeInput(event)}
            ></input>
          </div>
          <div className="specialty-image col-3">
            <label className="text-secondary h4">Chọn hình ảnh</label>
            <input
              ref={this.fileInputRef} // Attach ref to the file input
              class="form-control"
              type="file"
              onChange={(event) => this.handleOnChangeImage(event)}
            />
          </div>
        </div>
        <div>
          <div className="mt-5">
            <MdEditor
              style={{ height: "500px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.contentMarkdown}
            />
          </div>
        </div>
        <div
          className="btn btn-primary p-2 m-3 float-end"
          onClick={this.saveSpecialty}
        >
          Lưu thông tin
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
