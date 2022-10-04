import React from "react";

const InputComponent = ({ labelText, type, id, value, onChange }) => {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {labelText}
      </label>
      <input
        type={type}
        className="form-control"
        id={id}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default InputComponent;
