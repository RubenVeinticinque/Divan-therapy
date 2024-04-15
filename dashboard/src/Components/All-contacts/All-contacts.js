import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Title from "../Partials/Body-title";
import ArticleAdmin from "../Partials/Article-admin";
import ButtonPages from "../Partials/Button-page";
import { helperAllContacts } from "../../assets/helpers/helper-admin/helper-all-contacts";
import "../../assets/css/all-therapists.css";

function AllContacts({ isLogged, allContacts }) {
  const [contacts, setContacts] = useState(
    allContacts ? allContacts.contacts : false
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
    if (!contacts) navigate("/admin");
  }, [contacts, navigate]);

  return (
    <>
      <Title text="Contactos" />
      {contacts &&
        contacts.contacts.map((contact) => {
          return (
            <section
              id="section-all-therapists"
              className="w-100"
              key={contact.id}
            >
              <ArticleAdmin h5Text="Id" pText={contact.id} />
              <ArticleAdmin h5Text="Name" pText={contact.name} />
              <ArticleAdmin h5Text="Lastname" pText={contact.lastname} />
              <ArticleAdmin h5Text="Email" pText={contact.email} />
              <ArticleAdmin h5Text="Description" pText={contact.description} />
            </section>
          );
        })}
      <ButtonPages
        disabledPrev={!contacts.prevPage}
        disabledNext={!contacts.nextPage}
        onclickPrev={() => {
          setPages({ page: pages.page - 1 });
          helperAllContacts(setContacts, pages.page - 1);
        }}
        onClickNext={() => {
          setPages({ page: pages.page + 1 });
          helperAllContacts(setContacts, pages.page + 1);
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

export { AllContacts };
