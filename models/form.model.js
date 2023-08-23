const mongoose = require("mongoose");

const Form = mongoose.Schema(
  {
    ref_number: { type: String, default: "" },
    application_number: { type: String, default: "" },
    name: { type: String, default: "" },
    mother_name: { type: String, default: "" },
    father_name: { type: String, default: "" },
    husband_name: { type: String, default: "" },
    gender: { type: String, default: "" },
    marital_status: { type: String, default: "" },
    dob: { type: Date, default: "" },
    cnic: { type: String, default: "" },
    education: { type: String, default: "" },
    source_of_income: { type: String, default: "" },
    home_address: { type: String, default: "" },
    office_address: { type: String, default: "" },
    phone_number_1: { type: String, default: "" },
    phone_number_2: { type: String, default: "" },
    email_1: { type: String, default: "" },
    email_2: { type: String, default: "" },
    health_issue: { type: String, default: "" },
    reason_of_joining: { type: String, default: "" },
    joining_date: { type: Date, default: "" },
  },
  { collection: "form" }
);

const form = mongoose.model("form", Form);

module.exports = form;
