import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../Partials/Body-title";
import { handleCheckoutPayment } from "../../assets/helpers/helper-checkout-donation";

function CheckoutDonation({ isLogged, amount }) {
  const [donationAmount] = useState(amount ? amount : "");
  const [resolvePayment, setResolvePayment] = useState(false);
  const [statusPayment, setStatusPayment] = useState("");
  const [paymentBrick] = useState(
    handleCheckoutPayment(donationAmount, setResolvePayment, setStatusPayment)
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) return navigate("/");
  }, [isLogged, navigate]);

  useEffect(() => {
    if (!donationAmount) return navigate("/donation");
  }, [donationAmount, navigate]);

  useEffect(() => {
    if (resolvePayment)
      return navigate("/status-screen-brick", {
        state: { id: resolvePayment, status: statusPayment, amount },
      });
  }, [resolvePayment, statusPayment, amount, navigate]);

  return (
    <>
      <Title text="Proceso de pago" />
      {paymentBrick}
    </>
  );
}

export default CheckoutDonation;
