import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Title from "../Partials/Body-title";
import ArticleAdmin from "../Partials/Article-admin";
import "../../assets/css/all-therapists.css";

function AllSessionsHours({ isLogged, allSessionsHours }) {
  const [sessionHours] = useState(
    allSessionsHours ? allSessionsHours.sessionHours : false
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) navigate("/login");
  }, [isLogged, navigate]);

  useEffect(() => {
    if (!sessionHours) navigate("/admin");
  }, [sessionHours, navigate]);

  return (
    <>
      <Title text="Horas de sesión" />

      {sessionHours &&
        sessionHours.map((sessionHour) => {
          return (
            <section
              id="section-all-therapists"
              className="w-100"
              key={sessionHour.id}
            >
              <ArticleAdmin h5Text="Id" pText={sessionHour.id} />
              <ArticleAdmin
                h5Text="Session hours"
                pText={sessionHour.session_hours}
              />
            </section>
          );
        })}
      <div className="container-btn-admin w-100">
        <Link
          to="/admin"
          exact="true"
          className="btn-back btn-admin bg-color-orange color-white"
        >
          Volver
        </Link>
        <Link
          to="/sessions-hours-search"
          exact="true"
          state={{ state: true }}
          className="btn-back btn-admin bg-color-light-green color-white"
          id="btn-back"
        >
          Editar Registro
        </Link>
      </div>
    </>
  );
}

export { AllSessionsHours };
