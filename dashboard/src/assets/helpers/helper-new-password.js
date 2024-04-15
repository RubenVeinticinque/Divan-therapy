function onSubmit(e, email, setErrors) {
  e.preventDefault();

  async function fetchNewPassword() {
    const urlNewPassword = "http://localhost:3001/api/new-password-change";
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: e.target[0].value,
        password2: e.target[1].value,
        email: email,
      }),
    };

    const fetchNewPass = await fetch(urlNewPassword, config);
    const response = await fetchNewPass.json();
    console.log(response);

    setErrors(response.data);
  }
  fetchNewPassword();
}
export { onSubmit };
