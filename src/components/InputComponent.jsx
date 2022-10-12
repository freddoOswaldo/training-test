import classNames from "classnames";
import PropTypes from "prop-types";

const InputComponent = ({ labelText, type, id, value, onChange, error }) => {
  return (
    <div className="mb-3">
      <label
        htmlFor={id}
        className={classNames("form-label", { "text-danger": error })}
      >
        {labelText}
      </label>
      <input
        type={type}
        className={classNames("form-control", { "is-invalid": error })}
        id={id}
        onChange={onChange}
        value={value}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

InputComponent.propTypes = {
  labelText: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
};

InputComponent.defaultProps = {
  type: "text",
};

export default InputComponent;
