import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArticleH2PHome from "../Partials/Article-h2-p-home";
import ArticleH3PHome from "../Partials/Article-h3-p-home";
import ArticleH2ImgHome from "../Partials/Article-h2-img-home";
import {
  therapist,
  message,
  totalSession,
} from "../../assets/helpers/helper-content-routes";
import imgDonation from "../../assets/img/donation-2-1024x400.jpg";
import imgRegister from "../../assets/img/register.jpg";
import imgAdmision from "../../assets/img/admision.jpg";
import imgQueryBlue from "../../assets/img/query-blue.jpg";
import Price from "../Price/Price";
import UseElementOnScreen from "./Observe-therapists";
import UseElementMessageOnScreen from "./Observe-messages";
import UseElementTotalSessionsOnScreen from "./Observe-total-sessions";
import Title from "../Partials/Body-title";
import P from "../Partials/P";
import Label from "../Partials/Label";
import Input from "../Partials/Input";
import Span from "../Partials/Span";
import Img from "../Partials/Img";
import Button from "../Partials/Button";
import "../../assets/css/home.css";

function Home() {
  const [therapists, setTherapists] = useState([]);
  const [messages, setMessages] = useState([]);
  const [totalSessions, setTotalSessions] = useState([]);

  const [containerRef] = UseElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0,
  });
  const [containerTotalSessionsRef] = UseElementTotalSessionsOnScreen(
    {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    },
    totalSessions
  );
  const [containerMessageRef] = UseElementMessageOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0,
  });

  useEffect(() => {
    therapist(setTherapists);
    message(setMessages);
    totalSession(setTotalSessions);
  }, []);

  return (
    <>
      <Title text={"¡Hola!.. Ingresaste en Divan"} />
      <ArticleH2PHome
        articleClassName="main-description"
        h2ClassName="fs-4"
        h2Text="Breve información de Divan"
        pClassName="fs-6"
        pText="Divan therapy es un espacio pensado para personas que están
    atravesando momentos difíciles en su vida y necesitan expresar sus sentimientos con un profesional de la salud mental.
    "
        br={true}
        pText2="Somos un equipo de terapeutas al servicio de la comunidad que
    atendemos con amor y profesionalismo a cada persona.
    "
        br2={true}
        pText3="Te invitamos a que comiences a mejorar tu vida en terapia con
    nosotros.
    "
      />
      <h2 className="fs-3 title-guia margin-botton-3 color-light-green">
        Guía de introducción
      </h2>

      <ArticleH2ImgHome
        articleClassName="main-guia container-main-title-img margin-botton-3"
        divClassName="main-guia-title-and-subtitle"
        h2ClassName="fs-6 main-guia-h2 color-orange"
        h2Text="Primer paso"
        pText="Regístrese o ingrese si está registrado."
        imgClassName="img-register img-home"
        imgSrc={imgRegister}
        imgAlt="img register"
      />
      <ArticleH2PHome
        articleClassName="main-guia"
        h2ClassName="fs-6 main-guia-h2 color-orange"
        h2Text="Segundo paso"
        pClassName="fs-6"
        pText="Abonar la consulta. Puedes elegir modalidad presencial o en línea."
      />

      <Price title={true} />

      <ArticleH2ImgHome
        articleClassName="main-guia container-main-title-img margin-botton-3"
        divClassName="main-guia-title-and-subtitle"
        h2ClassName="fs-6 main-guia-h2 color-orange"
        h2Text="Tercer paso"
        pText="Seras evaluado y referido al profesional apropiado."
        imgClassName="img-register img-home"
        imgSrc={imgAdmision}
        imgAlt="img admission"
      />
      <ArticleH2ImgHome
        articleClassName="main-guia container-main-title-img"
        divClassName="main-guia-title-and-subtitle"
        h2ClassName="fs-6 main-guia-h2 color-orange"
        h2Text="Cuarto paso"
        pText="Coordina y realiza tus consultas estés donde estés."
        imgClassName="img-register img-home"
        imgSrc={imgQueryBlue}
        imgAlt="img query"
      />

      <ArticleH3PHome
        articleClassName="main-guia main-therapists"
        articleRef={containerRef}
        h3ClassName="fs-3 text-center"
        h3Text="Psicólogos"
        intoP={true}
        pClassName="display-7 text-center p-team-therapists"
        br={true}
        pText={
          "Somos un equipo de profesionales dedicados atender a quienes nos solicitan, con mucha voluntad, confianza, esmero y amor.Te acompañaremos para que puedas sentirte mejor.Todos nuestros profesionales que forman parte de diván terápia estan para apoyarte."
        }
        content={
          <React.Fragment>
            {therapists.map((therapist, index) => {
              return (
                <Link
                  to="/therapists"
                  exact="true"
                  className="form-therapists"
                  key={index}
                >
                  <Button
                    type="submit"
                    className="btn-card"
                    btnText={
                      <>
                        <Img
                          className="img-profile"
                          src={therapist.avatar}
                          alt="img card profile"
                        />
                        <div className="therapist-card-text">
                          <Label
                            htmlFor="name"
                            className="label-therapist color-dark-green"
                            id="label-name"
                            labelText={
                              therapist.name + " " + therapist.lastname
                            }
                          />
                          <Input
                            type="text"
                            className="display-none"
                            name="name"
                            title="name"
                            placeholder="name"
                          />
                          <Label
                            htmlFor="therapist"
                            className="label-therapist color-soft-green"
                            id="label-therapist"
                            labelText={therapist.type_therapist}
                          />
                          <Input
                            type="text"
                            className="display-none"
                            name="therapist"
                            title="therapist"
                            placeholder="therapist"
                          />
                          <Label
                            htmlFor="therapist_speciality"
                            className="label-therapist color-light-green"
                            id="label-speciality"
                            labelText={therapist.speciality}
                          />
                          <Input
                            type="text"
                            className="display-none"
                            name="therapist_spaeciality"
                            title="therapist_speciality"
                            placeholder="therapist speciality"
                          />
                          <Label
                            htmlFor="session"
                            className="label-therapist color-light-green"
                            id="label-sessions"
                            labelText={therapist.total_sessions + "sessions"}
                          />
                          <Input
                            type="text"
                            className="display-none"
                            name="session"
                            title="session"
                            placeholder="session"
                          />
                        </div>
                      </>
                    }
                  />
                </Link>
              );
            })}
          </React.Fragment>
        }
      />
      <section>
        <ArticleH3PHome
          articleClassName="main-guia main-therapists"
          h3ClassName="fs-3 text-center"
          h3Text="Únete al equipo"
          br={true}
          intoP={true}
          pClassName="display-7 text-center p-team-therapists"
          pId="p-enter-therapists"
          pText={
            <React.Fragment>
              Si eres un profesional de salud mental y quieres ser parte de
              diván terápia has click{" "}
              <Link to="/form-therapists" exact="true">
                aqui
              </Link>
            </React.Fragment>
          }
        />
        <ArticleH3PHome
          articleClassName="main-guia main-therapists"
          h3ClassName="fs-3 text-center"
          h3Text="Urgencias"
          br={true}
          intoP={true}
          pClassName="display-7 text-center p-team-therapists bg-color-orange"
          pId="p-emergency"
          pText={
            <React.Fragment>
              En caso de emergencias puede llamar a <strong> * 911 </strong>
              explicando la situación de emergencia que esta ocurriendo en ese
              momento.
            </React.Fragment>
          }
        />
        <ArticleH3PHome
          articleClassName="main-guia session-therapists text-center"
          articleRef={containerTotalSessionsRef}
          h3ClassName="fs-3"
          h3Text="Sesiones realizadas"
          br={true}
          intoP={true}
          pClassName="display-4"
          pId="p-home-total-sessions"
        />

        <ArticleH3PHome
          articleClassName="main-guia feedback text-center"
          articleRef={containerMessageRef}
          artticleId="feedback"
          h3ClassName="fs-5 color-soft-green"
          h3Text="Experiencias de pacientes"
          content={
            <React.Fragment>
              {messages.map((message, index) => {
                return (
                  <div type="submit" className="container-feedback" key={index}>
                    <div className="feedback-card">
                      <Span
                        className=" color-dark-green label-name"
                        text={message.name}
                      />
                      <Span
                        className="color-soft-green label-city"
                        text={message.lastname}
                      />
                      <Span
                        className="color-light-green label-date"
                        text={message.date}
                      />
                      <P
                        pClassName="color-dark-green label-paragraph"
                        pText={message.description}
                      />
                    </div>
                  </div>
                );
              })}
            </React.Fragment>
          }
        />

        <ArticleH3PHome
          articleClassName="main-guia container-donation"
          h3ClassName="fs-3 text-center"
          h3Text="Donación"
          br={true}
          intoP={true}
          pClassName="fs-6 margin-botton-3 text-center"
          pText="Donación para aquellos que no pueden pagar sus facturas de salud
            mental."
          content={
            <React.Fragment>
              <div className="main-guia-price">
                <Link
                  to="/donation"
                  exact="true"
                  className="btn-face-to-face bg-color-light-green color-white"
                >
                  Donar
                </Link>
              </div>
              <br />
              <picture className="main-guia donation">
                <Img
                  className="img-register img-home"
                  src={imgDonation}
                  alt="img of donation"
                />
              </picture>
            </React.Fragment>
          }
        />
      </section>
    </>
  );
}

export default Home;
