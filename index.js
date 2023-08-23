// imports
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// model import
const User = require("./models/user.model");
const Form = require("./models/form.model");

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// middlewares
// app.use(cors({ origin: '*' }));
app.use(express.json());

// mongoose connection
mongoose.connect(
  "mongodb+srv://abuzar:az122333@cluster0.nfyjvj6.mongodb.net/muraqba-hall?retryWrites=true&w=majority"
);

app.get("/", (req, res) => {
  res.send("Hello, world");
});

// requests
app.post("/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  if (user) {
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (isValidPassword) {
      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
        },
        "secretkeyhere"
      );
      res.json({ status: "ok", user: user, token: token });
    } else {
      res.json({ status: "error", user: false });
    }
  } else {
    res.json({ status: "error", user: false });
  }
});

app.post("/register", async (req, res) => {
  try {
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      password: encryptedPassword,
    });
    res.json({ status: "ok", data: user });
  } catch (error) {
    res.json({ status: "error", error: error });
  }
});

app.post("/form", async (req, res) => {
  const form = req.body;
  const newForm = new Form({
    ref_number: form?.ref_number ?? "",
    application_number: form?.application_number ?? "",
    name: form?.name ?? "",
    mother_name: form?.mother_name ?? "",
    father_name: form?.father_name ?? "",
    husband_name: form?.husband_name ?? "",
    gender: form?.gender ?? "",
    marital_status: form?.marital_status ?? "",
    dob: form?.dob ?? "",
    cnic: form?.cnic ?? "",
    education: form?.education ?? "",
    source_of_income: form?.source_of_income ?? "",
    home_address: form?.home_address ?? "",
    office_address: form?.office_address ?? "",
    phone_number_1: form?.phone_number_1 ?? "",
    phone_number_2: form?.phone_number_2 ?? "",
    email_1: form?.email_1 ?? "",
    email_2: form?.email_2 ?? "",
    health_issue: form?.health_issue ?? "",
    reason_of_joining: form?.reason_of_joining ?? "",
    joining_date: form?.joining_date ?? "",
  });
  newForm
    .save()
    .then((result) => {
      res.json({ status: "ok", data: result });
    })
    .catch((error) => {
      res.json({ status: "error", error: error });
    });
});

app.put("/form/:id", async (req, res) => {
  const id = req.params.id;
  const form = req.body;

  Form.findOneAndUpdate(id, {
    ref_number: form?.ref_number ?? "",
    application_number: form?.application_number ?? "",
    name: form?.name ?? "",
    mother_name: form?.mother_name ?? "",
    father_name: form?.father_name ?? "",
    husband_name: form?.husband_name ?? "",
    gender: form?.gender ?? "",
    marital_status: form?.marital_status ?? "",
    dob: form?.dob ?? "",
    cnic: form?.cnic ?? "",
    education: form?.education ?? "",
    source_of_income: form?.source_of_income ?? "",
    home_address: form?.home_address ?? "",
    office_address: form?.office_address ?? "",
    phone_number_1: form?.phone_number_1 ?? "",
    phone_number_2: form?.phone_number_2 ?? "",
    email_1: form?.email_1 ?? "",
    email_2: form?.email_2 ?? "",
    health_issue: form?.health_issue ?? "",
    reason_of_joining: form?.reason_of_joining ?? "",
    joining_date: form?.joining_date ?? "",
  })
    .then((updatedDocument) => {
      if (!updatedDocument) {
        return res.status(404).json({ error: "Document not found" });
      }

      res.json(updatedDocument);
    })
    .catch((error) => {
      console.error("Error updating document:", error);
      res
        .status(500)
        .json({ error: "An error occurred while updating the document" });
    });
});

app.delete("/form/:id", (req, res) => {
  const recordId = req.params.id;

  // Delete the record by its unique identifier
  Form.deleteOne({ _id: recordId }, (err, result) => {
    if (err) {
      console.error("Failed to delete record:", err);
      return res.status(500).json({ error: "Failed to delete record" });
    }

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Record not found" });
    }

    return res.status(204).json({ status: "ok" }); // No content, successful deletion
  });
});

app.get("/forms", async (req, res) => {
  // const token = req.headers["x-access-token"];
  try {
    // const decoded = jwt.verify(token, "secretkeyhere");
    // if (decoded.email) {
    const forms = await Form.find().sort({ joining_date: -1 }).exec();
    // const forms = await Form get all forms data from form model and send through response
    // }
    res.json({ status: "ok", data: forms });
  } catch (error) {
    res.json({ status: "error", error: error });
  }
});

app.get("/form/:id", async (req, res) => {
  // const token = req.headers["x-access-token"];
  try {
    // const decoded = jwt.verify(token, "secretkeyhere");
    // if (decoded.email) {
    const form = await Form.findOne({ _id: req.params.id });
    // const forms = await Form get all forms data from form model and send through response
    // }
    res.json({ status: "ok", data: form });
  } catch (error) {
    res.json({ status: "error", error: error });
  }
});

app.get("/total-records", async (req, res) => {
  try {
    const count = await Form.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: "Error fetching count" });
  }
});

// connection
app.listen(1337, () => {
  console.log("server started successfully");
});
