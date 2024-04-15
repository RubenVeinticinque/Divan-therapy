async function sendDatetime(dateTimeSelected, createMedApp) {
  if (createMedApp) {
    const urlDatetime = "http://localhost:3001/api/enter-datetime";
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dateTimeSelected),
    };
    const fetchDatetime = await fetch(urlDatetime, config);
    const response = await fetchDatetime.json();
    console.log(response);

    localStorage.removeItem("create-med-appointment");
  }
}

export { sendDatetime };
