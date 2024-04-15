function handleSessionsHours(e, setSessionHours) {
  setSessionHours(e.target.value);
}

function onSubmit(e, setError, setNavSessionHourEdit) {
  e.preventDefault();

  async function fetchPriceEdit() {
    const urlSessionsHourEdit = "http://localhost:3001/api/session-hour-edit";

    const config = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ session_hours: e.target[0].value }),
    };
    const fetchSessionHourEdit = await fetch(urlSessionsHourEdit, config);
    const response = await fetchSessionHourEdit.json();

    setError(response.data);

    if (response.data === "Session hour update") setNavSessionHourEdit(true);
  }
  fetchPriceEdit();
}
export { handleSessionsHours, onSubmit };
