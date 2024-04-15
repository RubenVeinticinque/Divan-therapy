import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Title from "../Partials/Body-title";
import ArticleAdmin from "../Partials/Article-admin";
import "../../assets/css/all-therapists.css";

function AllPrices({ isLogged, allPrices }) {
  const [prices] = useState(allPrices ? allPrices.prices : false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) navigate("/login");
  }, [isLogged, navigate]);

  useEffect(() => {
    if (!prices) navigate("/admin");
  }, [prices, navigate]);

  return (
    <>
      <Title text="Honorarios de terapeutas" />
      {prices &&
        prices.map((price) => {
          return (
            <section
              id="section-all-therapists"
              className="w-100"
              key={price.id}
            >
              <ArticleAdmin h5Text="Id" pText={price.id} />
              <ArticleAdmin h5Text="Price" pText={price.price} />
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
          to="/price-search"
          state={{ state: true }}
          exact="true"
          className="btn-back btn-admin bg-color-light-green color-white"
          id="btn-back"
        >
          Editar Registro
        </Link>
      </div>
    </>
  );
}

export { AllPrices };
