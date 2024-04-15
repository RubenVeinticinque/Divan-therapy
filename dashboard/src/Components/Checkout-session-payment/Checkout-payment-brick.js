import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../Partials/Body-title";
import { handleCheckoutPayment } from "../../assets/helpers/helper-checkout-payment";

function CheckoutPayment({ prices, isLogged }) {
  const [sessionAmount] = useState(prices ? prices.price : "");
  const [resolvePayment, setResolvePayment] = useState(false);
  const [statusPayment, setStatusPayment] = useState("");
  const [paymentBrick] = useState(
    handleCheckoutPayment(sessionAmount, setResolvePayment, setStatusPayment)
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) return navigate("/");
  }, [isLogged, navigate]);

  useEffect(() => {
    if (!sessionAmount) return navigate("/therapists");
  }, [sessionAmount, navigate]);

  useEffect(() => {
    if (resolvePayment)
      return navigate("/status-screen-brick-payment", {
        state: { id: resolvePayment, status: statusPayment, sessionAmount },
      });
  }, [resolvePayment, statusPayment, sessionAmount, navigate]);

  return (
    <>
      <Title text="Proceso de pago" />
      {paymentBrick}
    </>
  );
}
export { CheckoutPayment };
