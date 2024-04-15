import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Title from "../Partials/Body-title";
import ArticleAdmin from "../Partials/Article-admin";
import ButtonPages from "../Partials/Button-page";
import { helperAllDonations } from "../../assets/helpers/helper-admin/helper-all-donations";
import "../../assets/css/all-therapists.css";

function AllDonations({ isLogged, allDonations }) {
  const [donations, setDonations] = useState(
    allDonations ? allDonations.donations : false
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
    if (!donations) navigate("/admin");
  }, [donations, navigate]);

  return (
    <>
      <Title text="Donaciones" />
      {donations &&
        donations.donations.map((donation) => {
          return (
            <section
              id="section-all-therapists"
              className="w-100"
              key={donation.id}
            >
              <ArticleAdmin h5Text="Id" pText={donation.id} />
              <ArticleAdmin h5Text="Date" pText={donation.date} />
              <ArticleAdmin h5Text="Time" pText={donation.time} />
              <ArticleAdmin h5Text="U email" pText={donation.userEmail} />
              <ArticleAdmin h5Text="Donation" pText={donation.donation} />
            </section>
          );
        })}
      <ButtonPages
        disabledPrev={!donations.prevPage}
        disabledNext={!donations.nextPage}
        onclickPrev={() => {
          setPages({ page: pages.page - 1 });
          helperAllDonations(setDonations, pages.page - 1);
        }}
        onClickNext={() => {
          setPages({ page: pages.page + 1 });
          helperAllDonations(setDonations, pages.page + 1);
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

export { AllDonations };
