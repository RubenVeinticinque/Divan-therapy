function onSubmit(e, isLogged, setStateOfMind) {
  e.preventDefault();
  let stateOfMind = "-";

  for (const i of e.target) {
    if (i.checked) {
      stateOfMind += i.value + "-";
    }
  }

  const moods = stateOfMind === "-" ? "No respondió" : stateOfMind;
  const urlSateOfMind = "http://localhost:3001/api/state-of-mind";
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ moods, userEmail: isLogged.userEmail }),
  };

  async function fetchSateOfMind() {
    try {
      const fetchSateOfMind = await fetch(urlSateOfMind, config);
      const response = await fetchSateOfMind.json();

      if (response.data === "Created state of mind") setStateOfMind(true);
    } catch (error) {
      console.log(error);
    }
  }
  fetchSateOfMind();
}

export { onSubmit };
