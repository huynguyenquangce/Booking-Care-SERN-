// import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
// import { connect } from "react-redux";
// import MarkdownIt from "markdown-it";
// import MdEditor from "react-markdown-editor-lite";
// import "react-markdown-editor-lite/lib/index.css";
// import Select from "react-select";
// import { LANGUAGE } from "../../../utils/constant";
// import * as actions from "../../../store/actions";
// import { getDoctorInfo } from "../../../services/userService";
// import "./ManageDoctor.scss";
// const mdParser = new MarkdownIt();

// class ManageDoctor extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       contentMarkdown: "",
//       contentHTML: "",
//       selectedOption: "",
//       selectedProvinceOption: "",
//       selectedPriceOption: "",
//       description: "",
//       options: [],
//       province_options: [],
//       price_options: [],
//       dataExist: false,
//     };
//   }
//   // For Doctor select name
//   buildOptionSelect = (inputData) => {
//     let result = [];
//     let languages = this.props.language;
//     if (inputData && inputData.length > 0) {
//       inputData.map((item, index) => {
//         let object = {};
//         let dataVi = `${item.lastName} ${item.firstName}`;
//         let dataEn = `${item.firstName} ${item.lastName}`;
//         object.label = languages === LANGUAGE.VI ? dataVi : dataEn;
//         object.value = item.id;
//         result.push(object);
//       });
//     }
//     return result;
//   };

//   // For other select
//   buildOptionOtherSelect = (inputData) => {
//     let result = [];
//     let languages = this.props.language;
//     if (inputData && inputData.length > 0) {
//       inputData.map((item, index) => {
//         let object = {};
//         let dataVi = item.valueVi;
//         let dataEn = item.valueEn;
//         object.label = languages === LANGUAGE.VI ? dataVi : dataEn;
//         object.value = item.id;
//         result.push(object);
//       });
//     }
//     return result;
//   };

//   handleEditorChange = ({ html, text }) => {
//     console.log("handleEditorChange", html, text);
//     this.setState({
//       contentMarkdown: text,
//       contentHTML: html,
//     });
//   };

//   saveContentMarkDown = () => {
//     let { dataExist } = this.state;
//     this.setState({
//       contentMarkdown: "",
//       contentHTML: "",
//       selectedOption: "",
//       description: "",
//     });
//     this.props.createInfoDoctor({
//       doctorId: this.state.selectedOption.value,
//       contentMarkDown: this.state.contentMarkdown,
//       contentHTML: this.state.contentHTML,
//       description: this.state.description,
//       actions: dataExist === false ? "CREATE" : "UPDATE",
//     });
//   };
//   // For doctor select
//   handleChangeSelect = async (selectedOption) => {
//     this.setState({ selectedOption }, () => console.log(`Option selected:`));
//     let dataDoctor = await getDoctorInfo(selectedOption.value);
//     if (
//       dataDoctor &&
//       dataDoctor.errCode === 0 &&
//       dataDoctor.data &&
//       dataDoctor.data.MarkDown &&
//       dataDoctor.data.MarkDown.contentHTML
//     ) {
//       this.setState({
//         dataExist: true,
//         contentMarkdown: dataDoctor.data.MarkDown.contentMarkDown,
//         contentHTML: dataDoctor.data.MarkDown.contentHTML,
//         description: dataDoctor.data.MarkDown.description,
//       });
//     } else {
//       this.setState({
//         dataExist: false,
//         contentMarkdown: "",
//         contentHTML: "",
//         description: "",
//       });
//     }
//   };

//   // for province select
//   handleChangeProvinceSelect = async (selectedProvinceOption) => {
//     this.setState({ selectedProvinceOption }, () =>
//       console.log(`Option selected:`)
//     );
//   };
//   // for price select
//   handleChangePriceSelect = async (selectedPriceOption) => {
//     this.setState({ selectedPriceOption }, () =>
//       console.log(`Option selected:`)
//     );
//   };
//   handleChangeTextArea = (event) => {
//     this.setState({
//       description: event.target.value,
//     });
//   };
//   componentDidMount() {
//     this.props.getDoctorSelect();
//     this.props.fetchProvince();
//     this.props.fetchPrice();
//   }
//   componentDidUpdate(prevProps, prevState, snapshot) {
//     if (prevProps.arrDoctorSelect !== this.props.arrDoctorSelect) {
//       let dataSelects = this.buildOptionSelect(this.props.arrDoctorSelect);
//       this.setState({
//         options: dataSelects,
//       });
//     }
//     if (prevProps.arrProvinceSelect !== this.props.arrProvinceSelect) {
//       let provinceSelects = this.buildOptionOtherSelect(
//         this.props.arrProvinceSelect
//       );
//       this.setState({
//         province_options: provinceSelects,
//       });
//     }
//     if (prevProps.arrPriceSelect !== this.props.arrPriceSelect) {
//       let priceSelects = this.buildOptionOtherSelect(this.props.arrPriceSelect);
//       this.setState({
//         price_options: priceSelects,
//       });
//     }

