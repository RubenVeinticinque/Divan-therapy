import axios from "axios";

function helperProfileEdit(isLogged, setName, setLastname, setEmail) {
  try {
    if (isLogged) {
      async function fetchProfileEdit() {
        const urlProfileEdit = "http://localhost:3001/api/profile";
        const config = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(isLogged),
        };

        const fetchProfileEdit = await fetch(urlProfileEdit, config);
        const response = await fetchProfileEdit.json();

        if (
          response.data !== "User not found" ||
          response.data !== "Error user not found"
        ) {
          setName(response.data.name);
          setLastname(response.data.lastname);
          setEmail(response.data.userEmail);
        }
      }
      fetchProfileEdit();
    }
  } catch (error) {
    console.log(error);
  }
}
function handleInputName(e, setName) {
  setName(e.target.value);
}
function handleInputLastname(e, setLastname) {
  setLastname(e.target.value);
}
function handleInputEmail(e, setEmail) {
  setEmail(e.target.value);
}

function onSubmit(e, isLogged, setErrors) {
  e.preventDefault();

  const id = isLogged.id;
  const name = e.target[0].value;
  const lastname = e.target[1].value;
  const email = e.target[2].value;
  const password = e.target[3].value;
  const file = e.target[4].files[0];

  const formData = new FormData();
  formData.append("id", id);
  formData.append("name", name);
  formData.append("lastname", lastname);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("avatar", file);

  async function fetchProfileEdit() {
    const urlProfileEdit = "http://localhost:3001/api/profile-edit";
    const config = {
      method: "PUT",
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    try {
      const fetchProfileEdit = await axios.put(
        urlProfileEdit,
        formData,
        config
      );
      const response = await fetchProfileEdit;

      setErrors(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  fetchProfileEdit();
}

export {
  helperProfileEdit,
  handleInputName,
  handleInputLastname,
  handleInputEmail,
  onSubmit,
};
