import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../Partials/Body-title";
import Label from "../Partials/Label";
import TextDanger from "../Partials/Text-danger";
import Select from "../Partials/Select";
import Option from "../Partials/Option";
import Textarea from "../Partials/Textarea";
import Button from "../Partials/Button";
import { onSubmit } from "../../assets/helpers/helper-users-messages";
import handleRegions from "../../assets/helpers/helper-select-regions/helper-select-regions";
import "../../assets/css/contact.css";

function UsersMessages({ isLogged }) {
  const [errors, setErrors] = useState(false);
  const [sendMessage, setSendMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    handleRegions();
  }, []);

  useEffect(() => {
    if (!isLogged) return navigate("/");
  }, [isLogged, navigate]);

  useEffect(() => {
    if (sendMessage) return navigate("/");
  }, [sendMessage, navigate]);

  return (
    <>
      <Title text={"Déjanos tu mensaje"} />

      <form onSubmit={(e) => onSubmit(e, isLogged, setErrors, setSendMessage)}>
        <TextDanger text={errors.countries && errors.countries.msg} />

        {/* <!-- Countries --> */}
        <Select
          className="form-select color-dark-green inputs"
          name="countries"
          id="select-country"
          idOption="option-country"
          valueOption=""
          textSelect={
            <>
              <Option id="option-country" textOption="Seleccione el país" />
            </>
          }
        />

        <TextDanger text={errors.provinces && errors.provinces.msg} />

        {/* <!-- Provinces --> */}
        <Select
          className="form-select color-dark-green inputs"
          name="provinces"
          id="select-province"
          idOption="option-provinces"
          valueOption=""
          textSelect={
            <>
              <Option
                id="option-provinces"
                textOption="Seleccione la provincia"
              />
            </>
          }
        />

        <TextDanger text={errors.cities && errors.cities.msg} />

        {/* <!-- Cities --> */}
        <Select
          className="form-select color-dark-green inputs"
          name="cities"
          id="select-city"
          idOption="option-cities"
          valueOption=""
          textSelect={
            <>
              <Option id="option-cities" textOption="Seleccione la ciudad" />
            </>
          }
        />

        <Label className="display-none" htmlFor="decription" />

        <TextDanger text={errors.description && errors.description.msg} />
        <Textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
          className="form-control inputs"
          placeholder="Write your message about divan therapy"
        />

        <Button type="submit" className="btn-register" btnText="Enviar" />
      </form>
    </>
  );
}

export default UsersMessages;
