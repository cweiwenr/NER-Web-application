import React, {useContext} from "react";
import { FaFileExcel } from "react-icons/fa";
import FilesContext from "../ctx/files-context";
import DownloadFileContext from "../ctx/download-file-context";

export const FilesCard = (props) => {

  const{ removeFile } = useContext(FilesContext);
  const{ removeDownloadFile } = useContext(DownloadFileContext);

  return (
    <React.Fragment>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-1">
              <FaFileExcel />
            </div>
            <div className="col-9">{props.fileName}</div>
            <div className="col-2 text-end">
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => {
                  if (props.download) {
                    removeDownloadFile(props.fileName)
                  } else {
                    removeFile(props.fileName);
                  }
                }}
              ></button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
