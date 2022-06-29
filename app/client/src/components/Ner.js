import React, { useState, useContext } from "react";
import axios from "axios";
import { PreprocessedFiles } from "./PreprocessedFiles";
import FilesContext from "../ctx/files-context";
import DownloadFileContext from "../ctx/download-file-context";
import { Hr } from "./Hr";

export const Ner = () => {
  const [alert, setAlert] = useState("");
  const [entities, setEntities] = useState("");
  const {onFileUpload} = useContext(FilesContext);
  const {onFileDownload} = useContext(DownloadFileContext)

  const onClick = async (event) => {
    event.preventDefault();

    // make request to express server
    try {
      const res = await axios.get("/ner");

      // file successfully uploaded to server
      setAlert("Entities extracted");
      // wtv i want to display
      setEntities(res.data);
      // append context with new files
      onFileUpload((prevState) => !prevState);
      onFileDownload((prevState) => !prevState);

    } catch (err) {
      if (err.response.status === 500) {
        setAlert("Something went wrong.");
        console.log("500");
      } else {
        setAlert(err.response.data.msg);
      }
    }
  };

  return (
    <React.Fragment>
      <Hr />
      <h2>Step 2</h2>
      <p>Preprocessed files shown here.</p>
      <PreprocessedFiles />
      <button
        type="button"
        onClick={onClick}
        className="btn btn-primary btn-block mt-4"
      >
        Extract Entities
      </button>

      <p>{entities}</p>
    </React.Fragment>
  );
};
