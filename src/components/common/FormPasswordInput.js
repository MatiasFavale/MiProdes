import React from "react";
import PropTypes from "prop-types";

const FormPasswordInput = ({ name, label, onChange, placeholder, value,   error,  disabled=false }) => {
  let wrapperClass = "form-group";
  if (error && error.length > 0) {
    wrapperClass += " " + "has-error";
  }

  return (
    <div className={wrapperClass}>
      <label hidden = {disabled} className="labelFont" htmlFor={name}>{label}</label>
      <div className="field">
        <input
          type="password"
          name={name}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          hidden = {disabled}
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

FormPasswordInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string
};

export default FormPasswordInput;