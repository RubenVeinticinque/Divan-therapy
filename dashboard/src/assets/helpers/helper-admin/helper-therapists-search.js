function onSubmit(
  e,
  setError,
  setNavTherapistEdit,
  setNavTherapistSelectedEdit
) {
  e.preventDefault();

  async function fetchTherapistSearch() {
    const urlTherapistSearch = "http://localhost:3001/api/therapist-search";

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search: e.target[0].value }),
    };
    const fetchTherapistSearch = await fetch(urlTherapistSearch, config);
    const response = await fetchTherapistSearch.json();

    setError(response.data);

    if (response.data === "Therapist not found") setNavTherapistEdit(true);

    if (
      response.data &&
      response.data !== "Therapist not found" &&
      response.data !== "Error in operation" &&
      !response.data.search
    ) {
      setNavTherapistSelectedEdit(true);
    }
  }
  fetchTherapistSearch();
}

export { onSubmit };
