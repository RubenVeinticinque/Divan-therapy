import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../Partials/Body-title";
import ArticleH2PHome from "../Partials/Article-h2-p-home";
import Input from "../Partials/Input";
import Button from "../Partials/Button";
import Label from "../Partials/Label";
import { onSubmit } from "../../assets/helpers/helper-forget-password";

function FrogetPassword() {
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (errors === "Email sent") return navigate("/login");
  }, [errors, navigate]);

  return (
    <>
      <Title text={"Olvido de contraseña"} />
      <ArticleH2PHome
        articleClassName="main-description"
        h2ClassName="fs-4"
        h2Text="Si olvidateste tú contraseña"
        pClassName="fs-6"
        pText={
          <React.Fragment>
            <strong>Enviaremos un correo a tu casilla</strong>
          </React.Fragment>
        }
      />
      <form className="form-login" onSubmit={(e) => onSubmit(e, setErrors)}>
        <Label className="display-none" htmlFor="email" />

        <div className="text-danger">{errors.email && errors.email.msg}</div>
        <Input
          className="form-control inputs"
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          required={true}
        />

        <Button type="submit" className="btn-register" btnText="Enviar" />
      </form>
    </>
  );
}

export default FrogetPassword;
