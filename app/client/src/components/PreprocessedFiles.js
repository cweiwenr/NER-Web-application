import React, { useContext } from "react";
import FilesContext from "../ctx/files-context";
import { FilesCard } from "./FilesCard";

export const PreprocessedFiles = () => {
  const { files } = useContext(FilesContext);

  return (
    <React.Fragment>
      <div className="card">
        <div className="card-body">
          {files.map((file) => {
            return <FilesCard fileName={file.fileName}/>
          })}

        </div>
      </div>
    </React.Fragment>
  );
};
