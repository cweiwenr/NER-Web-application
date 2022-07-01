import React, { useState, useContext } from "react";
import axios from "axios";
import { PreprocessedFiles } from "./PreprocessedFiles";
import FilesContext from "../ctx/files-context";
import DownloadFileContext from "../ctx/download-file-context";
import Alert from "./Alert";
import { Hr } from "./Hr";

export const Ner = () => {
  const [loading, setLoading] = useState(false);
  const {onFileUpload} = useContext(FilesContext);
  const {onFileDownload} = useContext(DownloadFileContext)
  const [alert, setAlert] = useState("");

  const onClick = async (event) => {
    event.preventDefault();

    // make request to express server
    try {

      // with then means str8 aft u send the req, so just load anim here
      const res = await axios.get("/ner").then(setLoading(true));
      
      // file successfully uploaded to server
      setLoading(false);
      setAlert("Entities Successfully Extracted");

      // append context with new files
      onFileUpload((prevState) => !prevState);
      onFileDownload((prevState) => !prevState);

    } catch (err) {
      if (err.response.status === 500) {
        setAlert("Something went wrong, failed to extract entities.");
        console.log("500");
      } else {
        setAlert("Something went wrong, failed to extract entities.");
      }
    }
  };

  return (
    <React.Fragment>
      <Hr />
      <h2>Step 2</h2>
      <p>Preprocessed files shown here.</p>
      {alert && <Alert msg={alert} />}
      <PreprocessedFiles />
      {loading && <button className="btn btn-primary btn-block mt-4" type="button" disabled>
        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <span className="sr-only"> Loading...</span>
      </button>}
      {!loading && <button
        type="button"
        onClick={onClick}
        className="btn btn-primary btn-block mt-4"
      >
        Extract Entities
      </button>}
    </React.Fragment>
  );
};
