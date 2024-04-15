function onSubmit(e, setError, setNavUserEdit, setNavUserSelectedEdit) {
  e.preventDefault();

  async function fetchUserSearch() {
    const urlUserSearch = "http://localhost:3001/api/user-search";

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search: e.target[0].value }),
    };
    const fetchUserSearch = await fetch(urlUserSearch, config);
    const response = await fetchUserSearch.json();

    setError(response.data);

    if (response.data === "User not found") setNavUserEdit(true);

    if (
      response.data &&
      response.data !== "User not found" &&
      response.data !== "Error in operation" &&
      !response.data.search
    ) {
      setNavUserSelectedEdit(true);
    }
  }
  fetchUserSearch();
}

export { onSubmit };
