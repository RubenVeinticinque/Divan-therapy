import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Title from "../Partials/Body-title";
import ArticleAdmin from "../Partials/Article-admin";
import ButtonPages from "../Partials/Button-page";
import { helperAllMoods } from "../../assets/helpers/helper-admin/helper-all-moods";
import "../../assets/css/all-therapists.css";

function AllMoods({ isLogged, allMoods }) {
  const [moods, setMoods] = useState(allMoods ? allMoods.moods : false);
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
    if (!moods) navigate("/admin");
  }, [moods, navigate]);

  return (
    <>
      <Title text="Estados de ánimo" />

      {moods &&
        moods.moods.map((mood) => {
          return (
            <section
              id="section-all-therapists"
              className="w-100"
              key={mood.id}
            >
              <ArticleAdmin h5Text="Id" pText={mood.id} />
              <ArticleAdmin h5Text="Date" pText={mood.date} />
              <ArticleAdmin h5Text="Time" pText={mood.time} />
              <ArticleAdmin h5Text="Moods" pText={mood.mood} />
              <ArticleAdmin h5Text="U email" pText={mood.userEmail} />
            </section>
          );
        })}
      <ButtonPages
        disabledPrev={!moods.prevPage}
        disabledNext={!moods.nextPage}
        onclickPrev={() => {
          setPages({ page: pages.page - 1 });
          helperAllMoods(setMoods, pages.page - 1);
        }}
        onClickNext={() => {
          setPages({ page: pages.page + 1 });
          helperAllMoods(setMoods, pages.page + 1);
        }}
        numPage={pages.page}
      />
      <div className="container-btn-admin w-100">
        <Link
          to="/admin"
          exact="true"
          className="btn-back btn-admin bg-color-orange color-white"
        >
          Volver
        </Link>
      </div>
    </>
  );
}

export { AllMoods };
