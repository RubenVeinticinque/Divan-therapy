function onSubmit(e, setErrors) {
  e.preventDefault();

  const urlForgetPassword = "http://localhost:3001/api/forget-password";

  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: e.target[0].value }),
  };

  async function sendForgetPassword() {
    const fetchForgetPassword = await fetch(urlForgetPassword, config);
    const response = await fetchForgetPassword.json();

    if (response.data === "Email sent") {
      localStorage.setItem("new-pass", JSON.stringify(true));
      localStorage.setItem("email-new-pass", JSON.stringify(e.target[0].value));
    }
    setErrors(response.data);
  }
  sendForgetPassword();
}

export { onSubmit };
