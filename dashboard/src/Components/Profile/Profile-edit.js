import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Title from "../Partials/Body-title";
import P from "../Partials/P";
import Label from "../../Components/Partials/Label";
import TextDanger from "../Partials/Text-danger";
import Input from "../../Components/Partials/Input";
import Button from "../../Components/Partials/Button";
import {
  helperProfileEdit,
  handleInputName,
  handleInputLastname,
  handleInputEmail,
  onSubmit,
} from "../../assets/helpers/helper-profile-edit";
import "../../assets/css/register.css";

function ProfileEdit({ isLogged }) {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    helperProfileEdit(isLogged, setName, setLastname, setEmail);
  }, []);

  useEffect(() => {
    if (!isLogged) return navigate("/login");
  }, [isLogged, navigate]);

  useEffect(() => {
    if (errors.data === "Modified profile") return navigate("/profile");
  }, [errors, navigate]);

  return (
    <>
      <Title text="Editar perfil" />

      <P pId="p-help" pText="Puedes modificar tu perfil" />
      <form
        encType="multipart/form-data"
        className="form-register"
        onSubmit={(e) => onSubmit(e, isLogged, setErrors)}
      >
        <Label
          className="form-label color-dark-green"
          htmlFor="name"
          labelText="Ingresa tu nombre"
        />

        <TextDanger
          text={errors && errors.data.name ? errors.data.name.msg : ""}
        />
        <Input
          className="form-control inputs"
          type="text"
          name="name"
          id="name"
          placeholder="Enter your name"
          required={true}
          value={name}
          onChange={(e) => handleInputName(e, setName)}
        />

        <Label
          className="form-label color-dark-green"
          htmlFor="lastname"
          labelText="Ingresa tu apellido"
        />

        <TextDanger
          text={errors && errors.data.lastname ? errors.data.lastname.msg : ""}
        />
        <Input
          className="form-control inputs"
          type="text"
          name="lastname"
          id="lastname"
          placeholder="Enter your lastname"
          required={true}
          value={lastname}
          onChange={(e) => handleInputLastname(e, setLastname)}
        />

        <Label
          className="form-label color-dark-green"
          htmlFor="email"
          labelText="Ingresa tu email"
        />

        <TextDanger
          text={errors && errors.data.email ? errors.data.email.msg : ""}
        />
        <Input
          className="form-control inputs"
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          required={true}
          value={email}
          onChange={(e) => handleInputEmail(e, setEmail)}
        />

        <Label
          className="form-label color-dark-green"
          htmlFor="password"
          labelText="Ingresa tu contraseña"
        />

        <TextDanger
          text={errors && errors.data.password ? errors.data.password.msg : ""}
        />
        <Input
          className="form-control inputs"
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          required={true}
        />

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
        />

        <TextDanger
          text={errors && errors.data.avatar ? errors.data.avatar.msg : ""}
        />

        <Button type="submit" className="btn-register" btnText="Editar" />
      </form>
      <div>
        <Link
          to={`/delete-confirm/${isLogged.id}`}
          exact="true"
          className="btn-register"
          id="a-edit-profile"
        >
          Borrar
        </Link>
      </div>
    </>
  );
}
export { ProfileEdit };
