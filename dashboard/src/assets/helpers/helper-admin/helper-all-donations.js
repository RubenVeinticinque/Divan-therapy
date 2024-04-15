function helperAllDonations(setDonations, pages) {
  async function fetchAllDonations() {
    const urlAllDonations = `http://localhost:3001/api/donations?page=${pages}`;

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const fetchDonations = await fetch(urlAllDonations, config);
    const response = await fetchDonations.json();

    if (response.data !== "Error in operation")
      setDonations({
        donations: response.data,
        prevPage: response.meta.prevPage,
        nextPage: response.meta.nextPage,
      });
  }
  fetchAllDonations();
}

export { helperAllDonations };
