import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../Partials/Body-title";
import ArticleH2PHome from "../Partials/Article-h2-p-home";

function DivanTherapy({ isLogged }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) return navigate("/");
  }, [isLogged, navigate]);

  return (
    <>
      <Title text={"¡Hola!... Nos presentamos"} />
      <ArticleH2PHome
        articleClassName="main-description"
        h2ClassName="fs-4"
        h2Text="Breve información de Divan"
        pClassName="fs-6"
        pText="Divan therapy es un espacio pensado para personas que están
          atravesando momentos difíciles en su vida y necesitan expresar sus
          sentimientos con un profesional de la salud mental."
        br={true}
        pText2="Somos un equipo de terapeutas al servicio de la comunidad que
          atendemos con amor y profesionalismo a cada persona."
        br2={true}
        pText3="Te invitamos a que comiences a mejorar tu vida en terapia con
          nosotros."
      />
    </>
  );
}
export default DivanTherapy;
