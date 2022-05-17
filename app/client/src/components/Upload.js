import React, { useState } from "react";
import axios from "axios";
import Alert from "./Alert";

export const Upload = () => {
  // file state
  const [file, setFile] = useState("");
  const [alert, setAlert] = useState("");

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
      setAlert("File Uploaded");
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
          value="Upload"
          className="btn btn-primary btn-block mt-4"
        />
      </form>
    </React.Fragment>
  );
};
