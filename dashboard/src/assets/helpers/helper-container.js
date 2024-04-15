async function helperContainer(setRegion) {
  const urlRegion = "http://localhost:3001/api/regions";
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const fetchRegion = await fetch(urlRegion, config);
  const response = await fetchRegion.json();
  setRegion(response.data);
}

async function turn(userLogged) {
  if (userLogged) {
    const urlTurn = "http://localhost:3001/api/video-call";
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userLogged),
    };

    const fetchTurn = await fetch(urlTurn, config);
    const response = await fetchTurn.json();

    if (
      response.data === "There is no medical appointment" ||
      response.data === "Error of medical appointment"
    ) {
      localStorage.removeItem("ma");
      localStorage.setItem("ma", JSON.stringify(true));
    } else {
      localStorage.removeItem("ma");
    }
  }
}

export { helperContainer, turn };
