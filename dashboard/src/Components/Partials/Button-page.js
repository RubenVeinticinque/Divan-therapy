import Button from "./Button";

function ButtonPages({
  disabledPrev,
  disabledNext,
  onclickPrev,
  onClickNext,
  numPage,
}) {
  return (
    <div className="d-flex justify-content-center btn-page">
      <Button
        className="btn btn-primary"
        disabled={disabledPrev}
        onClick={onclickPrev}
        btnText={<i className="fas fa-chevron-left"></i>}
      />
      <p className="p-3">Página : {numPage} </p>
      <Button
        className="btn btn-primary"
        disabled={disabledNext}
        onClick={onClickNext}
        btnText={<i className="fas fa-chevron-right"></i>}
      />
    </div>
  );
}
export default ButtonPages;
