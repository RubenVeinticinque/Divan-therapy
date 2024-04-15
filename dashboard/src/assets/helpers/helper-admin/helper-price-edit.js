function handlePrice(e, setPrice) {
  setPrice(e.target.value);
}

function onSubmit(e, setError, setNavPriceEdit) {
  e.preventDefault();

  async function fetchPriceEdit() {
    const urlPriceEdit = "http://localhost:3001/api/price-edit";

    const config = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: e.target[0].value }),
    };
    const fetchPriceEdit = await fetch(urlPriceEdit, config);
    const response = await fetchPriceEdit.json();

    setError(response.data);

    if (response.data === "Price update") setNavPriceEdit(true);
  }
  fetchPriceEdit();
}
export { handlePrice, onSubmit };
