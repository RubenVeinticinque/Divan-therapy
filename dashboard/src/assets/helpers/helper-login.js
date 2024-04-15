function onSubmit(e, setErrors, setUser) {
  e.preventDefault();

  if (e) {
    async function fetchLogin() {
      setErrors("");
      setUser("");

      const urlLogin = "http://localhost:3001/api/login";

      const fetchLogin = await fetch(urlLogin, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: e.target[0].value,
          password: e.target[1].value,
        }),
      }).catch((error) => {
        console.log(error);
      });
      const response = await fetchLogin.json();

      if (response.data.name || response.data.userEmail) {
        localStorage.setItem("userLogged", JSON.stringify(response.data));

        setUser(response.data);
      } else {
        setErrors(response.data);
      }
    }

    fetchLogin();
  }
}

export { onSubmit };
