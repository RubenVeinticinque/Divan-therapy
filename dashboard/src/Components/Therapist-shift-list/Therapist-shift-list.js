import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Title from "../Partials/Body-title";
import ArticleAdmin from "../Partials/Article-admin";
import P from "../Partials/P";

function TherapistShiftList({ isLogged, state }) {
  const [status] = useState(state ? state.state : false);
  const [shiftLists] = useState(state ? state.shiftLists : "");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) return navigate("/login");
  }, [isLogged, navigate]);

  useEffect(() => {
    if (!status) return navigate("/");
  }, [status, navigate]);

  return (
    <>
      <Title text="Lista de Turnos" />
      {shiftLists.length > 0 ? (
        <>
          {shiftLists.map((shiftList) => {
            return (
              <section
                id="section-all-therapists"
                className="w-100"
                key={shiftList.id}
              >
                <ArticleAdmin h5Text="Date" pText={shiftList.date} />
                <ArticleAdmin h5Text="Time" pText={shiftList.time} />
                <ArticleAdmin h5Text="Modality" pText={shiftList.modality} />
                <ArticleAdmin h5Text="U email" pText={shiftList.userEmail} />
                <ArticleAdmin h5Text="Username" pText={shiftList.username} />
                <ArticleAdmin
                  h5Text="U lastname"
                  pText={shiftList.userLastname}
                />
              </section>
            );
          })}
          <div className="container-btn-admin w-100">
            <Link
              to="/therapist-shifts"
              state={{ state: true }}
              exact="true"
              className="btn-back btn-admin bg-color-orange color-white"
            >
              Volver
            </Link>
          </div>
        </>
      ) : (
        <>
          <P pId="p-help" pText="No se encuentra en nuestra base de datos" />
          <Link
            to="/therapist-shifts"
            state={{ state: true }}
            exact="true"
            className="btn-back bg-color-orange color-white"
          >
            Volver
          </Link>
        </>
      )}
    </>
  );
}

export { TherapistShiftList };
