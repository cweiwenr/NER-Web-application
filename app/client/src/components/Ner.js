import React, { useState } from "react";
import axios from "axios";

export const Ner = () => {
  const [alert, setAlert] = useState("");
  const [entities, setEntities] = useState("");

  const onClick = async (event) => {
    event.preventDefault();

    // make request to express server
    try {
      const res = await axios.get("/ner");

      // file successfully uploaded to server
      setAlert("Entities extracted");
      // wtv i want to display
      setEntities(res.data);
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
      <hr></hr>
      <h2>Step 2</h2>
      <p>Preprocessed files shown here.</p>
      <button
        type="button"
        class="btn btn-primary"
        onClick={onClick}
        className="btn btn-primary btn-block mt-4"
      >
        Extract Entities
      </button>

      <h1>{entities}</h1>
    </React.Fragment>
  );
};
