function Input({
  className,
  alt,
  type,
  name,
  title,
  id,
  accept,
  placeholder,
  defaultValue,
  required,
  value,
  onChange,
  onClick,
}) {
  return (
    <input
      className={className}
      alt={alt}
      type={type}
      name={name}
      title={title}
      id={id}
      accept={accept}
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
      required={required}
      onChange={onChange}
      onClick={onClick}
    />
  );
}

export default Input;
