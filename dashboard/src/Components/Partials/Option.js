function Option({ id, value, textOption, hidden }) {
  return (
    <option id={id} value={value} hidden={hidden}>
      {textOption}
    </option>
  );
}

export default Option;
