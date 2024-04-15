import axios from "axios";

function onSubmit(e, therapistId, setErrors) {
  e.preventDefault();

  const id = therapistId;
  const name = e.target[0].value;
  const lastname = e.target[1].value;
  const email = e.target[2].value;
  const birthdate = e.target[3].value;
  const speciality = e.target[4].value;
  const typeTherapist = e.target[5].value;
  const totalSessions = e.target[6].value;
  const phone = e.target[7].value;
  const medicalRegistration = e.target[8].value;
  const country = e.target[9].value;
  const province = e.target[10].value;
  const city = e.target[11].value;
  const zone = e.target[12].value;
  const establishment = e.target[13].value;
  const gender = e.target[14].value;
  const price = e.target[15].value;
  const sessionsHours = e.target[16].value;
  const file = e.target[17].files[0];

  const formData = new FormData();
  formData.append("id", id);
  formData.append("name", name);
  formData.append("lastname", lastname);
  formData.append("email", email);
  formData.append("birthdate", birthdate);
  formData.append("speciality", speciality);
  formData.append("type_therapist", typeTherapist);
  formData.append("total_sessions", totalSessions);
  formData.append("phone", phone);
  formData.append("medical_registration", medicalRegistration);
  formData.append("countries", country);
  formData.append("provinces", province);
  formData.append("cities", city);
  formData.append("zone", zone);
  formData.append("establishment", establishment);
  formData.append("gender", gender);
  formData.append("price", price);
  formData.append("session_hours", sessionsHours);
  formData.append("avatar", file);

  const urlTherapist = "http://localhost:3001/api/form-therapist-edit";

  const config = {
    method: "PUT",
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  axios
    .put(urlTherapist, formData, config)
    .then((response) => {
      setErrors(response.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleName(e, setName) {
  setName(e.target.value);
}
function handleLastname(e, setLastname) {
  setLastname(e.target.value);
}
function handleEmail(e, setEmail) {
  setEmail(e.target.value);
}
function handleBirthdate(e, setBirthdate) {
  setBirthdate(e.target.value);
}
function handleSpeciality(e, setSpeciality) {
  setSpeciality(e.target.value);
}
function handleTypeTherapist(e, setTypeTherapist) {
  setTypeTherapist(e.target.value);
}
function handleTotalSessions(e, setTotalSessions) {
  setTotalSessions(e.target.value);
}
function handlePhone(e, setPhone) {
  setPhone(e.target.value);
}
function handleMedicalRegistration(e, setMedicalRegistration) {
  setMedicalRegistration(e.target.value);
}
function handleZone(e, setZone) {
  setZone(e.target.value);
}
function handleEstablishment(e, setEstablishment) {
  setEstablishment(e.target.value);
}
function handlePrice(e, setPrice) {
  setPrice(e.target.value);
}
function handleSesionHours(e, setSessionsHours) {
  setSessionsHours(e.target.value);
}
function handleCountries(e, setCountries) {
  setCountries(e.target.value);
}
function handleProvinces(e, setProvinces) {
  setProvinces(e.target.value);
}
function handleCities(e, setCities) {
  setCities(e.target.value);
}
function handleGender(e, setGender) {
  setGender(e.target.value);
}

export {
  onSubmit,
  handleName,
  handleLastname,
  handleEmail,
  handleBirthdate,
  handleSpeciality,
  handleTypeTherapist,
  handleTotalSessions,
  handlePhone,
  handleMedicalRegistration,
  handleZone,
  handleEstablishment,
  handlePrice,
  handleSesionHours,
  handleCountries,
  handleProvinces,
  handleCities,
  handleGender,
};
