function onSubmit(e, state, setPendingTurn, setNavAdmin) {
  e.preventDefault();

  async function fetchUserDestroy() {
    const urlUserDestroy = "http://localhost:3001/api/user-destroy";

    const config = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: state.id }),
    };
    const fetchUserDestroy = await fetch(urlUserDestroy, config);
    const response = await fetchUserDestroy.json();

    if (response.data === "Pending turn") setPendingTurn(true);

    if (response.data === "User destroy") setNavAdmin(true);
  }
  fetchUserDestroy();
}

export { onSubmit };
