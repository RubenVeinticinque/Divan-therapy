function onSubmit(e, userLogged, setErrors, setTurns, setShiftList) {
  e.preventDefault();
  let dateModality;

  for (const i of e.target) {
    switch (i.name) {
      case "date":
        dateModality = {
          date: i.value,
          therapistEmail: userLogged.userEmail,
        };
        break;
      case "modality":
        dateModality = { ...dateModality, modality: i.value };
        break;
      default:
    }
  }

  const urlTherapistShifts = "http://localhost:3001/api/therapist-shifts";
  const config = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dateModality),
  };
  async function fetchTherapistShifts() {
    const fetchTherapistShifts = await fetch(urlTherapistShifts, config).catch(
      (error) => console.log(error)
    );
    const response = await fetchTherapistShifts.json();
    if (response.data.date || response.data.modality) {
      setErrors(response.data);
    } else {
      setErrors("");
      setTurns(true);
      setShiftList(response.data);
    }
  }
  fetchTherapistShifts();
}

function handleDate(e, setDate) {
  e.preventDefault();
  setDate(e.target.value);
}
function handleModality(e, setModality) {
  e.preventDefault();
  setModality(e.target.value);
}

export { onSubmit, handleDate, handleModality };
