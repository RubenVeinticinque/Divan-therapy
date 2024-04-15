import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Title from "../Partials/Body-title";
import P from "../Partials/P";
import TextDanger from "../Partials/Text-danger";
import FormSearchAdmin from "../Partials/Form-search-admin";
import { onSubmit } from "../../assets/helpers/helper-admin/helper-sessions-hours-search";
import "../../assets/css/profile.css";

function SessionsHoursSearch({ isLogged, state }) {
  const [status] = useState(state ? state.state : false);
  const [error, setError] = useState("");
  const [navSessionsHoursEdit, setNavSessionsHoursEdit] = useState(false);
  const [navSessionsHoursSelectedEdit, setNavSessionsHoursSelectedEdit] =
    useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) navigate("/login");
  }, [isLogged, navigate]);

  useEffect(() => {
    if (!status) navigate("/admin");
  }, [status, navigate]);

  useEffect(() => {
    if (navSessionsHoursEdit)
      return navigate("/sessions-hours-edit", {
        state: { state: false, sessionsHours: error, stateSessionHours: true },
      });
  }, [navSessionsHoursEdit, error, navigate]);

  useEffect(() => {
    if (navSessionsHoursSelectedEdit)
      return navigate("/sessions-hours-edit", {
        state: { state: true, sessionsHours: error, stateSessionHours: true },
      });
  }, [navSessionsHoursSelectedEdit, error, navigate]);

  return (
    <>
      <Title text="Buscar horario de sesión" />

      <P pId="p-help" pText="Buscar horario de sesión a editar por id" />
      <form
        className="form-register"
        id="form-therapists"
        onSubmit={(e) =>
          onSubmit(
            e,
            setError,
            setNavSessionsHoursEdit,
            setNavSessionsHoursSelectedEdit
          )
        }
      >
        <TextDanger text={error.search ? error.search.msg : ""} />
        <FormSearchAdmin />
      </form>
      <Link
        to="/admin"
        exact="true"
        className="btn-back bg-color-orange color-white"
      >
        Volver
      </Link>
    </>
  );
}
export { SessionsHoursSearch };
