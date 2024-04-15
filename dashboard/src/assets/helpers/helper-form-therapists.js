import axios from "axios";

function onSubmit(e, isLogged, setErrors, setCreateRegister) {
  e.preventDefault();

  const id = isLogged.id;
  const name = e.target[0].value;
  const lastname = e.target[1].value;
  const email = e.target[2].value;
  const birthdate = e.target[3].value;
  const speciality = e.target[4].value;
  const typeTherapist = e.target[5].value;
  const phone = e.target[6].value;
  const medicalRegistration = e.target[7].value;
  const country = e.target[8].value;
  const province = e.target[9].value;
  const city = e.target[10].value;
  const zone = e.target[11].value;
  const establishment = e.target[12].value;
  const gender = e.target[13].value;
  const file = e.target[14].files[0];

  const formData = new FormData();
  formData.append("id", id);
  formData.append("name", name);
  formData.append("lastname", lastname);
  formData.append("email", email);
  formData.append("birthdate", birthdate);
  formData.append("speciality", speciality);
  formData.append("type_therapist", typeTherapist);
  formData.append("phone", phone);
  formData.append("medical_registration", medicalRegistration);
  formData.append("countries", country);
  formData.append("provinces", province);
  formData.append("cities", city);
  formData.append("zone", zone);
  formData.append("establishment", establishment);
  formData.append("gender", gender);
  formData.append("avatar", file);

  const urlTherapist = "http://localhost:3001/api/form-therapist";

  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  axios
    .post(urlTherapist, formData, config)
    .then((response) => {
      if (response.data.meta.total > 0) {
        return setErrors(response.data.data);
      }
      setCreateRegister(true);
      return setErrors(false);
    })
    .catch((err) => {
      console.log(err);
    });
}

export { onSubmit };
