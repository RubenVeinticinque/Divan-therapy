function helperAllSessionsHours(setSessionsHours) {
  async function fetchAllSessionsHours() {
    const urlAllSessionsHours = "http://localhost:3001/api/sessions-hours";

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const fetchSessionsHours = await fetch(urlAllSessionsHours, config);
    const response = await fetchSessionsHours.json();

    if (response.data !== "Error in operation") setSessionsHours(response.data);
  }
  fetchAllSessionsHours();
}

export { helperAllSessionsHours };
