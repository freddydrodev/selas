import React, { Component } from "react";
import { Form, Text } from "native-base";
import PropTypes from "prop-types";
import FormField from "./FormField";

class FormGenerator extends Component {
  state = {
    formData: {}
  };

  //generate formData base on the structure key to track data
  componentDidMount() {
    const { structure } = this.props;

    //obtain the key of each field
    this.formKeys = Object.keys(structure);

    //for each key we return the key and a value of null as pair
    //to access it as formData[_key] = value
    const formData = {};
    this.formKeys.forEach(_key => {
      formData[_key] = null;
    });
    this.initFormData = formData;

    //we then set the initial value of the form
    this.setState({ formData });
  }

  resetFormData = () => {
    this.setState({ formData: this.initFormData });
  };

  //listen to changes on input and update the related form data field
  //rest represent the value
  onInputChange = (_key, value) => {
    const { formData } = this.state;
    formData[_key] = value;

    this.setState({ formData });
  };

  //generate the react form stucture
  generateForm = () => {
    //get the structure
    const { structure } = this.props;

    //obtain the key of each field
    const keys = Object.keys(structure);

    const formItems = keys.map(key => {
      const { label, type, placeholder, data } = structure[key];

      //generating the input
      const _formItem = (
        <FormField
          data={data}
          key={key}
          _key={key} //for formeData
          change={this.onInputChange}
          label={label || key}
          type={type}
          value={this.state.formData[key]}
          placeholder={placeholder}
        />
      );

      return _formItem;
    });
    return formItems;
  };

  render() {
    return <Form>{this.generateForm()}</Form>;
  }
}

export default FormGenerator;

FormGenerator.propTypes = {
  structure: PropTypes.object.isRequired,
  onSubmit: PropTypes.func
};
