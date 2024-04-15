async function onSubmit(e, isLogged, setErrors, setSendMessage) {
  e.preventDefault();
  let userMessage = {};

  for (const i of e.target) {
    if (i.type !== "submit") {
      switch (i.name) {
        case "countries":
          userMessage = {
            countries: i.value,
          };
          break;
        case "provinces":
          userMessage = {
            ...userMessage,
            provinces: i.value,
          };
          break;
        case "cities":
          userMessage = {
            ...userMessage,
            cities: i.value,
          };
          break;
        case "description":
          userMessage = {
            ...userMessage,
            description: i.value,
          };
          break;
        default:
          break;
      }
    }
  }
  userMessage = {
    ...userMessage,
    id: isLogged.id,
  };

  const urlUserMessage = "http://localhost:3001/api/user-message";
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userMessage),
  };
  const fetchUserMessage = await fetch(urlUserMessage, config);
  const response = await fetchUserMessage.json();

  if (Object.keys(response.data).length > 0) {
    setErrors(response.data);
  } else {
    setErrors(false);
    setSendMessage(true);
  }
}
export { onSubmit };
