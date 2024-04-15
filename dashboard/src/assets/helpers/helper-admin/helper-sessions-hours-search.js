function onSubmit(
  e,
  setError,
  setNavSessionsHoursEdit,
  setNavSessionsHoursSelectedEdit
) {
  e.preventDefault();

  async function fetchSessionsHoursSearch() {
    const urlSessionsHoursSearch =
      "http://localhost:3001/api/sessions-hours-search";

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search: e.target[0].value }),
    };
    const fetchSessionsHoursSearch = await fetch(
      urlSessionsHoursSearch,
      config
    );
    const response = await fetchSessionsHoursSearch.json();

    setError(response.data);

    if (response.data === "Session hour not found") {
      setNavSessionsHoursEdit(true);
    }
    if (
      response.data &&
      response.data !== "Session hour not found" &&
      response.data !== "Error in operation" &&
      !response.data.search
    ) {
      setNavSessionsHoursSelectedEdit(true);
    }
  }
  fetchSessionsHoursSearch();
}
export { onSubmit };
