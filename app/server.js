const express = require("express");
const fileUpload = require("express-fileupload");
const request = require("request");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(fileUpload());

// upload
app.post("/upload", (req, res) => {

  // date time for record keeping
  var today = new Date();
  var date = today.toISOString().split('T')[0];

  // empty upload
  if (req.files === null) {
    return res.status(400).json({ msg: "No file selected" });
  }

  const file = req.files.file;

  // check extension of file
  if (path.extname(file.name) != '.xlsx') {
    return res.status(400).json({ msg: "File upload fail, please upload only .xlsx files"});
  }

  // check if file exists
  if (fs.existsSync(`${__dirname}/client/public/uploads/${date}_${file.name}`)) {
    return res.status(400).json({ msg: "File exists, please process the file or change the file name"});
  }
  
  // all uploaded excel will be uploaded to uploads folder
  file.mv(`${__dirname}/client/public/uploads/${date}_${file.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    
    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

// use ner model
app.get("/ner", function (req, res) {
  request("http://127.0.0.1:5000/api/ner", function (error, response, body) {
    console.error("error:", error);
    console.log("statusCode:", response && response.statusCode);
    console.log("body:", body);
    // body should store in db, build excel file
    res.send(body);
  });
});

app.listen(5001, () => console.log("Server Started..."));