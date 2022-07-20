import React from "react";
import PropTypes from "prop-types";

const Alert = ({ msg }) => {
  let alertType = "alert-info";
  console.log(msg);
  if (msg === "File Successfully Uploaded" || msg === "Entities Successfully Extracted") {
    alertType = "alert-info";
  } else {
    alertType = "alert-danger";
  }
  return (
    <div
      className={`alert ${alertType} alert-dismissible fade show`}
      role="alert"
    >
      {msg}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
};

Alert.propTypes = {
  msg: PropTypes.string.isRequired,
};

export default Alert;
