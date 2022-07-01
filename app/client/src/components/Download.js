import React, { useState, useContext } from "react";
import axios from "axios";
import { FilesCard } from "./FilesCard";
import DownloadFileContext from "../ctx/download-file-context";
import { Hr } from "./Hr";
const FileDownload = require('js-file-download');

export const Download = () => {
  const [archive, setArchive] = useState(false);
  const { onFileDownload, files } = useContext(DownloadFileContext);

  const onClick = async (event) => {
    // download the files from server
    event.preventDefault();

    // make request to express server
    try {
      const res = await axios.get("/download", {
        responseType: 'blob'
      }).then((response) => {
        FileDownload(response.data, 'report.zip');
      });

      // append context with new files
      onFileDownload((prevState) => !prevState);

    } catch (err) {
      if (err.response.status === 500) {
        console.log("500");
      } else {
        ;
      }
    }
  };

  return (
    <React.Fragment>
      <Hr />
      <h2>Step 3</h2>
      <p>Download Extracted entites.</p>
      <div className="card">
        <div className="card-body">
          {archive && <p>display previously downloaded files</p>}
          {!archive &&
            files.map((file) => {
              return <FilesCard fileName={file.fileName} download={true} />;
            })}
        </div>
      </div>
      <button
        type="button"
        onClick={onClick}
        className="btn btn-primary btn-block mt-4"
      >
        Download Results
      </button>

      <Hr />
    </React.Fragment>
  );
};