//     // Chung
//     if (prevProps.language !== this.props.language) {
//       let dataSelects = this.buildOptionSelect(this.props.arrDoctorSelect);
//       let provinceSelects = this.buildOptionOtherSelect(
//         this.props.arrProvinceSelect
//       );
//       let priceSelects = this.buildOptionOtherSelect(this.props.arrPriceSelect);
//       this.setState({
//         options: dataSelects,
//         province_options: provinceSelects,
//         price_options: priceSelects,
//       });
//     }
//   }
//   render() {
//     return (
//       <div className="markdown-editor-container">
//         <div className="markdown-editor-title text-center m-5 h3 text-primary fw-bold">
//           <FormattedMessage id="doctor.info-title"></FormattedMessage>
//         </div>

//         <div className="more-info mb-3 ms-2">
//           <div className="row">
//             <div className="col-3 select-doctor">
//               <label className="text-secondary h4">
//                 {" "}
//                 <FormattedMessage id="doctor.select"></FormattedMessage>
//               </label>
//               <Select
//                 value={this.state.selectedOption}
//                 onChange={this.handleChangeSelect}
//                 options={this.state.options}
//               />
//             </div>
//             <div data-mdb-input-init class="form-outline col-5">
//               <label className="text-secondary h4">
//                 {" "}
//                 <FormattedMessage id="doctor.description"></FormattedMessage>
//               </label>
//               <textarea
//                 class="form-control"
//                 id="textAreaExample1"
//                 rows="5"
//                 onChange={(event) => this.handleChangeTextArea(event)}
//                 value={this.state.description}
//               ></textarea>
//             </div>
//             <div className="province_zone col-3">
//               <label className="text-secondary h4">
//                 {" "}
//                 <FormattedMessage id="doctor.select-province-title"></FormattedMessage>
//               </label>
//               <Select
//                 value={this.state.selectedProvinceOption}
//                 onChange={this.handleChangeProvinceSelect}
//                 options={this.state.province_options}
//               />
//             </div>
//           </div>
//           <div className="row mt-5">
//             <div className="price_zone col-3">
//               <label className="text-secondary h4">
//                 {" "}
//                 <FormattedMessage id="doctor.select-care-price-title"></FormattedMessage>
//               </label>
//               <Select
//                 value={this.state.selectedPriceOption}
//                 onChange={this.handleChangePriceSelect}
//                 options={this.state.price_options}
//               />
//             </div>
//           </div>
//           <div className="row">
//             <div className="payment_zone col-5"></div>
//             <div className="address_clinic_zone col-5"></div>
//           </div>
//           <div className="row">
//             <div className="name_clinic_zone col-5"></div>
//             <div className="doctor_note_zone col-5"></div>
//           </div>
//         </div>

//         <div>
//           <MdEditor
//             style={{ height: "500px" }}
//             renderHTML={(text) => mdParser.render(text)}
//             onChange={this.handleEditorChange}
//             value={this.state.contentMarkdown}
//           />
//         </div>
//         <div
//           className="btn btn-primary p-2 m-3 float-end"
//           onClick={() => this.saveContentMarkDown()}
//         >
//           {this.state.dataExist == true ? "Sửa thông tin" : "Lưu thông tin"}
//         </div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     language: state.app.language,
//     arrDoctorSelect: state.admin.doctorSelect,
//     arrProvinceSelect: state.admin.provinces,
//     arrPriceSelect: state.admin.prices,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getDoctorSelect: () => dispatch(actions.fetchDoctorSelectStart()),
//     createInfoDoctor: (data) => dispatch(actions.createDoctorInfoStart(data)),
//     fetchProvince: () => dispatch(actions.fetchProvinceStart()),
//     fetchPrice: () => dispatch(actions.fetchPriceStart()),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);

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

