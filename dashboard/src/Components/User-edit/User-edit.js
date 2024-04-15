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
  handleName,
  handleLastname,
  handleEmail,
  handleCategory,
  onSubmit,
} from "../../assets/helpers/helper-admin/helper-user-edit";
import "../../assets/css/register.css";

function UserEdit({ isLogged, state }) {
  const [notFound] = useState(state ? state.state : false);
  const [stateUsers] = useState(state ? state.stateUsers : false);
  const [name, setName] = useState(state ? state.user.name : false);
  const [lastname, setLastame] = useState(state ? state.user.lastname : false);
  const [email, setEmail] = useState(state ? state.user.email : false);
  const [category, setCategory] = useState(state ? state.user.category : false);
  const [errors, setErrors] = useState(false);
  const [sendFormUser, setSendFormUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) navigate("/login");
  }, [isLogged, navigate]);

  useEffect(() => {
    if (!stateUsers) navigate("/admin");
  }, [stateUsers, navigate]);

  useEffect(() => {
    if (sendFormUser) navigate("/admin");
  }, [sendFormUser, navigate]);

  return (
    <>
      <Title text="Editar usuario" />

      {notFound ? (
        <>
          <P pId="p-help" pText="Formulario para editar usuario" />
          <form
            className="form-register"
            encType="multipart/form-data"
            onSubmit={(e) => onSubmit(e, state, setErrors, setSendFormUser)}
          >
            <Label
              className="color-dark-green"
              htmlFor="name"
              labelText="Ingresa tu nombre"
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
              labelText="Ingresa tu apellido"
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
              labelText="Ingresa tu email"
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
              for="password"
              labelText="Ingresa tu contraseña"
            />

            <TextDanger text={errors.password ? errors.password.msg : ""} />
            <Input
              className="form-control inputs"
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              required={true}
            />
            <Label
              className="color-dark-green"
              htmlFor="gender"
              labelText="Ingresa tu categoría"
            />

            <TextDanger text={errors.category ? errors.category.msg : ""} />
            <Select
              className="form-select color-dark-green inputs"
              name="category"
              id="category"
              required={true}
              value={category}
              onChange={(e) => handleCategory(e, setCategory)}
              textSelect={
                <>
                  <Option
                    selected
                    disabled
                    hidden
                    id="category"
                    textOption="Seleccione la categoría"
                  />

                  <Option value="Admin" textOption="Admin" />

                  <Option value="Client" textOption="Client" />
                </>
              }
            />

            <Label
              for="formFile"
              className="form-label color-dark-green"
              labelText="Sube una imagen"
            />

            <Input
              className="form-control"
              type="file"
              name="avatar"
              id="formFile"
              accept=".jpg, .png, .gif"
            />

            <TextDanger text={errors.avatar ? errors.avatar.msg : ""} />

            <Button type="submit" className="btn-register" btnText="Editar" />
          </form>
          <div id="container-btn-delete">
            <Link
              to="/user-confirm-destroy"
              exact="true"
              state={{ state: true, id: state && state.user.id }}
              className="btn-register w-100"
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
            to="/user-search"
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
export { UserEdit };
