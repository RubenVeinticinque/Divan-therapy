import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Title from "../Partials/Body-title";
import P from "../Partials/P";
import Label from "../Partials/Label";
import TextDanger from "../Partials/Text-danger";
import Input from "../Partials/Input";
import Select from "../Partials/Select";
import Option from "../Partials/Option";
import Button from "../Partials/Button";
import {
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
  handleGender,
  handleProvinces,
  handleCities,
} from "../../assets/helpers/helper-admin/helper-therapist-edit";
import handleRegions from "../../assets/helpers/helper-select-regions/helper-select-regions";
import "../../assets/css/form-therapists.css";

function TherapistEdit({ isLogged, status }) {
  const [notFound] = useState(status ? status.state : false);
  const [name, setName] = useState(status ? status.therapist.name : false);
  const [lastname, setLastame] = useState(
    status ? status.therapist.lastname : false
  );
  const [email, setEmail] = useState(status ? status.therapist.email : false);
  const [birthdate, setBirthdate] = useState(
    status ? status.therapist.birthdate : false
  );
  const [speciality, setSpeciality] = useState(
    status ? status.therapist.speciality : false
  );
  const [typeTherapist, setTypeTherapist] = useState(
    status ? status.therapist.type_therapist : false
  );
  const [totalSessions, setTotalSessions] = useState(
    status ? status.therapist.total_sessions : false
  );
  const [phone, setPhone] = useState(status ? status.therapist.phone : false);
  const [medicalRegistration, setMedicalRegistration] = useState(
    status ? status.therapist.medical_registration : false
  );
  const [zone, setZone] = useState(status ? status.therapist.zone : false);
  const [establishment, setEstablishment] = useState(
    status ? status.therapist.establishment : false
  );
  const [gender, setGender] = useState(
    status ? status.therapist.gender : false
  );
  const [price, setPrice] = useState(status ? status.therapist.price : false);
  const [sessionsHours, setSessionsHours] = useState(
    status ? status.therapist.session_hours : false
  );
  const [country, setCountries] = useState(
    status ? status.therapist.countries : false
  );
  const [province, setProvinces] = useState(
    status ? status.therapist.provinces : false
  );
  const [city, setCities] = useState(status ? status.therapist.cities : false);
  const [state] = useState(status ? status.stateTherapists : false);
  const [errors, setErrors] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    handleRegions(country, province, city);
  }, []);

  useEffect(() => {
    if (!isLogged) navigate("/login");
  }, [isLogged, navigate]);

  useEffect(() => {
    if (errors === "Therapist update") navigate("/admin");
  }, [errors, navigate]);

  useEffect(() => {
    if (!state) navigate("/admin");
  }, [state, navigate]);

  return (
    <>
      <Title text="Editar terapeuta" />
      {notFound ? (
        <>
          <P pId="p-help" pText="Formulario para editar terapeuta" />
          <form
            encType="multipart/form-data"
            className="form-register"
            id="form-therapists"
            onSubmit={(e) => onSubmit(e, status.therapist.id, setErrors)}
          >
            <div className="container-form-therapists">
              <div className="container-inputs">
                <Label
                  className="color-dark-green"
                  htmlFor="name"
                  labelText="Ingresa el nombre"
                />

                <TextDanger text={errors.name ? errors.name.msg : ""} />
                <Input
                  className="form-control inputs"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  required={true}
                  onChange={(e) => handleName(e, setName)}
                />

                <Label
                  className="color-dark-green"
                  htmlFor="lastname"
                  labelText="Ingresa el apellido"
                />

                <TextDanger text={errors.lastname ? errors.lastname.msg : ""} />
                <Input
                  className="form-control inputs"
                  type="text"
                  name="lastname"
                  id="lastname"
                  placeholder="Enter your lastname"
                  value={lastname}
                  required={true}
                  onChange={(e) => handleLastname(e, setLastame)}
                />

                <Label
                  className="color-dark-green"
                  htmlFor="email"
                  labelText="Ingresa el email"
                />

                <TextDanger text={errors.email ? errors.email.msg : ""} />
                <Input
                  className="form-control inputs"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  required={true}
                  onChange={(e) => handleEmail(e, setEmail)}
                />

                <Label
                  className="color-dark-green"
                  htmlFor="birthdate"
                  labelText="Ingresa la fecha de nacimiento"
                />

                <TextDanger
                  text={errors.birthdate ? errors.birthdate.msg : ""}
                />
                <Input
                  className="form-control inputs"
                  type="date"
                  name="birthdate"
                  id="birthdate"
                  placeholder="Enter your birthdate"
                  value={birthdate}
                  required={true}
                  onChange={(e) => handleBirthdate(e, setBirthdate)}
                />

                <Label
                  className="color-dark-green"
                  htmlFor="speciality"
                  labelText="Ingresa la especialidad"
                />

                <TextDanger
                  text={errors.speciality ? errors.speciality.msg : ""}
                />
                <Input
                  className="form-control inputs"
                  type="text"
                  name="speciality"
                  id="speciality"
                  placeholder="Speciality"
                  value={speciality}
                  required={true}
                  onChange={(e) => handleSpeciality(e, setSpeciality)}
                />

                <Label
                  className="color-dark-green"
                  htmlFor="type_therapists"
                  labelText="Ingresa el tipo de terapeuta"
                />

                <TextDanger
                  text={errors.type_therapist ? errors.type_therapist.msg : ""}
                />
                <Input
                  className="form-control inputs"
                  type="text"
                  name="type_therapist"
                  id="type_therapists"
                  placeholder="Type therapist"
                  value={typeTherapist}
                  required={true}
                  onChange={(e) => handleTypeTherapist(e, setTypeTherapist)}
                />
                <Label
                  className="color-dark-green"
                  htmlFor="total_sessions"
                  labelText="Ingresa el total de sesiones"
                />

                <TextDanger
                  text={errors.total_sessions ? errors.total_sessions.msg : ""}
                />
                <Input
                  className="form-control inputs"
                  type="text"
                  name="total_sessions"
                  id="total_sessions"
                  placeholder="total sessions"
                  value={totalSessions}
                  required={true}
                  onChange={(e) => handleTotalSessions(e, setTotalSessions)}
                />

                <Label
                  className="color-dark-green"
                  htmlFor="phone"
                  labelText="Ingresa el teléfono"
                />

                <TextDanger text={errors.phone ? errors.phone.msg : ""} />
                <Input
                  className="form-control inputs"
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="Phone"
                  value={phone}
                  required={true}
                  onChange={(e) => handlePhone(e, setPhone)}
                />
              </div>
              <div className="container-inputs">
                <Label
                  className="color-dark-green"
                  htmlFor="medical_registration"
                  labelText="Ingresa la matrícula"
                />

                <TextDanger
                  text={
                    errors.medical_registration
                      ? errors.medical_registration.msg
                      : ""
                  }
                />
                <Input
                  className="form-control inputs"
                  type="text"
                  name="medical_registration"
                  id="medical_registration"
                  placeholder="Medical registration"
                  value={medicalRegistration}
                  required={true}
                  onChange={(e) =>
                    handleMedicalRegistration(e, setMedicalRegistration)
                  }
                />

                <Label
                  className="color-dark-green"
                  htmlFor="select-country"
                  labelText="Ingresa el país de residencia"
                />

                {/* <!-- Countries --> */}

                <TextDanger
                  text={errors.countries ? errors.countries.msg : ""}
                />
                <Select
                  className="form-select color-dark-green inputs"
                  name="countries"
                  aria-label="Default select example"
                  id="select-country"
                  value={country}
                  required={true}
                  textSelect={
                    <>
                      <Option
                        id="option-country"
                        textOption="Seleccione el país"
                      />
                      <Option selected id="opt-country" textOption={country} />
                    </>
                  }
                  onChange={(e) => handleCountries(e, setCountries)}
                />

                <Label
                  className="color-dark-green"
                  htmlFor="select-province"
                  labelText="Ingresa la provincia"
                />

                {/* <!-- Provinces --> */}

                <TextDanger
                  text={errors.provinces ? errors.provinces.msg : ""}
                />
                <Select
                  className="form-select color-dark-green inputs"
                  name="provinces"
                  aria-label="Default select example"
                  id="select-province"
                  value={province}
                  required={true}
                  textSelect={
                    <>
                      <Option
                        id="option-provinces"
                        textOption="Seleccione la provincia"
                      />
                      <Option
                        // selected
                        id="opt-provinces"
                        textOption={province}
                      />
                    </>
                  }
                  onChange={(e) => handleProvinces(e, setProvinces)}
                />

                <Label
                  className="color-dark-green"
                  htmlFor="select-city"
                  labelText="Ingresa la ciudad"
                />

                {/* <!-- Cities --> */}

                <TextDanger text={errors.cities ? errors.cities.msg : ""} />
                <Select
                  className="form-select color-dark-green inputs"
                  name="cities"
                  aria-label="Default select example"
                  id="select-city"
                  value={city}
                  required={true}
                  textSelect={
                    <>
                      <Option
                        // selected
                        id="option-cities"
                        textOption="Seleccione la ciudad"
                      />
                      <Option selected id="opt-cities" textOption={city} />
                    </>
                  }
                  onChange={(e) => handleCities(e, setCities)}
                />

                {/* <!-- Zones --> */}
                <Label
                  className="color-dark-green"
                  htmlFor="zone"
                  labelText="Ingresa el barrio"
                />

                <TextDanger text={errors.zone ? errors.zone.msg : ""} />
                <Input
                  className="form-control inputs"
                  type="text"
                  name="zone"
                  id="zone"
                  placeholder="Enter your zone"
                  value={zone}
                  required={true}
                  onChange={(e) => handleZone(e, setZone)}
                />

                <Label
                  className="color-dark-green"
                  htmlFor="establishment"
                  labelText="Ingresa el establecimiento"
                />

                <TextDanger
                  text={errors.establishment ? errors.establishment.msg : ""}
                />
                <Input
                  className="form-control inputs"
                  type="text"
                  name="establishment"
                  id="establishment"
                  placeholder="Enter your establishment"
                  value={establishment}
                  required={true}
                  onChange={(e) => handleEstablishment(e, setEstablishment)}
                />

                <Label
                  className="color-dark-green"
                  htmlFor="gender"
                  labelText="Ingresa el género"
                />

                <TextDanger text={errors.gender ? errors.gender.msg : ""} />
                <Select
                  className="form-select color-dark-green inputs"
                  name="gender"
                  id="gender"
                  value={gender}
                  required={true}
                  textSelect={
                    <>
                      <Option
                        selected
                        disabled
                        hidden
                        id="gender"
                        textOption="Seleccione el género"
                      />
                      <Option value="Femenino" textOption="Femenino" />
                      <Option value="Masculino" textOption="Masculino" />
                    </>
                  }
                  onChange={(e) => handleGender(e, setGender)}
                />

                <Label
                  className="color-dark-green"
                  htmlFor="price"
                  labelText="Honorarios"
                />

                <TextDanger text={errors.price ? errors.price.msg : ""} />
                <Input
                  className="form-control inputs"
                  type="text"
                  name="price"
                  id="price"
                  placeholder="Enter your name"
                  readonly
                  value={price}
                  required={true}
                  onChange={(e) => handlePrice(e, setPrice)}
                />
                <Label
                  className="color-dark-green"
                  htmlFor="session_hours"
                  labelText="Horas de sessión"
                />

                <TextDanger
                  text={errors.session_hours ? errors.session_hours.msg : ""}
                />
                <Input
                  className="form-control inputs"
                  type="text"
                  name="session_hours"
                  id="session_hours"
                  placeholder="Enter your name"
                  readonly
                  value={sessionsHours}
                  required={true}
                  onChange={(e) => handleSesionHours(e, setSessionsHours)}
                />

                <div className="mb-3">
                  <Label
                    htmlFor="formFile"
                    className="form-label color-dark-green"
                    labelText="Sube una imagen"
                  />

                  <TextDanger text={errors.avatar ? errors.avatar.msg : ""} />
                  <Input
                    className="form-control"
                    type="file"
                    name="avatar"
                    id="formFile"
                    accept=".jpg, .png, .gif"
                  />
                </div>
              </div>
            </div>
            <Button type="submit" className="btn-register" btnText="Editar" />
          </form>
          <div id="container-btn-delete">
            <Link
              to="/therapist-confirm-destroy"
              state={{ state: true, id: status && status.therapist.id }}
              exact="true"
              className="btn-register bg-color-light-green color-white w-100"
              id="a-edit-profile"
            >
              Borrar
            </Link>
          </div>
        </>
      ) : (
        <>
          <P pId="p-help" pText="No se encuentra en nuestra base de datos" />
          <Link
            to="/therapist-search"
            state={{ state: true }}
            exact="true"
            className="btn-back bg-color-orange color-white"
          >
            Volver
          </Link>
        </>
      )}
    </>
  );
}

export { TherapistEdit };
