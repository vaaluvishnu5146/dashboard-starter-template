import PropTypes from "prop-types";

export default function TextInput({
  id = "",
  name = "",
  value = "",
  type = "",
  label = "",
  placeholder = "",
  onChange = () => {},
  onBlur = () => {},
  error,
  touched = false,
}) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        type={type || "text"}
        className="form-control"
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required
      />
      {touched && error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}

TextInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  touched: PropTypes.bool,
};
