function helperAllPrices(setPrices) {
  async function fetchAllPrices() {
    const urlAllPrices = "http://localhost:3001/api/all-prices";

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const fetchAllPrices = await fetch(urlAllPrices, config);
    const response = await fetchAllPrices.json();

    if (response.data !== "Error in operation") setPrices(response.data);
  }
  fetchAllPrices();
}

export { helperAllPrices };
