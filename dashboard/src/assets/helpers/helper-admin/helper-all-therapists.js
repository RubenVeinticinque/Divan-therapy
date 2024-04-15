function helperAllTherapists(setAllTherapists, pages) {
  async function fetchAllTherapists() {
    const urlAllTherapists = `http://localhost:3001/api/therapists?page=${pages}`;

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const fetchUserDelete = await fetch(urlAllTherapists, config);
    const response = await fetchUserDelete.json();

    if (response.data !== "Error in operation")
      setAllTherapists({
        therapists: response.data,
        prevPage: response.meta.prevPage,
        nextPage: response.meta.nextPage,
      });
  }
  fetchAllTherapists();
}

export { helperAllTherapists };
