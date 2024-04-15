let amountTemp = "";

function onClick(value, setAmount) {
  amountTemp += value;
  if (value === "") {
    amountTemp = amountTemp.slice(0, amountTemp.length - 1);
  }
  setAmount(amountTemp);
}

function onSubmit(e, amount, setSendDonation) {
  e.preventDefault();

  if (amount) {
    setSendDonation(true);
  }
}
function clearAmount() {
  amountTemp = "";
  return amountTemp;
}

export { onClick, onSubmit, clearAmount };
