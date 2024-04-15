import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Title from "../Partials/Body-title";
import P from "../Partials/P";
import TextDanger from "../Partials/Text-danger";
import FormSearchAdmin from "../Partials/Form-search-admin";
import { onSubmit } from "../../assets/helpers/helper-admin/helper-price-search";
import "../../assets/css/profile.css";

function PriceSearch({ isLogged, state }) {
  const [status] = useState(state ? state.state : false);
  const [error, setError] = useState("");
  const [navPriceEdit, setNavPriceEdit] = useState(false);
  const [navPriceSelectedEdit, setNavPriceSelectedEdit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) navigate("/login");
  }, [isLogged, navigate]);

  useEffect(() => {
    if (!status) navigate("/admin");
  }, [status, navigate]);

  useEffect(() => {
    if (navPriceEdit)
      return navigate("/price-edit", {
        state: { state: false, price: error, statePrice: true },
      });
  }, [navPriceEdit, navigate]);

  useEffect(() => {
    if (navPriceSelectedEdit)
      return navigate("/price-edit", {
        state: { state: true, price: error, statePrice: true },
      });
  }, [navPriceSelectedEdit, navigate]);

  return (
    <>
      <Title text="Buscar honorarios" />

      <P pId="p-help" pText="Buscar honorarios a editar por id" />
      <form
        className="form-register"
        id="form-therapists"
        onSubmit={(e) =>
          onSubmit(e, setError, setNavPriceEdit, setNavPriceSelectedEdit)
        }
      >
        <TextDanger text={error.search && error.search.msg} />
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
export { PriceSearch };
