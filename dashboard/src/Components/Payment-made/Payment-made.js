import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import P from "../Partials/P";
import Img from "../Partials/Img";
import LogoSuccess from "../../assets/img/icons/check-full-green.gif";
import { sendDatetime } from "../../assets/helpers/helper-payment-made";

function PaymentMade({ isLogged, state }) {
  const [status] = useState(state ? state.payment : false);
  const [statusPaymentMade] = useState(state ? state.state : false);
  const datetimeSelected = JSON.parse(
    localStorage.getItem("selected-datetime")
  );
  const localStorageMedApp = JSON.parse(
    localStorage.getItem("create-med-appointment")
  );
  const therapistsLocStorage = JSON.parse(localStorage.getItem("therapists"));
  const [createMedApp] = useState(localStorageMedApp);
  const [therapist] = useState(therapistsLocStorage);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) return navigate("/login");
  }, [isLogged, navigate]);

  useEffect(() => {
    if (!statusPaymentMade) return navigate("/");
    sendDatetime(datetimeSelected, createMedApp);
  }, [statusPaymentMade, navigate]);

  useEffect(() => {
    if (!status) {
      function navModality() {
        return navigate("/modality", {
          state: [
            { therapist: therapist[0].therapist },
            { sessionConfirm: false },
            { modality: datetimeSelected.modality },
            { startDate: new Date(therapist[3].startDate) },
          ],
        });
      }

      if (state) setTimeout(navModality, 10000);
    }
  }, [status, navigate]);

  return (
    <>
      <section className="payment-made">
        <P
          pClassName="text-center"
          pId="p-payment"
          pText={status ? "Donación completada" : "Pago realizado"}
        />

        <Img
          id="img-check"
          className="icon-check"
          src={LogoSuccess}
          alt="img check-full-green"
        />

        <P
          pClassName="text-center"
          pText={status ? "¡Muchas gracias! por su aporte" : "¡Muchas gracias!"}
        />
      </section>
    </>
  );
}

export default PaymentMade;
