function Button({
  type,
  dataBsTarget,
  dataBsSlide,
  name,
  value,
  className,
  id,
  form,
  onClick,
  title,
  btnText,
  disabled,
}) {
  return (
    <>
      <button
        type={type}
        data-bs-target={dataBsTarget}
        data-bs-slide={dataBsSlide}
        name={name}
        value={value}
        className={className}
        id={id}
        form={form}
        onClick={onClick}
        title={title}
        disabled={disabled}
      >
        {btnText}
      </button>
    </>
  );
}

export default Button;
