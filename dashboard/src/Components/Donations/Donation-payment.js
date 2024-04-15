import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Title from "../Partials/Body-title";
import P from "../Partials/P";
import Input from "../Partials/Input";
import Button from "../Partials/Button";
import Label from "../Partials/Label";
import {
  clearAmount,
  onClick,
  onSubmit,
} from "../../assets/helpers/helper-donation-payments";
import "../../assets/css/donation-payment.css";

function DonationPayment({ isLogged }) {
  const [amount, setAmount] = useState();
  const [sendDonation, setSendDonation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    clearAmount();
  }, []);

  useEffect(() => {
    if (!isLogged) return navigate("/");
  }, [isLogged, navigate]);

  useEffect(() => {
    if (sendDonation) return navigate("/checkout-donation", { state: amount });
  }, [sendDonation, navigate, amount]);

  return (
    <>
      <Title text={"¿Cuánto puedes donar?"} />

      <P
        pClassName="p-pay-session text-center color-light-green"
        pId="payment-amount"
        pText={amount}
      />

      <form
        className="form-donation-payment"
        id="btn-donation-payment"
        onSubmit={(e) => onSubmit(e, amount, setSendDonation)}
      >
        <div className="div-keyboard-donation-payment">
          <Label htmlFor="number1" />
          <Input
            type="button"
            name="number1"
            id="number1"
            value="1"
            className="num-keyboards color-light-green"
            accesskey="1"
            onClick={(e) => onClick(e.target.value, setAmount)}
          />

          <Label htmlFor="number2" />
          <Input
            type="button"
            name="number2"
            id="number2"
            value="2"
            className="num-keyboards color-light-green"
            accesskey="2"
            onClick={(e) => onClick(e.target.value, setAmount)}
          />

          <Label htmlFor="number3" />
          <Input
            type="button"
            name="number3"
            id="number3"
            value="3"
            className="num-keyboards color-light-green"
            accesskey="3"
            onClick={(e) => onClick(e.target.value, setAmount)}
          />
        </div>
        <div className="div-keyboard-donation-payment">
          <Label htmlFor="number4" />
          <Input
            type="button"
            name="number4"
            id="number4"
            value="4"
            className="num-keyboards color-light-green"
            accesskey="4"
            onClick={(e) => onClick(e.target.value, setAmount)}
          />
          <Label htmlFor="number5" />
          <Input
            type="button"
            name="number5"
            id="number5"
            value="5"
            className="num-keyboards color-light-green"
            accesskey="5"
            onClick={(e) => onClick(e.target.value, setAmount)}
          />
          <Label htmlFor="number6" />
          <Input
            type="button"
            name="number6"
            id="number6"
            value="6"
            className="num-keyboards color-light-green"
            accesskey="6"
            onClick={(e) => onClick(e.target.value, setAmount)}
          />
        </div>
        <div className="div-keyboard-donation-payment">
          <Label htmlFor="number7" />
          <Input
            type="button"
            name="number7"
            id="number7"
            value="7"
            className="num-keyboards color-light-green"
            accesskey="7"
            onClick={(e) => onClick(e.target.value, setAmount)}
          />

          <Label htmlFor="number8" />
          <Input
            type="button"
            name="number8"
            id="number8"
            value="8"
            className="num-keyboards color-light-green"
            accesskey="8"
            onClick={(e) => onClick(e.target.value, setAmount)}
          />

          <Label htmlFor="number9" />
          <Input
            type="button"
            name="number9"
            id="number9"
            value="9"
            className="num-keyboards color-light-green"
            accesskey="9"
            onClick={(e) => onClick(e.target.value, setAmount)}
          />
        </div>
        <div className="div-keyboard-donation-payment">
          <Label htmlFor="number00" />
          <Input
            type="button"
            name="number00"
            id="number00"
            value="00"
            className="num-keyboards color-light-green"
            accesskey="00"
            onClick={(e) => onClick(e.target.value, setAmount)}
          />

          <Label htmlFor="number0" />
          <Input
            type="button"
            name="number0"
            id="number0"
            value="0"
            className="num-keyboards color-light-green"
            accesskey="0"
            onClick={(e) => onClick(e.target.value, setAmount)}
          />

          <Label htmlFor="number-back-keyboard" />
          <Input
            type="button"
            name="number-back-keyboard"
            id="number-back-keyboard"
            value=""
            className="num-keyboards btn-template-keyboard color-light-green"
            onClick={(e) => onClick(e.target.value, setAmount)}
          />
        </div>
      </form>

      <div className="div-session-mode">
        <Link to="/" exact="true">
          <Button
            type="submit"
            className="btn-ftf-session-mode bg-color-orange color-white"
            btnText="Cancel"
          />
        </Link>

        <Button
          type="submit"
          className="btn-online-session-mode bg-color-light-green color-white"
          form="btn-donation-payment"
          btnText="Send"
        />
      </div>
    </>
  );
}

export default DonationPayment;
