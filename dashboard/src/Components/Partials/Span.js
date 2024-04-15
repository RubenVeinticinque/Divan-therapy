function Span({ className, id, ariaHidden, text }) {
  return (
    <span className={className} aria-hidden={ariaHidden} id={id}>
      {text}
    </span>
  );
}
export default Span;
