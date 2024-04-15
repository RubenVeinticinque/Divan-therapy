function Label({ className, htmlFor, id, labelText }) {
  return (
    <label className={className} htmlFor={htmlFor} id={id}>
      {labelText}
    </label>
  );
}

export default Label;
