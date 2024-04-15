import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../Partials/Body-title";
import ArticleH2PHome from "../Partials/Article-h2-p-home";
import TextDanger from "../Partials/Text-danger";
import Input from "../Partials/Input";
import Button from "../Partials/Button";
import Label from "../Partials/Label";
import { onSubmit } from "../../assets/helpers/helper-new-password";
import "../../assets/css/home.css";

function NewPassword() {
  const localStorageNewPassword = JSON.parse(localStorage.getItem("new-pass"));
  const localStorageEmailNewPass = JSON.parse(
    localStorage.getItem("email-new-pass")
  );

  const [stateNewPass] = useState(localStorageNewPassword);
  const [email] = useState(localStorageEmailNewPass);
  const [errors, setErrors] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!stateNewPass) return navigate("/login");
    localStorage.removeItem("new-pass");
    localStorage.removeItem("email-new-pass");
  }, [stateNewPass, navigate]);

  useEffect(() => {
    if (errors === "Modified password") {
      localStorage.setItem("new-pass-change", JSON.stringify(true));
      return navigate("/new-pass-change");
    }
  }, [errors, navigate]);

  return (
    <>
      <Title text="Nueva contraseña" />
      <ArticleH2PHome
        articleClassName="main-description"
        h2ClassName="fs-5"
        h2Text="Tienes que ingresar una nueva contraseña. Guárdala en un lugar seguro
          y no la compartas."
        pClassName="fs-6"
        pText={
          <React.Fragment>
            <strong></strong>
          </React.Fragment>
        }
      />
      <form
        className="form-login"
        onSubmit={(e) => onSubmit(e, email, setErrors)}
      >
        <Label className="display-none" htmlFor="password"></Label>

        <TextDanger text={errors.password && errors.password.msg} />
        <Input
          className="form-control inputs"
          type="password"
          name="password"
          id="password"
          placeholder="Enter your new password"
          required={true}
        />

        <Label className="display-none" htmlFor="password2"></Label>

        <TextDanger text={errors.password2 && errors.password2.msg} />
        <Input
          className="form-control inputs"
          type="password"
          name="password2"
          id="password2"
          placeholder="Confirm new password"
          required={true}
        />

        <Button type="submit" className="btn-register" btnText="Enviar" />
      </form>
    </>
  );
}

export { NewPassword };
