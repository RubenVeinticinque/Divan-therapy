function onSubmit(e, setError, setNavPriceEdit, setNavPriceSelectedEdit) {
  e.preventDefault();

  async function fetchPriceSearch() {
    const urlPriceSearch = "http://localhost:3001/api/price-search";

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search: e.target[0].value }),
    };
    const fetchPriceSearch = await fetch(urlPriceSearch, config);
    const response = await fetchPriceSearch.json();

    setError(response.data);

    if (response.data === "Price not found") setNavPriceEdit(true);

    if (
      response.data &&
      response.data !== "Price not found" &&
      response.data !== "Error in operation" &&
      !response.data.search
    ) {
      setNavPriceSelectedEdit(true);
    }
  }
  fetchPriceSearch();
}
export { onSubmit };
