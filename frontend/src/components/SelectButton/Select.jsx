function Select({ label, options, className = "", value, onChange }) {
  return (
    <select
      className={`form-select w-auto ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {label && <option value="">{label}</option>}

      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
