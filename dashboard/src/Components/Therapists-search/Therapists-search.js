import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Title from "../Partials/Body-title";
import P from "../Partials/P";
import TextDanger from "../Partials/Text-danger";
import FormSearchAdmin from "../Partials/Form-search-admin";
import { onSubmit } from "../../assets/helpers/helper-admin/helper-therapists-search";
import "../../assets/css/profile.css";

function TherapistsSearch({ isLogged, state }) {
  const [status] = useState(state ? state.state : false);
  const [error, setError] = useState("");
  const [navTherapistEdit, setNavTherapistEdit] = useState(false);
  const [navTherapistSelectedEdit, setNavTherapistSelectedEdit] =
    useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) navigate("/login");
  }, [isLogged, navigate]);

  useEffect(() => {
    if (!status) navigate("/admin");
  }, [status, navigate]);

  useEffect(() => {
    if (navTherapistEdit)
      return navigate("/therapist-edit", {
        state: { state: false, therapist: error, stateTherapists: true },
      });
  }, [navTherapistEdit, navigate]);

  useEffect(() => {
    if (navTherapistSelectedEdit)
      return navigate("/therapist-edit", {
        state: { state: true, therapist: error, stateTherapists: true },
      });
  }, [navTherapistSelectedEdit, navigate]);

  return (
    <>
      <Title text="Buscar terapeuta" />

      <P pId="p-help" pText="Buscar terapeuta a editar por id" />
      <form
        className="form-register"
        id="form-therapists"
        onSubmit={(e) =>
          onSubmit(
            e,
            setError,
            setNavTherapistEdit,
            setNavTherapistSelectedEdit
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

export { TherapistsSearch };
