import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ImgDonation from "../../assets/img/donation.jpg";
import Title from "../Partials/Body-title";
import P from "../Partials/P";
import Img from "../Partials/Img";
import Button from "../Partials/Button";
import "../../assets/css/donation.css";

function Donations({ isLogged }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) return navigate("/");
  }, [isLogged, navigate]);

  return (
    <>
      <Title text={"¿Te gustaría hacer una donación?"} />

      <P
        pClassName="p-pay-session text-center"
        pId="p-pay-session"
        pText="Estamos recaudando fondos para ayudar a las personas que no pueden pagar
        sus facturas de salud mental."
      />

      <Img className="img-pay" src={ImgDonation} alt="img pay" />

      <div className="div-session-mode">
        <Link to="/" exact="true">
          <Button
            className="btn-ftf-session-mode bg-color-orange color-white"
            btnText="Volver"
          />
        </Link>
        <Link to="/donation-payment" exact="true">
          <Button
            className="btn-online-session-mode bg-color-light-green color-white"
            btnText="Donar"
          />
        </Link>
      </div>
    </>
  );
}

export default Donations;
