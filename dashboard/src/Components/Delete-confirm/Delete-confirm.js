import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Title from "../Partials/Body-title";
import ArticleP from "../Partials/Article-p";
import Button from "../Partials/Button";
import {
  helperDeleteConfirm,
  onSubmit,
} from "../../assets/helpers/helper-delete-confirm";
import "../../assets/css/home.css";

function DeleteConfirm({ isLogged, logout }) {
  const lSPendingTurn = JSON.parse(localStorage.getItem("pending-turn"));
  const [pendingTurn, setPendingTurn] = useState(lSPendingTurn);
  const navigate = useNavigate();

  useEffect(() => {
    helperDeleteConfirm(isLogged);
  }, []);

  useEffect(() => {
    if (!isLogged) navigate("/login");
  }, [isLogged, navigate]);

  useEffect(() => {
    if (pendingTurn === "Delete user") {
      localStorage.clear();
      logout("");
      navigate("/register");
    }
  }, [pendingTurn, navigate]);

  return (
    <>
      <Title text="Borrar usuario" />

      {pendingTurn ? (
        <>
          <ArticleP
            articleClassName="main-description"
            articleId="main-delete-confirm"
            pClassName="p-help"
            pText="No es posible borrar el registro. Tienes turnos pendientes"
          />

          <Link
            to="/profile"
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
            pText="¿Estás seguro que quieres borrar el registro de usuario? Se
              borrará todos los datos. Si tienes turnos pendientes pagos no
              podras borrar el regitro hasta completar los turnos"
          />
          <form
            encType="multipart/form-data"
            className="form-register"
            onSubmit={(e) => onSubmit(e, isLogged, setPendingTurn)}
          >
            <Button type="submit" className="btn-register" btnText="Borrar" />
          </form>
          <Link
            to="/profile"
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
export { DeleteConfirm };
