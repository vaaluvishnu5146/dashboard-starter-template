import PropTypes from "prop-types";

export default function Select({
  id,
  label,
  onChange = () => {},
  onBlur = () => {},
  options = [],
  value = "",
  error = "",
  touched = false,
}) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <select
        id={name}
        name={id}
        className="form-select"
        aria-label="Default select example"
        defaultValue={""}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      >
        <option>Open this select menu</option>
        {options.map((option, index) => (
          <option key={`${option.id}-${index}`} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
      {touched && error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}

Select.propTypes = {
  error: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  options: PropTypes.array,
  touched: PropTypes.bool,
};
