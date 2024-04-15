import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Title from "../Partials/Body-title";
import Img from "../Partials/Img";
import Span from "../Partials/Span";
import { helperProfile } from "../../assets/helpers/helper-profile";
import "../../assets/css/profile.css";

function Profile({ isLogged }) {
  const [userLogged, setUserLogged] = useState(isLogged);
  const [admin, setAdmin] = useState(false);
  const [isTherapist, setIsTherapist] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    helperProfile(isLogged, setAdmin, setIsTherapist, setUserLogged);
  }, []);

  useEffect(() => {
    if (!isLogged) return navigate("/login");
  }, [isLogged, navigate]);

  return (
    <>
      <Title text="Mi perfil" />

      <picture className="pic-img-login">
        <Img
          className="img-login"
          src={userLogged && userLogged.avatar}
          alt="img-login"
        />
      </picture>

      <Span
        className="profile-data color-soft-green"
        text={userLogged && userLogged.name + " " + userLogged.lastname}
      />
      <Span
        className="profile-data color-soft-green"
        text={userLogged && userLogged.userEmail}
      />
      <Link
        to={`/detail-profile/${userLogged && userLogged.id}`}
        exact="true"
        className="btn-register"
        id="a-edit"
      >
        Editar perfil
      </Link>
      {admin ? (
        <div className="container-a-admin">
          <Link
            to="/admin"
            exact="true"
            className="btn-register"
            id="a-edit-profile"
          >
            Admin
          </Link>
        </div>
      ) : isTherapist ? (
        <div className="container-a-admin">
          <Link
            to="/therapist-shifts"
            exact="true"
            state={true}
            className="btn-register"
            id="a-edit-profile"
          >
            Buscar turnos
          </Link>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
export { Profile };
