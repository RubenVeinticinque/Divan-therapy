import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import P from "../Partials/P";
import Img from "../Partials/Img";
import LogoError from "../../assets/img/icons/circle-error.gif";
import "../../assets/css/home.css";

function Errors({ isLogged, state }) {
  const [status] = useState(state ? state : false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) return navigate("/");
  }, [isLogged, navigate]);

  useEffect(() => {
    if (!status) return navigate("/");
  }, [status, navigate]);

  return (
    <section className="payment-made">
      <P
        pClassName="text-center"
        pId="p-payment"
        pText="Error en la operación"
      />

      <Img
        id="img-check"
        className="icon-check"
        src={LogoError}
        alt="img check-full-green"
      />

      <P pClassName="text-center" pText="Vuelva a intentarlo" />
    </section>
  );
}

export default Errors;
