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
      name_clinic: "",
      note: "",
      address_clinic: "",
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
      console.log("check before", this.props.arrProvinceSelect);
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
      note,
      address_clinic,
      name_clinic,
      selectedPaymentOption,
      selectedProvinceOption,
      selectedPriceOption,
    } = this.state;
    this.setState({
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: "",
      description: "",
      note: "",
      address_clinic: "",
      name_clinic: "",
      selectedPaymentOption: "",
      selectedProvinceOption: "",
      selectedPriceOption: "",
    });
    this.props.createInfoDoctor({
      doctorId: selectedOption.value,
      contentMarkDown: contentMarkdown,
      contentHTML: contentHTML,
      description: description,
      actions: dataExist ? "UPDATE" : "CREATE",
      // for doctor_info table
      priceId: selectedPriceOption.value,
      provinceId: selectedProvinceOption.value,
      paymentId: selectedPaymentOption.value,
      address_clinic: address_clinic,
      nameClinic: name_clinic,
      note: note,
    });
  };
  buildObj = (dataDoctor, prop, labelProp, valueProp) => {
    let obj = {};
    obj.label =
      this.props.language === LANGUAGE.VI
        ? dataDoctor.data.InfoTableData[prop][labelProp].valueVi
        : dataDoctor.data.InfoTableData[prop][labelProp].valueEn;
    obj.value = dataDoctor.data.InfoTableData[prop][valueProp];
    return obj;
  };
  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedOption });
    try {
      const dataDoctor = await getDoctorInfo(selectedOption.value);
      // for provinceObj
      let provinceObj = {};
      provinceObj.label =
        this.props.language === LANGUAGE.VI
          ? dataDoctor.data.InfoTableData.provinceInfo.valueVi
          : dataDoctor.data.InfoTableData.provinceInfo.valueEn;
      provinceObj.value = dataDoctor.data.InfoTableData.provinceId;
      // for price
      let priceObj = {};
      priceObj.label =
        this.props.language === LANGUAGE.VI
          ? dataDoctor.data.InfoTableData.priceInfo.valueVi
          : dataDoctor.data.InfoTableData.priceInfo.valueEn;
      priceObj.value = dataDoctor.data.InfoTableData.priceId;
      // for price
      let paymentObj = {};
      paymentObj.label =
        this.props.language === LANGUAGE.VI
          ? dataDoctor.data.InfoTableData.paymentInfo.valueVi
          : dataDoctor.data.InfoTableData.paymentInfo.valueEn;
      paymentObj.value = dataDoctor.data.InfoTableData.paymentId;
      if (
        dataDoctor?.errCode === 0 &&
        dataDoctor?.data?.MarkDown?.contentHTML
      ) {
        this.setState({
          dataExist: true,
          contentMarkdown: dataDoctor.data.MarkDown.contentMarkDown,
          contentHTML: dataDoctor.data.MarkDown.contentHTML,
          description: dataDoctor.data.MarkDown.description,
          name_clinic: dataDoctor.data.InfoTableData.nameClinic,
          note: dataDoctor.data.InfoTableData.note,
          address_clinic: dataDoctor.data.InfoTableData.addressClinic,
          selectedPaymentOption: paymentObj,
          selectedProvinceOption: provinceObj,
          selectedPriceOption: priceObj,
        });
      } else {
        this.setState({
          dataExist: false,
          contentMarkdown: "",
          contentHTML: "",
          description: "",
          // name_clinic: "",
          // note: "",
          // address_clinic: "",
          // selectedPaymentOption: "",
          // selectedProvinceOption: "",
          // selectedPriceOption: "",
        });
      }
      if (
        !(
          dataDoctor?.data?.InfoTableData?.nameClinic &&
          dataDoctor?.data?.InfoTableData?.addressClinic &&
          dataDoctor?.data?.InfoTableData?.note
        )
      ) {
        this.setState({
          name_clinic: "",
          note: "",
          address_clinic: "",
          selectedPaymentOption: "",
          selectedProvinceOption: "",
          selectedPriceOption: "",
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
  handleOnChangeNameClinic = (event) => {
    this.setState({
      name_clinic: event.target.value,
    });
  };
  handleChangeTextAreaAddress = (event) => {
    this.setState({
      address_clinic: event.target.value,
    });
  };
  handleChangeTextAreaNote = (event) => {
    this.setState({
      note: event.target.value,
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
      note,
      name_clinic,
      address_clinic,
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
            <div className="col-2 price_zone">
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
            <div className="col-3 clinic_name_zone">
              <label className="text-secondary h4">
                <FormattedMessage id="doctor.name-clinic" />
              </label>
              <div className="clinic_name_zone_content">
                <input
                  type="text"
                  class="form-control"
                  value={name_clinic}
                  onChange={(event) => this.handleOnChangeNameClinic(event)}
                />
              </div>
            </div>
            <div className="col-3 address_zone">
              <label className="text-secondary h4">
                <FormattedMessage id="doctor.address-clinic" />
              </label>
              <input
                type="text"
                class="form-control"
                value={address_clinic}
                onChange={(event) => this.handleChangeTextAreaAddress(event)}
              />
            </div>
            <div className="col-6 note_zone mt-5">
              <label className="text-secondary h4">
                <FormattedMessage id="doctor.name-note" />
              </label>
              <textarea
                className="form-control"
                rows="5"
                onChange={(event) => this.handleChangeTextAreaNote(event)}
                value={note}
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
