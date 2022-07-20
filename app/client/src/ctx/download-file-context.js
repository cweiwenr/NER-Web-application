import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const DownloadFileContext = createContext();

export const DownloadFileContextProvider = ({ children }) => {
  const [fileDownloadedStatus, onFileDownload] = useState(false);
  const [files, setFiles] = useState([]);
  const [alert, setAlert] = useState();
  useEffect(() => {
    // make a get request to server to get file names currently inside
    async function fetchFiles() {
      try {
        axios.get("/checkDownload").then((response) => {
          setFiles(response.data);
        });
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
  }, [fileDownloadedStatus]);

  const removeDownloadFile = async (fileName) => {
    const deleteFile = {file:fileName}
    axios.post("/deleteDownload", deleteFile);
    setFiles(files.filter(file => file.fileName !== fileName))
  }

  return (
    <DownloadFileContext.Provider value={{ files, onFileDownload, removeDownloadFile }}>
      {children}
    </DownloadFileContext.Provider>
  );
};

export default DownloadFileContext;
