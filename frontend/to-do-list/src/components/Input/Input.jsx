import React from "react";
import PropTypes from "prop-types";

import "./Input.css";

const Input = ({ type, value, onChange }) => {
  return (
    <label>
      <input type={type} className="input" value={value} onChange={onChange} />
    </label>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Input;
