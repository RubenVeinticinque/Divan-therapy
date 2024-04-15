import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Title from "../Partials/Body-title";
import P from "../Partials/P";
import TextDanger from "../Partials/Text-danger";
import FormSearchAdmin from "../Partials/Form-search-admin";
import { onSubmit } from "../../assets/helpers/helper-admin/helper-user-search";
import "../../assets/css/profile.css";

function UserSearch({ isLogged, state }) {
  const [status] = useState(state ? state.state : false);
  const [error, setError] = useState("");
  const [navUserEdit, setNavUserEdit] = useState(false);
  const [navUserSelectedEdit, setNavUserSelectedEdit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) navigate("/login");
  }, [isLogged, navigate]);

  useEffect(() => {
    if (!status) navigate("/admin");
  }, [status, navigate]);

  useEffect(() => {
    if (navUserEdit)
      return navigate("/user-edit", {
        state: { state: false, user: error, stateUsers: true },
      });
  }, [navUserEdit, error, navigate]);

  useEffect(() => {
    if (navUserSelectedEdit)
      return navigate("/user-edit", {
        state: { state: true, user: error, stateUsers: true },
      });
  }, [navUserSelectedEdit, error, navigate]);

  return (
    <>
      <Title text="Buscar usuario" />

      <P pId="p-help" pText="Buscar usuario a editar por id" />
      <form
        className="form-register"
        id="form-therapists"
        onSubmit={(e) =>
          onSubmit(e, setError, setNavUserEdit, setNavUserSelectedEdit)
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

export { UserSearch };
