import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StatusScreen } from "@mercadopago/sdk-react";
import Title from "../Partials/Body-title";
import {
  handleStatus,
  enterDonation,
} from "../../assets/helpers/helper-status-screen-bricks";

function StatusScreenBrick({ isLogged, status }) {
  const [statusPayment] = useState(status ? status : "");
  const [statusApproved, setStatusApproved] = useState(false);
  const [statusPending, setStatusPending] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [statusScreenBrick] = useState(
    <StatusScreen
      initialization={{ paymentId: statusPayment.id }}
      customization={{ visual: { showExternalReference: true } }}
    />
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (statusPayment) {
      handleStatus(
        status.status,
        setStatusApproved,
        setStatusPending,
        setErrorStatus
      );
    }
  }, []);

  useEffect(() => {
    if (!isLogged) return navigate("/");
  }, [isLogged, navigate]);

  useEffect(() => {
    if (!statusPayment) return navigate("/");
  }, [statusPayment, navigate]);

  useEffect(() => {
    if (statusApproved) {
      function approved() {
        const paymentMade = navigate("/payment-made", {
          state: { payment: true, state: true },
        });
        return paymentMade;
      }

      enterDonation(isLogged, statusPayment);
      setTimeout(approved, 10000);
    }
    if (statusPending) {
      function pending() {
        const pending = navigate("/pending", {
          state: true,
        });
        return pending;
      }
      setTimeout(pending, 10000);
    }
    if (errorStatus) {
      function error() {
        const error = navigate("/error", {
          state: true,
        });
        return error;
      }
      setTimeout(error, 10000);
    }
  }, [
    statusApproved,
    statusPending,
    errorStatus,
    isLogged,
    statusPayment,
    navigate,
  ]);

  return (
    <>
      <Title text="Estado de la operación" />
      {statusScreenBrick}
    </>
  );
}

export default StatusScreenBrick;
