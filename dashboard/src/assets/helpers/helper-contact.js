function onSubmit(e, isLogged, setErrors, setSendContact) {
  e.preventDefault();
  let msgContact;

  for (const i of e.target) {
    if (i.type !== "submit") {
      switch (i.name) {
        case "name":
          msgContact = {
            name: i.value,
          };
          break;
        case "lastname":
          msgContact = {
            ...msgContact,
            lastname: i.value,
          };
          break;
        case "email":
          msgContact = {
            ...msgContact,
            email: i.value,
          };
          break;
        case "description":
          msgContact = {
            ...msgContact,
            description: i.value,
          };
          break;
        default:
          msgContact = {};
      }
    }
  }
  msgContact = {
    ...msgContact,
    id: isLogged.id,
  };

  async function fetchContact() {
    const urlContact = "http://localhost:3001/api/contact";
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(msgContact),
    };
    const fetchContact = await fetch(urlContact, config).catch((error) =>
      console.log(error)
    );
    const response = await fetchContact.json();

    if (Object.keys(response.data).length > 0) {
      setErrors(response.data);
    } else {
      setErrors(false);
      setSendContact(true);
    }
  }
  fetchContact();
}
export { onSubmit };
