import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const FilesContext = createContext();

export const FilesContextProvider = ({ children }) => {
  const [fileUploadStatus, onFileUpload] = useState(false);
  const [files, setFiles] = useState([]);
  const [alert, setAlert] = useState();

  // retrieve all preprocessed files from server
  useEffect(() => {
    // make a get request to server to get file names currently inside
    async function fetchFiles() {
      try {
        axios.get("/preprocessedfiles")
          .then((response) => {
            setFiles(response.data);
          })
        
      } catch (err) {
        if (err.response.status === 500) {
          setAlert("Something went wrong fetching files.");
          console.log("500");
        } else {
          setAlert(err.response.data.msg);
        }
      }
    }

    fetchFiles();
  }, [fileUploadStatus]);

  return (
    <FilesContext.Provider
      value={{files, onFileUpload}}
    >
      {children}
    </FilesContext.Provider>
  );
};

export default FilesContext;
