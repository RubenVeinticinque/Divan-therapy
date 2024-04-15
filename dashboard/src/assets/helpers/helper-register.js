import axios from "axios";

function onSubmit(e, setErrors, setCreatedRegister) {
  e.preventDefault();

  const urlRegister = "http://localhost:3001/api/register";

  const name = e.target[0].value;
  const lastname = e.target[1].value;
  const email = e.target[2].value;
  const password = e.target[3].value;
  const password2 = e.target[4].value;
  const file = e.target[5].files[0];

  const formData = new FormData();
  formData.append("avatar", file);
  formData.append("name", name);
  formData.append("lastname", lastname);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("password2", password2);

  if (e) {
    function fetchRegister() {
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      axios
        .post(urlRegister, formData, config)
        .then((response) => {
          if (!Object.keys(response.data.data).length > 0) {
            setCreatedRegister(true);
            return setErrors("");
          }
          return setErrors(response.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchRegister();
  }
}
export { onSubmit };
