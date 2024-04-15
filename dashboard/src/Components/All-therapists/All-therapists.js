import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Title from "../Partials/Body-title";
import ArticleAdmin from "../Partials/Article-admin";
import ArticleH5Img from "../Partials/ArticleH5Img";
import Img from "../Partials/Img";
import ButtonPages from "../Partials/Button-page";
import { helperAllTherapists } from "../../assets/helpers/helper-admin/helper-all-therapists";
import "../../assets/css/all-therapists.css";

function AllTherapists({ isLogged, therapists }) {
  const [allTherapists, setAllTherapists] = useState(
    therapists ? therapists : false
  );
  const [pages, setPages] = useState({
    page: 0,
    prevPage: false,
    nextPage: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) navigate("/login");
  }, [isLogged, navigate]);

  useEffect(() => {
    if (!allTherapists) navigate("/admin");
  }, [allTherapists, navigate]);

  return (
    <>
      <Title text="Terapeutas" />

      {allTherapists &&
        allTherapists.therapists.therapists.map((therapist) => {
          return (
            <section
              id="section-all-therapists"
              className="w-100"
              key={therapist.id}
            >
              <ArticleAdmin h5Text="Id" pText={therapist.id} />
              <ArticleAdmin h5Text="Name" pText={therapist.name} />
              <ArticleAdmin h5Text="Lastname" pText={therapist.lastname} />
              <ArticleAdmin h5Text="Email" pText={therapist.email} />
              <ArticleAdmin h5Text="Birthdate" pText={therapist.birthdate} />

              <ArticleH5Img
                articleClassName="all-therapists-article"
                h5ClassName="all-therapists-title color-dark-green"
                h5Text="Avatar"
                content={
                  <Img
                    className="img-all-therapists"
                    src={therapist.avatar}
                    alt="img all therapists"
                  />
                }
              />
              <ArticleAdmin h5Text="Speciality" pText={therapist.speciality} />
              <ArticleAdmin
                h5Text="Type therapist"
                pText={therapist.type_therapist}
              />
              <ArticleAdmin
                h5Text="Total sessions"
                pText={therapist.total_sessions}
              />
              <ArticleAdmin h5Text="Phone" pText={therapist.phone} />
              <ArticleAdmin
                h5Text="Medical registration"
                pText={therapist.medical_registration}
              />
              <ArticleAdmin h5Text="Country" pText={therapist.id_country} />
              <ArticleAdmin h5Text="Province" pText={therapist.id_province} />
              <ArticleAdmin h5Text="City" pText={therapist.id_city} />
              <ArticleAdmin h5Text="Zone" pText={therapist.id_zone} />
              <ArticleAdmin h5Text="Address" pText={therapist.id_name_est} />
              <ArticleAdmin h5Text="Gender" pText={therapist.id_name_gender} />
              <ArticleAdmin h5Text="Price" pText={therapist.id_price} />
              <ArticleAdmin
                h5Text="Session hours"
                pText={therapist.id_session_hours}
              />
            </section>
          );
        })}
      <ButtonPages
        disabledPrev={!allTherapists.therapists.prevPage}
        disabledNext={!allTherapists.therapists.nextPage}
        onclickPrev={() => {
          setPages({ page: pages.page - 1 });
          helperAllTherapists(setAllTherapists, pages.page - 1);
        }}
        onClickNext={() => {
          setPages({ page: pages.page + 1 });
          helperAllTherapists(setAllTherapists, pages.page + 1);
        }}
        numPage={pages.page}
      />

      <div className="container-btn-admin w-100">
        <Link
          to="/admin"
          exact="true"
          className="btn-back bg-color-orange color-white"
        >
          Volver
        </Link>
        <Link
          to="/therapist-search"
          exact="true"
          state={{ state: true }}
          className="btn-back bg-color-light-green color-white"
          id="btn-back"
        >
          Editar Registro
        </Link>
      </div>
    </>
  );
}

export { AllTherapists };
