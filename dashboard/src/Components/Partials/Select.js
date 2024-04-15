function Select({
  className,
  name,
  id,
  ariaLabel,
  defaultValue,
  value,
  onChange,
  textSelect,
  required,
}) {
  return (
    <select
      className={className}
      name={name}
      aria-label={ariaLabel}
      id={id}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      required={required}
    >
      {textSelect}
    </select>
  );
}

export default Select;
