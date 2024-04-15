import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import imgSessionPayment from "../../assets/img/pay.jpg";
import Title from "../Partials/Body-title";
import P from "../Partials/P";
import Img from "../Partials/Img";
import Button from "../Partials/Button";
import { price } from "../../assets/helpers/helper-content-routes";

function SessionPayment({ therapist, isLogged }) {
  const [prices, setPrices] = useState([]);
  const [dataTherapist, setDataTherapist] = useState(therapist);
  const navigate = useNavigate();

  useEffect(() => {
    price(setPrices);
  }, []);

  useEffect(() => {
    setDataTherapist(therapist);
  }, []);

  useEffect(() => {
    if (!isLogged) return navigate("/");
  }, [isLogged, navigate]);

  useEffect(() => {
    if (!dataTherapist) return navigate("/therapists");
  }, [dataTherapist, navigate]);

  return (
    <>
      <Title text={"Pago de sesión"} />

      <P
        pClassName="p-pay-session text-center"
        pText="Debes abonar la sesión previamente a comunicarte con el profesional de
        salud mental, en cualquiera de sus modalidades, presencial o en línea."
      />

      <Img
        className="img-pay"
        src={imgSessionPayment}
        alt="img sesion payment"
      />

      <div className="div-session-mode">
        <Link to="/session-mode" exact="true" state={dataTherapist}>
          <Button
            type="button"
            className="btn-ftf-session-mode bg-color-orange color-white"
            btnText="Volver"
          />
        </Link>

        <Link to="/payment-checkout" exact="true" state={prices}>
          <Button
            type="submit"
            className="btn-online-session-mode bg-color-light-green color-white"
            btnText="Pago"
          />
        </Link>
      </div>
    </>
  );
}

export default SessionPayment;
