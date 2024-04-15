import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Title from "../Partials/Body-title";
import P from "../Partials/P";
import Label from "../Partials/Label";
import TextDanger from "../Partials/Text-danger";
import Input from "../Partials/Input";
import Button from "../Partials/Button";
import {
  handlePrice,
  onSubmit,
} from "../../assets/helpers/helper-admin/helper-price-edit";
import "../../assets/css/register.css";

function PriceEdit({ isLogged, state }) {
  const [statePrice] = useState(state ? state.statePrice : false);
  const [notFound] = useState(state ? state.state : false);
  const [price, setPrice] = useState(state ? state.price.price : false);
  const [navPriceEdit, setNavPriceEdit] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) navigate("/login");
  }, [isLogged, navigate]);

  useEffect(() => {
    if (!statePrice) navigate("/admin");
  }, [statePrice, navigate]);

  useEffect(() => {
    if (navPriceEdit) navigate("/admin");
  }, [navPriceEdit, navigate]);

  return (
    <>
      <Title text="Editar honorario" />

      {notFound ? (
        <>
          <P pId="p-help" pText="Formulario para editar honorarios" />
          <form
            className="form-register"
            onSubmit={(e) => onSubmit(e, setError, setNavPriceEdit)}
          >
            <Label
              className="color-dark-green"
              htmlFor="price"
              labelText="Ingresa el honorario"
            />

            <TextDanger text={error.price && error.price.msg} />
            <Input
              className="form-control inputs"
              type="text"
              name="price"
              id="price"
              placeholder="Enter your therapist fees"
              value={price}
              required={true}
              onChange={(e) => handlePrice(e, setPrice)}
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
            to="/price-search"
            state={{ state: true }}
            exatc="true"
            className="btn-back bg-color-orange color-white"
          >
            Volver
          </Link>
        </>
      )}
    </>
  );
}
export { PriceEdit };
