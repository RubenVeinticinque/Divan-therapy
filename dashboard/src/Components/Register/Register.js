import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onSubmit } from "../../assets/helpers/helper-register";
import Title from "../Partials/Body-title";
import P from "../Partials/P";
import Label from "../Partials/Label";
import TextDanger from "../Partials/Text-danger";
import Input from "../Partials/Input";
import Button from "../Partials/Button";
import "../../assets/css/register.css";

function Register({ isLogged }) {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [file, setFile] = useState("");
  const [errors, setErrors] = useState("");
  const [createdRegister, setCreatedRegister] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged) return navigate("/login");
  }, [isLogged, navigate]);

  useEffect(() => {
    if (createdRegister) return navigate("/login");
  }, [createdRegister, navigate]);

  return (
    <>
      <Title text={"¡Bienvenido a Divan!"} />

      <P pId="p-help" pText="Estamos siempre para ayudarte" />
      <form
        className="form-register"
        encType="multipart/form-data"
        onSubmit={(e) => onSubmit(e, setErrors, setCreatedRegister)}
      >
        <Label className="display-none" htmlFor="name"></Label>

        <TextDanger text={errors.name ? errors.name.msg : ""} />
        <Input
          className="form-control inputs"
          type="text"
          name="name"
          id="name"
          placeholder="Enter your name"
          value={name}
          required={true}
          onChange={(e) => setName(e.target.value)}
        />

        <Label className="display-none" htmlFor="lastname" />

        <TextDanger text={errors.lastname ? errors.lastname.msg : ""} />
        <Input
          className="form-control inputs"
          type="text"
          name="lastname"
          id="lastname"
          placeholder="Enter your lastname"
          value={lastname}
          required={true}
          onChange={(e) => setLastname(e.target.value)}
        />

        <Label className="display-none" htmlFor="email" />

        <TextDanger text={errors.email ? errors.email.msg : ""} />
        <Input
          className="form-control inputs"
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Label className="display-none" htmlFor="password" />

        <TextDanger text={errors.password ? errors.password.msg : ""} />
        <Input
          className="form-control inputs"
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Label className="display-none" htmlFor="password2" />

        <TextDanger text={errors.password2 ? errors.password2.msg : ""} />
        <Input
          className="form-control inputs"
          type="password"
          name="password2"
          id="password2"
          placeholder="Confirm password"
          value={password2}
          required={true}
          onChange={(e) => setPassword2(e.target.value)}
        />

        <div className="mb-3 w-100">
          <Label
            className="form-label color-dark-green"
            htmlFor="formFile"
            labelText="Sube una imagen para tu perfil"
          />

          <Input
            className="form-control"
            type="file"
            name="avatar"
            id="formFile"
            accept=".jpg, .png, .gif"
            value={file}
            required={true}
            onChange={(e) => setFile(e.target.value)}
          />

          <TextDanger text={errors.avatar ? errors.avatar.msg : ""} />
        </div>

        <Button type="submit" className="btn-register" btnText="Registrate" />
      </form>

      <P
        pClassName="p-sign"
        pText={
          <React.Fragment>
            ¿Tienes una cuenta?{" "}
            <Link className="a-sign color-light-blue2" to="/login" exact="true">
              Inicia sesión
            </Link>
          </React.Fragment>
        }
      />
    </>
  );
}
export default Register;
