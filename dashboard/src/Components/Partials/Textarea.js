function Textarea({ name, id, cols, rows, className, placeholder, required }) {
  return (
    <textarea
      name={name}
      id={id}
      cols={cols}
      rows={rows}
      className={className}
      placeholder={placeholder}
      required={required}
    ></textarea>
  );
}

export default Textarea;
