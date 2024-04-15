import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Title from "../Partials/Body-title";
import ArticleP from "../Partials/Article-p";
import Button from "../Partials/Button";
import { onSubmit } from "../../assets/helpers/helper-admin/helper-user-destroy";
import "../../assets/css/home.css";

function UserDestroy({ isLogged, state }) {
  const [pendingTurn, setPendingTurn] = useState(false);
  const [navAdmin, setNavAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) navigate("/login");
  }, [isLogged, navigate]);

  useEffect(() => {
    if (!state) navigate("/admin");
  }, [state, navigate]);

  useEffect(() => {
    if (navAdmin) navigate("/admin");
  }, [navAdmin, navigate]);

  return (
    <>
      <Title text="Confirmar borrado" />

      {pendingTurn ? (
        <>
          <ArticleP
            articleClassName="main-description"
            articleId="main-delete-confirm"
            pClassName="p-help"
            pText="No es posible borrar el registro. Tienes turnos pendientes"
          />
          <Link
            to="/admin"
            exact="true"
            className="btn-register"
            id="a-edit-profile"
          >
            Volver
          </Link>
        </>
      ) : (
        <>
          <ArticleP
            articleClassName="main-description"
            articleId="main-delete-confirm"
            pClassName="p-help"
            pText="¿Estás seguro que quieres borrar el registro del terapeuta ? Se
              borrará todos los datos. Si tienes turnos pendientes pagos no
              podras borrar el regitro hasta completar los turnos"
          />
          <form
            encType="multipart/form-data"
            className="form-register"
            onSubmit={(e) => onSubmit(e, state, setPendingTurn, setNavAdmin)}
          >
            <Button type="submit" className="btn-register" btnText="Borrar" />
          </form>
          <Link
            to="/admin"
            exact="true"
            className="btn-register"
            id="a-edit-profile"
          >
            Volver
          </Link>
        </>
      )}
    </>
  );
}
export { UserDestroy };
