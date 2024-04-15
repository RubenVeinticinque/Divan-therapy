import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Title from "../Partials/Body-title";
import ArticleAdmin from "../Partials/Article-admin";
import ButtonPages from "../Partials/Button-page";
import { helperAllShifts } from "../../assets/helpers/helper-admin/helper-all-shifts";
import "../../assets/css/all-therapists.css";

function AllShifts({ isLogged, allTurns }) {
  const [turns, setTurns] = useState(allTurns ? allTurns.turns : false);
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
    if (!turns) navigate("/admin");
  }, [turns, navigate]);

  return (
    <>
      <Title text="Turnos" />

      {turns &&
        turns.ma.map((turn) => {
          return (
            <section
              id="section-all-therapists"
              className="w-100"
              key={turn.id}
            >
              <ArticleAdmin h5Text="Id" pText={turn.id} />
              <ArticleAdmin h5Text="Date" pText={turn.date} />
              <ArticleAdmin h5Text="Time" pText={turn.time} />
              <ArticleAdmin h5Text="Modality" pText={turn.modality} />
              <ArticleAdmin h5Text="U email" pText={turn.userEmail} />
              <ArticleAdmin h5Text="T email" pText={turn.therapistEmail} />
            </section>
          );
        })}
      <ButtonPages
        disabledPrev={!turns.prevPage}
        disabledNext={!turns.nextPage}
        onclickPrev={() => {
          setPages({ page: pages.page - 1 });
          helperAllShifts(setTurns, pages.page - 1);
        }}
        onClickNext={() => {
          setPages({ page: pages.page + 1 });
          helperAllShifts(setTurns, pages.page + 1);
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
export { AllShifts };
