import React from "react";
import PropTypes from "prop-types";

import "./Button.css";

const Button = ({ disabled, onClick, children }) => {
  return (
    <button
      className={"button"}
      disabled={disabled}
      onClick={onClick}
      type="primary"
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  children: "",
  onClick: () => {},
  disabled: false,
};

export default Button;
