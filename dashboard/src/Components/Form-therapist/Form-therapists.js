import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../Partials/Body-title";
import P from "../Partials/P";
import TextDanger from "../Partials/Text-danger";
import Input from "../Partials/Input";
import Button from "../Partials/Button";
import Label from "../Partials/Label";
import Option from "../Partials/Option";
import handleRegions from "../../assets/helpers/helper-select-regions/helper-select-regions";
import { onSubmit } from "../../assets/helpers/helper-form-therapists";
import Select from "../Partials/Select";

function FormTherapists({ isLogged }) {
  const [errors, setErrors] = useState(false);
  const [createRegister, setCreateRegister] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    handleRegions();
  }, []);

  useEffect(() => {
    if (!isLogged) return navigate("/");
  }, [isLogged, navigate]);

  useEffect(() => {
    if (createRegister) return navigate("/therapists");
  }, [createRegister, navigate]);

  return (
    <>
      <Title text={"¡Bienvenido a Divan!"} />

      <P pId="p-help" pText="Formulario para ingresar a diván therapy" />
      <form
        className="form-register"
        encType="multipart/form-data"
        id="form-therapists"
        onSubmit={(e) => onSubmit(e, isLogged, setErrors, setCreateRegister)}
      >
        <div className="container-form-therapists">
          <div className="container-inputs">
            <Label
              className="color-dark-green"
              htmlFor="name"
              labelText="Ingresa tu nombre"
            />

            <TextDanger text={errors.name && errors.name.msg} />
            <Input
              className="form-control inputs"
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
            />

            <Label
              className="color-dark-green"
              htmlFor="lastname"
              labelText="Ingresa tu apellido"
            />

            <TextDanger text={errors.lastname && errors.lastname.msg} />
            <Input
              className="form-control inputs"
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Enter your lastname"
            />

            <Label
              className="color-dark-green"
              htmlFor="email"
              labelText="Ingresa tu email"
            />

            <TextDanger text={errors.email && errors.email.msg} />
            <Input
              className="form-control inputs"
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
            />

            <Label
              className="color-dark-green"
              htmlFor="date"
              labelText="Ingresa tu fecha de nacimiento"
            />

            <TextDanger text={errors.birthdate && errors.birthdate.msg} />
            <Input
              className="form-control inputs"
              type="date"
              name="birthdate"
              id="birthdate"
              placeholder="Enter your birthdate"
            />

            <Label
              className="color-dark-green"
              htmlFor="speciality"
              labelText="Ingresa tu especialidad"
            />

            <TextDanger text={errors.speciality && errors.speciality.msg} />
            <Input
              className="form-control inputs"
              type="text"
              name="speciality"
              id="speciality"
              placeholder="Speciality"
            />

            <Label
              className="color-dark-green"
              htmlFor="type_therapists"
              labelText="Ingresa el tipo de terapeuta"
            />

            <TextDanger
              text={errors.type_therapist && errors.type_therapist.msg}
            />
            <Input
              className="form-control inputs"
              type="text"
              name="type_therapist"
              id="type_therapists"
              placeholder="Type therapist"
            />

            <Label
              className="color-dark-green"
              htmlFor="phone"
              labelText="Ingresa tu teléfono"
            />

            <TextDanger text={errors.phone && errors.phone.msg} />
            <Input
              className="form-control inputs"
              type="tel"
              name="phone"
              id="phone"
              placeholder="Phone"
            />
          </div>
          <div className="container-inputs">
            <Label
              className="color-dark-green"
              htmlFor="medical_registration"
              labelText="Ingresa tu matrícula"
            />

            <TextDanger
              text={
                errors.medical_registration && errors.medical_registration.msg
              }
            />
            <Input
              className="form-control inputs"
              type="text"
              name="medical_registration"
              id="medical_registration"
              placeholder="Medical registration"
            />
            <Label
              className="color-dark-green"
              htmlFor="select-country"
              labelText="Ingresa tu país de residencia"
            />

            <TextDanger text={errors.countries && errors.countries.msg} />
            {/* <!-- Countries --> */}
            <Select
              className="form-select color-dark-green inputs"
              name="countries"
              ariaLabel="Default select example"
              id="select-country"
              textSelect={
                <Option id="option-country" textOption="Seleccione el país" />
              }
            />
            <Label
              className="color-dark-green"
              htmlFor="select-province"
              labelText="Ingresa tu provincia"
            />

            <TextDanger text={errors.provinces && errors.provinces.msg} />
            {/* <!-- Provinces --> */}
            <Select
              className="form-select color-dark-green inputs"
              name="provinces"
              ariaLabel="Default select example"
              id="select-province"
              textSelect={
                <Option
                  id="option-provinces"
                  textOption="Seleccione la provincia"
                />
              }
            />
            <Label
              className="color-dark-green"
              htmlFor="select-city"
              labelText="Ingresa tu ciudad"
            />

            <TextDanger text={errors.cities && errors.cities.msg} />
            {/* <!-- Cities --> */}
            <Select
              className="form-select color-dark-green inputs"
              name="cities"
              ariaLabel="Default select example"
              id="select-city"
              textSelect={
                <Option id="option-cities" textOption="Seleccione la ciudad" />
              }
            />

            {/* <!-- Zones --> */}
            <Label
              className="color-dark-green"
              htmlFor="zone"
              labelText="Ingresa tu barrio"
            />

            <TextDanger text={errors.zone && errors.zone.msg} />
            <Input
              className="form-control inputs"
              type="text"
              name="zone"
              id="zone"
              placeholder="Enter your zone"
            />

            <Label
              className="color-dark-green"
              htmlFor="establishment"
              labelText="Ingresa tu establecimiento"
            />

            <TextDanger
              text={errors.establishment && errors.establishment.msg}
            />
            <Input
              className="form-control inputs"
              type="text"
              name="establishment"
              id="establishment"
              placeholder="Enter your establishment"
            />

            <Label
              className="color-dark-green"
              htmlFor="gender"
              labelText="Ingresa tu género"
            />

            <TextDanger text={errors.gender && errors.gender.msg} />
            <Select
              className="form-select color-dark-green inputs"
              name="gender"
              id="gender"
              textSelect={
                <>
                  <Option
                    id="gender"
                    textOption="Seleccione su género"
                    hidden="hidden"
                  />

                  <Option value="Femenino" textOption="Femenino" />
                  <Option value="Masculino" textOption="Masculino" />
                </>
              }
            />

            <div className="mb-3">
              <Label
                htmlFor="formFile"
                className="form-label color-dark-green"
                labelText="Sube una imagen para tu perfil"
              />

              <Input
                className="form-control"
                type="file"
                name="avatar"
                id="formFile"
                accept=".jpg, .png, .gif"
              />

              <TextDanger text={errors.avatar && errors.avatar.msg} />
            </div>
          </div>
        </div>
        <Button type="submit" className="btn-register" btnText="Registrate" />
      </form>

      <P
        pClassName="p-sign"
        pText="Verificaremos la veracidad de tus datos.Te avisaremos mediante un mail
        si no fuiste selecionado."
      />
    </>
  );
}

export default FormTherapists;
