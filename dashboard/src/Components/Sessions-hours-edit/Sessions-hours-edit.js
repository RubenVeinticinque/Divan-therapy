import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Title from "../Partials/Body-title";
import P from "../Partials/P";
import Label from "../Partials/Label";
import TextDanger from "../Partials/Text-danger";
import Input from "../Partials/Input";
import Button from "../Partials/Button";
import {
  handleSessionsHours,
  onSubmit,
} from "../../assets/helpers/helper-admin/helper-sessions-hours.edit";
import "../../assets/css/register.css";

function SessionsHoursEdit({ isLogged, state }) {
  const [notFound] = useState(state ? state.state : false);
  const [stateSessionHours] = useState(state ? state.stateSessionHours : false);
  const [sessionHours, setSessionHours] = useState(
    state ? state.sessionsHours.session_hours : false
  );
  const [navSessionHourEdit, setNavSessionHourEdit] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) navigate("/login");
  }, [isLogged, navigate]);

  useEffect(() => {
    if (!stateSessionHours) navigate("/admin");
  }, [stateSessionHours, navigate]);

  useEffect(() => {
    if (navSessionHourEdit) navigate("/admin");
  }, [navSessionHourEdit, navigate]);

  return (
    <>
      <Title text="Editar horario de session" />

      {notFound ? (
        <>
          <P pId="p-help" pText="Formulario para editar las horas de sessión" />
          <form
            className="form-register"
            onSubmit={(e) => onSubmit(e, setError, setNavSessionHourEdit)}
          >
            <Label
              className="color-dark-green"
              htmlFor="session_hours"
              labelText="Ingresa las horas en minutos"
            />

            <TextDanger
              text={error.session_hours ? error.session_hours.msg : ""}
            />
            <Input
              className="form-control inputs"
              type="text"
              name="session_hours"
              id="session_hours"
              placeholder="Enter your session hours"
              value={sessionHours}
              required={true}
              onChange={(e) => handleSessionsHours(e, setSessionHours)}
            />
            <Button type="submit" className="btn-register" btnText="Editar" />
          </form>
          <div id="container-btn-delete">
            <Link
              to="/admin"
              exact="true"
              className="btn-register bg-color-light-green color-white w-100"
              id="a-edit-profile"
            >
              Volver
            </Link>
          </div>
        </>
      ) : (
        <>
          <P pId="p-help" pText="No se encuentra en nuestra base de datos" />
          <Link
            to="/sessions-hours-search"
            state={{ state: true }}
            exact="true"
            className="btn-back bg-color-orange color-white"
            id="container-btn-delete"
          >
            Volver
          </Link>
        </>
      )}
    </>
  );
}
export { SessionsHoursEdit };
