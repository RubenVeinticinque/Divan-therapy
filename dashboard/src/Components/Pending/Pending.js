import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import P from "../Partials/P";
import "../../assets/css/home.css";

function Pending({ isLogged, state }) {
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
        pText="Operación pendiente a ser aprobada"
      />
    </section>
  );
}

export default Pending;
