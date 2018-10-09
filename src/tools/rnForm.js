import React from "react";
import FormField from "../components/commons/FormField";

const types = {
  String: () => "String",
  Number: () => "Number",
  Email: () => "Email",
  Date: () => "Date",
  Picker: () => "Picker",
  File: () => "File",
  Checkbox: () => "Checkbox",
  Partten: p => "Partten"
};

export const rnForm = {
  type: types,
  form: (structure = {}, rules = {}) => {
    const fieldName = Object.keys(structure);
    const typeFields = Object.keys(types);
    let outPut = null;

    const formOutput = fieldName.map(field => {
      const { type, rules, options } = structure[field];

      if (typeFields.includes(type)) {
        switch (type) {
          case "String":
            outPut = "input string";
        }
      }

      if (outPut && rules) {
        if (rules.required) {
        }
      }
      return outPut;
    });

    return formOutput;
  },
  result: () => {
    return rnForm;
  }
};