const mdParser = new MarkdownIt();
// format price
const USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});
class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: "",
      selectedProvinceOption: "",
      selectedPriceOption: "",
      selectedPaymentOption: "",
      description: "",
      options: [],
      province_options: [],
      price_options: [],
      payment_options: [],
      dataExist: false,
    };
  }

  componentDidMount() {
    this.props.getDoctorSelect();
    this.props.fetchProvince();
    this.props.fetchPrice();
    this.props.fetchPayment();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.arrDoctorSelect !== this.props.arrDoctorSelect) {
      let dataSelects = this.buildOptionSelect(this.props.arrDoctorSelect);
      this.setState({
        options: dataSelects,
      });
    }
    if (prevProps.arrProvinceSelect !== this.props.arrProvinceSelect) {
      this.updateOptions("province_options", this.props.arrProvinceSelect);
    }
    if (prevProps.arrPriceSelect !== this.props.arrPriceSelect) {
      this.updateOptions("price_options", this.props.arrPriceSelect);
    }
    if (prevProps.arrPaymentSelect !== this.props.arrPaymentSelect) {
      this.updateOptions("payment_options", this.props.arrPaymentSelect);
    }
    if (prevProps.language !== this.props.language) {
      let dataSelects = this.buildOptionSelect(this.props.arrDoctorSelect);
      this.setState({
        options: dataSelects,
      });
      this.updateOptions("province_options", this.props.arrProvinceSelect);
      this.updateOptions(
        "price_options",
        this.props.arrPriceSelect,
        "price_icon"
      );
      this.updateOptions("payment_options", this.props.arrPaymentSelect);
    }
  }
  updateOptions = (stateKey, data, priceIcon = null) => {
    const isPriceOptions = stateKey === "price_options";
    const transformedOptions = this.buildOptions(
      data,
      isPriceOptions ? "price_icon" : null
    );
    this.setState({ [stateKey]: transformedOptions });
  };

  // For Doctor select name
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

  buildOptions = (inputData, action = "none") => {
    const { language } = this.props;

    return inputData.map((item) => {
      let label;
      if (action === "price_icon") {
        // Customize the label based on the action
        label =
          language === LANGUAGE.VI
            ? VND.format(item.valueVi)
            : USDollar.format(item.valueEn);
      } else {
        label = language === LANGUAGE.VI ? item.valueVi : item.valueEn;
      }

      return {
        label: label,
        value: item.keyMap,
      };
    });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  saveContentMarkDown = () => {
    const {
      selectedOption,
      contentMarkdown,
      contentHTML,
      description,
      dataExist,
    } = this.state;
    this.setState({
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: "",
      description: "",
    });
    this.props.createInfoDoctor({
      doctorId: selectedOption.value,
      contentMarkDown: contentMarkdown,
      contentHTML: contentHTML,
      description: description,
      actions: dataExist ? "UPDATE" : "CREATE",
    });
  };
  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedOption });
    try {
      const dataDoctor = await getDoctorInfo(selectedOption.value);
      if (
        dataDoctor?.errCode === 0 &&
        dataDoctor?.data?.MarkDown?.contentHTML
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
    } catch (error) {
      console.error("Failed to fetch doctor info:", error);
    }
  };

  handleChange = (key) => (selectedOption) => {
    this.setState({ [key]: selectedOption });
  };

  handleChangeTextArea = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  render() {
    console.log("check state", this.state);
    const {
      options,
      province_options,
      price_options,
      payment_options,
      selectedOption,
      selectedProvinceOption,
      selectedPriceOption,
      selectedPaymentOption,
      contentMarkdown,
      description,
      dataExist,
    } = this.state;

    return (
      <div className="markdown-editor-container">
        <div className="markdown-editor-title text-center m-5 h3 text-primary fw-bold">
          <FormattedMessage id="doctor.info-title" />
        </div>
        <div className="more-info mb-3 ms-2">
          <div className="row">
            <div className="col-3 select-doctor">
              <label className="text-secondary h4">
                <FormattedMessage id="doctor.select" />
              </label>
              <Select
                value={selectedOption}
                onChange={this.handleChangeSelect}
                options={options}
              />
            </div>
            <div className="form-outline col-5">
              <label className="text-secondary h4">
                <FormattedMessage id="doctor.description" />
              </label>
              <textarea
                className="form-control"
                rows="5"
                onChange={this.handleChangeTextArea}
                value={description}
              />
            </div>
            <div className="col-3 province_zone">
              <label className="text-secondary h4">
                <FormattedMessage id="doctor.select-province-title" />
              </label>
              <Select
                value={selectedProvinceOption}
                onChange={this.handleChange("selectedProvinceOption")}
                options={province_options}
              />
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-3 price_zone">
              <label className="text-secondary h4">
                <FormattedMessage id="doctor.select-care-price-title" />
              </label>
              <Select
                value={selectedPriceOption}
                onChange={this.handleChange("selectedPriceOption")}
                options={price_options}
              />
            </div>
            <div className="col-3 payment_zone">
              <label className="text-secondary h4">
                <FormattedMessage id="doctor.select-care-payment-title" />
              </label>
              <Select
                value={selectedPaymentOption}
                onChange={this.handleChange("selectedPaymentOption")}
                options={payment_options}
              />
            </div>
          </div>
        </div>
        <div>
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={contentMarkdown}
          />
        </div>
        <div
          className="btn btn-primary p-2 m-3 float-end"
          onClick={this.saveContentMarkDown}
        >
          {dataExist ? "Sửa thông tin" : "Lưu thông tin"}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
  arrDoctorSelect: state.admin.doctorSelect,
  arrProvinceSelect: state.admin.provinces,
  arrPriceSelect: state.admin.prices,
  arrPaymentSelect: state.admin.payments,
});

const mapDispatchToProps = (dispatch) => ({
  getDoctorSelect: () => dispatch(actions.fetchDoctorSelectStart()),
  createInfoDoctor: (data) => dispatch(actions.createDoctorInfoStart(data)),
  fetchProvince: () => dispatch(actions.fetchProvinceStart()),
  fetchPrice: () => dispatch(actions.fetchPriceStart()),
  fetchPayment: () => dispatch(actions.fetchPaymentStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
