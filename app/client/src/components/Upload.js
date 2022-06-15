import React, { useState, useContext } from "react";
import axios from "axios";
import Alert from "./Alert";
import FilesContext from "../ctx/files-context";

export const Upload = () => {
  // file state
  const [file, setFile] = useState("");
  const [alert, setAlert] = useState("");

  // push files to cartcontext
  const {onFileUpload} = useContext(FilesContext);

  // When user uploads file
  const onChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    // make request to express server
    try {
      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // file successfully uploaded to server
      setAlert("File Successfully Uploaded");

      // append context with new files
      onFileUpload((prevState) => !prevState);

    } catch (err) {
      if (err.response.status === 500) {
        setAlert("Server error, failed to upload file.");
        console.log("500");
      } else {
        setAlert(err.response.data.msg);
      }
    }
  };

  return (
    <React.Fragment>
      <hr></hr>
      <h2>Step 1</h2>
      <p>Upload an excel file with the .xlsx extension.</p>
      {alert && <Alert msg={alert} />}
      <form onSubmit={onSubmit}>
        <div>
          <input
            className="form-control form-control-lg"
            id="formFileLg"
            type="file"
            onChange={onChange}
          />
        </div>
        <input
          type="submit"
          value="Upload File"
          className="btn btn-primary btn-block mt-4"
        />
      </form>
    </React.Fragment>
  );
};
