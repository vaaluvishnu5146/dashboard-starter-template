import PropTypes from "prop-types";

export default function Ratings({
  id = "",
  label = "",
  onChange = () => {},
  onBlur = () => {},
  value = 1,
  error = "",
  touched = false,
}) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <div>
        <input
          id={id}
          name={name}
          type="range"
          onChange={onChange}
          onBlur={onBlur}
          min={1}
          step={0.5}
          max={5}
          value={value}
          required
        />
      </div>
      {touched && error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}

Ratings.propTypes = {
  error: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.number,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  touched: PropTypes.bool,
};
