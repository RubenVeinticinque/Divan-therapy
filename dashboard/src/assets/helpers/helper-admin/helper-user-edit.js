import axios from "axios";

function handleName(e, setName) {
  setName(e.target.value);
}
function handleLastname(e, setLastname) {
  setLastname(e.target.value);
}
function handleEmail(e, setEmail) {
  setEmail(e.target.value);
}
function handleCategory(e, setCategory) {
  setCategory(e.target.value);
}

function onSubmit(e, state, setErrors, setSendFormUser) {
  e.preventDefault();

  const id = state.user.id;
  const name = e.target[0].value;
  const lastname = e.target[1].value;
  const email = e.target[2].value;
  const password = e.target[3].value;
  const category = e.target[4].value;
  const file = e.target[5].files[0];

  const formData = new FormData();
  formData.append("id", id);
  formData.append("name", name);
  formData.append("lastname", lastname);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("category", category);
  formData.append("avatar", file);

  const urlUser = "http://localhost:3001/api/form-user-edit";

  const config = {
    method: "PUT",
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  axios
    .put(urlUser, formData, config)
    .then((response) => {
      setErrors(response.data.data);

      if (response.data.data === "User update") setSendFormUser(true);
    })
    .catch((error) => {
      console.log(error);
    });
}

export { handleName, handleLastname, handleEmail, handleCategory, onSubmit };
