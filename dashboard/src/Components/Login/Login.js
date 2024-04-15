import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import imgLogin from "../../assets/img/Login.jpg";
import Title from "../Partials/Body-title";
import { onSubmit } from "../../assets/helpers/helper-login";
import P from "../Partials/P";
import Img from "../Partials/Img";
import Label from "../Partials/Label";
import TextDanger from "../Partials/Text-danger";
import Input from "../Partials/Input";
import Button from "../Partials/Button";
import "../../assets/css/login.css";

function Login({ isLogged }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const localS = JSON.parse(localStorage.getItem("userLogged"));
  const [user, setUser] = useState(localS);
  const navigate = useNavigate();

  useEffect(() => {
    if (localS) {
      isLogged(localS);
      return navigate("/request-an-appointment");
    }
  }, [user, isLogged, localS, navigate]);

  return (
    <>
      <Title text={"¡Bienvenido otra vez!"} />
      <picture className="pic-img-login">
        <Img id="img-login" src={imgLogin} alt="img-login" />
      </picture>

      <form
        className="form-login"
        onSubmit={(e) => onSubmit(e, setErrors, setUser)}
      >
        <Label className="display-none" htmlFor="email" />

        <TextDanger text={errors.email && errors.email.msg} />
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

        <TextDanger text={errors.password && errors.password.msg} />
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

        <div className="a-div-sign">
          <Link
            className="a-sign color-light-blue2"
            to="/forget-password"
            exact="true"
          >
            ¿Olvidó su contraseña?
          </Link>
        </div>

        <Button type="submit" className="btn-register" btnText="Login" />
      </form>

      <P
        pClassName="p-sign"
        pText={
          <React.Fragment>
            ¿Si no tienes una cuenta?{" "}
            <Link
              className="a-sign color-light-blue2"
              to="/register"
              exact="true"
            >
              Únete
            </Link>
          </React.Fragment>
        }
      />
    </>
  );
}

export default Login;
