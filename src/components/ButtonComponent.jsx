import React from "react";
import PropTypes from "prop-types";

const ButtonComponent = ({ label, id, type, color, isLoading, onClick }) => {
  return (
    <button
      type={type}
      id={id}
      disabled={isLoading}
      className={`btn btn-${color}`}
      onClick={onClick}
    >
      {isLoading ? (
        <React.Fragment>
            <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden={true}
        ></span>
        <span> Cargando ...</span>
        </React.Fragment>
      ) : (
        label
      )}
    </button>
  );
};

ButtonComponent.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  color: PropTypes.string,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
};

ButtonComponent.defaultProps = {
  type: "button",
  color: "primary",
  isLoading: false
};

export default ButtonComponent;
