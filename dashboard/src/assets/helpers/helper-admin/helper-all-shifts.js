function helperAllShifts(setTurns, pages) {
  async function fetchAllTurn() {
    const urlAllTurn = `http://localhost:3001/api/turns?page=${pages}`;

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const fetchAllTurn = await fetch(urlAllTurn, config);
    const response = await fetchAllTurn.json();

    if (response.data !== "Error in operation")
      setTurns({
        ma: response.data,
        prevPage: response.meta.prevPage,
        nextPage: response.meta.nextPage,
      });
  }
  fetchAllTurn();
}

export { helperAllShifts };
