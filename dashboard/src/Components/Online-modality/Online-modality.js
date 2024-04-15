import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { price } from "../../assets/helpers/helper-content-routes";
import {
  sessionHours,
  addressTherapist,
  dateT,
  localStorageDatetime,
  localStorageTherapist,
} from "../../assets/helpers/helper-online-modality";
import Title from "../Partials/Body-title";
import ArticleP from "../Partials/Article-p";
import P from "../Partials/P";
import Img from "../Partials/Img";
import Label from "../Partials/Label";
import Button from "../Partials/Button";
import "../../assets/css/online-modality.css";

function OnlineModality({ therapist, isLogged, vc }) {
  const [selectedTherpist, setSelectedTherapist] = useState(therapist);
  const [prices, setPrice] = useState([]);
  const [sessionH, setSessionH] = useState([]);
  const [addressT, setAddressTherpist] = useState([]);
  const [datetime, setDatetime] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setSelectedTherapist(therapist);
    vc(true);
  }, []);

  useEffect(() => {
    if (!isLogged) return navigate("/");
  }, [isLogged, navigate]);

  useEffect(() => {
    if (!selectedTherpist) return navigate("/therapists");
  }, [selectedTherpist, navigate]);

  useEffect(() => {
    price(setPrice);
    sessionHours(setSessionH);
    selectedTherpist &&
      addressTherapist(setAddressTherpist, selectedTherpist[0]);
  }, [selectedTherpist]);

  useEffect(() => {
    selectedTherpist && dateT(setDatetime, selectedTherpist[3]);
    localStorageDatetime(selectedTherpist, isLogged, addressT);
    localStorageTherapist(therapist);

    if (selectedTherpist && !selectedTherpist[1].sessionConfirm) {
      localStorage.removeItem("selected-datetime");
      localStorage.removeItem("create-med-appointment");
    }
  }, [datetime, addressT, isLogged, selectedTherpist]);

  return (
    <>
      <Title
        text={
          selectedTherpist && selectedTherpist[2].modality
            ? "Sesión en línea"
            : "Sesión presencial"
        }
      />
      <div className="div-sub-title">
        <P pClassName="sub-title" pText="Próxima sesión" />
      </div>
      <div type="submit" className="btn-card">
        <Img
          className="img-profile"
          src={selectedTherpist && selectedTherpist[0].therapist.avatar}
          alt="img card profile"
        />
        <div className="therapist-card-text">
          <Label
            htmlFor="name"
            className="label-therapist color-dark-green"
            id="label-name"
            labelText={
              selectedTherpist &&
              selectedTherpist[0].therapist.name +
                " " +
                selectedTherpist[0].therapist.lastname
            }
          />

          <Label
            htmlFor="therapist-type"
            className="label-therapist color-soft-green"
            id="label-therapist"
            labelText={
              selectedTherpist && selectedTherpist[0].therapist.type_therapist
            }
          />

          <Label
            htmlFor="therapist-speciality"
            className="label-therapist color-light-green"
            id="label-speciality"
            labelText={
              selectedTherpist && selectedTherpist[0].therapist.speciality
            }
          />

          <Label
            htmlFor="session"
            className="label-therapist color-light-green"
            id="label-sessions"
            labelText={
              selectedTherpist &&
              selectedTherpist[0].therapist.total_sessions + " sessions"
            }
          />
        </div>
      </div>
      {selectedTherpist && selectedTherpist[1].sessionConfirm ? (
        <P pClassName="p-modality color-dark-gray" pText="Confirmar cita" />
      ) : (
        <P
          pClassName="p-payment-made fs-2 color-light-green"
          pText="Pago realizado"
        />
      )}
      <section className="establishment-address-price">
        <Label htmlFor="turn" className="turn-title" labelText={datetime} />

        {selectedTherpist && selectedTherpist[2].modality ? (
          <ArticleP
            articleClassName="address-price"
            pClassName="p-online-modality"
            pText="El encuentro se llevará a cabo el día de la fecha y hora pautada en la modalidad en línea."
          />
        ) : (
          <article className="address-price">
            <div className="text-start address p-online-modality">
              <P pText={"Address :" + addressT.address} />
              <P pText={"Email :" + addressT.email} />
              <P pText={"Phone :" + addressT.phone} />
            </div>
          </article>
        )}

        <P
          pClassName="p-thanks color-dark-gray"
          pText="Muchas gracias por su confianza. Estaré esperando."
        />

        <ArticleP
          articleClassName="address-price price-session"
          pClassName="fs-4"
          p2ClassName="fs-4"
          pText={<React.Fragment>ARS {prices.price}</React.Fragment>}
          p2Text={
            <React.Fragment>
              Session {sessionH.session_hours} min
            </React.Fragment>
          }
        />
      </section>
      {selectedTherpist && selectedTherpist[1].sessionConfirm ? (
        <div className="div-session-mode">
          <Link
            to="/session-mode"
            exact="true"
            state={selectedTherpist[0].therapist}
          >
            <Button
              type="button"
              className="btn-ftf-session-mode bg-color-orange color-white"
              btnText="Volver"
            />
          </Link>
          <Link
            to="/session-payment"
            exact="true"
            state={selectedTherpist[0].therapist}
          >
            <Button
              type="button"
              className="btn-online-session-mode bg-color-light-green color-white"
              btnText="Confirmar"
            />
          </Link>
        </div>
      ) : (
        <div className="div-session-mode">
          <Link to="/chat" exact="true" state={true}>
            <Button
              type="submit"
              className="btn-ftf-session-mode bg-color-orange color-white"
              btnText="Chat"
            />
          </Link>
          <Link to="/video-call" exact="true">
            <Button
              type="submit"
              className="btn-online-session-mode bg-color-light-green color-white"
              btnText="Video llamada"
            />
          </Link>
        </div>
      )}
    </>
  );
}

export default OnlineModality;
