import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../Partials/Body-title";
import TextDanger from "../Partials/Text-danger";
import Input from "../Partials/Input";
import Textarea from "../Partials/Textarea";
import Button from "../Partials/Button";
import Label from "../Partials/Label";
import { onSubmit } from "../../assets/helpers/helper-contact";
import "../../assets/css/home.css";

function Contact({ isLogged }) {
  const [errors, setErrors] = useState(false);
  const [sendContact, setSendContact] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) return navigate("/");
  }, [isLogged, navigate]);

  useEffect(() => {
    if (sendContact) return navigate("/");
  }, [sendContact, navigate]);

  return (
    <>
      <Title text={"Contacto"} />

      <form onSubmit={(e) => onSubmit(e, isLogged, setErrors, setSendContact)}>
        <Label className="display-none" htmlFor="name" />

        <TextDanger text={errors.name ? errors.name.msg : ""} />
        <Input
          className="form-control inputs"
          type="text"
          name="name"
          id="name"
          placeholder="Enter your name"
        />

        <Label className="display-none" htmlFor="lastname" />

        <TextDanger text={errors.lastname ? errors.lastname.msg : ""} />
        <Input
          className="form-control inputs"
          type="text"
          name="lastname"
          id="lastname"
          placeholder="Enter your lastname"
        />

        <Label className="display-none" htmlFor="email" />

        <TextDanger text={errors.email ? errors.email.msg : ""} />
        <Input
          className="form-control inputs"
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
        />

        <Label className="display-none" htmlFor="decription" />

        <TextDanger text={errors.description ? errors.description.msg : ""} />
        <Textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
          className="form-control inputs"
          placeholder="Write the reason for your message"
        />

        <Button type="submit" className="btn-register" btnText="Enviar" />
      </form>
    </>
  );
}

export default Contact;
