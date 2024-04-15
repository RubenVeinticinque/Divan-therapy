function helperAllMoods(setmoods, pages) {
  async function fetchAllMoods() {
    const urlAllMoods = `http://localhost:3001/api/moods?page=${pages}`;

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const fetchAllMoods = await fetch(urlAllMoods, config);
    const response = await fetchAllMoods.json();

    if (response.data !== "Error in operation")
      setmoods({
        moods: response.data,
        prevPage: response.meta.prevPage,
        nextPage: response.meta.nextPage,
      });
  }
  fetchAllMoods();
}

export { helperAllMoods };
