function onSubmit(e, state, setPendingTurn, setNavAdmin) {
  e.preventDefault();

  async function fetchTherapistDestroy() {
    const urlTherapistDestroy = "http://localhost:3001/api/therapist-destroy";

    const config = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: state.id }),
    };
    const fetchTherapistDestroy = await fetch(urlTherapistDestroy, config);
    const response = await fetchTherapistDestroy.json();

    if (response.data === "Pending turn") setPendingTurn(true);

    if (response.data === "Therapist destroy") setNavAdmin(true);
  }
  fetchTherapistDestroy();
}

export { onSubmit };
