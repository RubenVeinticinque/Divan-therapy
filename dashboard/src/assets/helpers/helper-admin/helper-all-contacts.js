function helperAllContacts(setContacts, pages) {
  async function fetchAllContacts() {
    const urlAllContacts = `http://localhost:3001/api/contacts?page=${pages}`;

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const fetchAllContacts = await fetch(urlAllContacts, config);
    const response = await fetchAllContacts.json();

    if (response.data !== "Error in operation")
      setContacts({
        contacts: response.data,
        prevPage: response.meta.prevPage,
        nextPage: response.meta.nextPage,
      });
  }
  fetchAllContacts();
}

export { helperAllContacts };
