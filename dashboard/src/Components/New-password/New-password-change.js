import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../Partials/Body-title";
import ArticleH2PHome from "../Partials/Article-h2-p-home";
import "../../assets/css/home.css";

function NewPassChange() {
  const localStorageNewPassword = JSON.parse(
    localStorage.getItem("new-pass-change")
  );
  const [newPassChange] = useState(localStorageNewPassword);
  const navigate = useNavigate();

  useEffect(() => {
    if (newPassChange) {
      localStorage.removeItem("new-pass-change");
    } else {
      return navigate("/login");
    }
  }, [newPassChange, navigate]);

  return (
    <>
      <Title text="Cambio de contraseña" />
      <ArticleH2PHome
        articleClassName="main-description"
        h2ClassName="fs-4"
        h2Text="El cambio de contraseña fue exitoso"
        pClassName="fs-6"
        pText={
          <React.Fragment>
            Ahora puedes <strong>iniciar sesión</strong> con tu nueva
            contraseña.
          </React.Fragment>
        }
      />
    </>
  );
}
export { NewPassChange };
