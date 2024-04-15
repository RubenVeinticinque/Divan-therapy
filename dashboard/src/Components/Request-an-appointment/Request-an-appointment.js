import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Title from "../Partials/Body-title";
import ArticleP from "../Partials/Article-p";
import P from "../Partials/P";
import Button from "../Partials/Button";
import "../../assets/css/online-modality.css";
import "../../assets/css/request-an-appointment.css";

function RequestAnAppointment({ isLogged, vc }) {
  const localStorageMA = JSON.parse(localStorage.getItem("ma"));
  const [userIsTherapist] = useState(isLogged ? isLogged.userIsTherapist : "");

  const [medAppo] = useState(localStorageMA);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) navigate("/login");
    vc(true);
  }, [isLogged, navigate]);

  return (
    <>
      <Title text="Turnos ó videollamada" />

      <ArticleP
        articleClassName="address-price"
        pId="p-request-return"
        pText={
          <React.Fragment>
            Al seleccionar el botón de videollamada verificaremos si ya se
            encuentra una cita programada con el especialista que ha selecionado
            en la modalidad en línea.
            <br />
            <br />
            De no tener una cita programada se redireccionará para que puedas
            solicitar un turno
            <br />
            <br /> El encuentro se llevará a cabo el día de la fecha y hora
            pautada en dicha modalidad.
          </React.Fragment>
        }
      />

      <P
        pClassName="p-thanks color-dark-gray"
        pText="Muchas gracias por su confianza. Estaré esperando."
      />

      <div className="div-session-mode">
        <Link to="/state-of-mind" exact="true">
          <Button
            type="button"
            className="btn-ftf-session-mode bg-color-orange color-white"
            id="btn-turns"
            btnText="Turnos"
          />
        </Link>
        <Link to={medAppo ? "/state-of-mind" : "/video-call"} exact="true">
          <Button
            type="button"
            className="btn-online-session-mode bg-color-light-green color-white"
            id="btn-vc"
            btnText="Video llamada"
          />
        </Link>
        {userIsTherapist ? (
          <Link to="/chat" exact="true" state={true}>
            <Button
              type="submit"
              className="btn-ftf-session-mode bg-color-orange color-white"
              id="btn-chat"
              btnText="Chat"
            />
          </Link>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default RequestAnAppointment;
