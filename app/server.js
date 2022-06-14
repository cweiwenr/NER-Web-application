const express = require("express");
const fileUpload = require("express-fileupload");
const request = require("request");

const app = express();

app.use(fileUpload());

// upload
app.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file selected" });
  }

  const file = req.files.file;

  // all uploaded excel will be uploaded to uploads folder
  file.mv(`${__dirname}/client/public/uploads/${file.name}`, (err) => {
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