import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Title from "../Partials/Body-title";
import ArticleAdmin from "../Partials/Article-admin";
import ArticleH5Img from "../Partials/ArticleH5Img";
import Img from "../Partials/Img";
import ButtonPages from "../Partials/Button-page";
import { helperAllUsers } from "../../assets/helpers/helper-admin/helper-all-users";
import "../../assets/css/all-therapists.css";

function AllUsers({ isLogged, allUsers }) {
  const [users, setUsers] = useState(allUsers ? allUsers.users : false);
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
    if (!users) navigate("/admin");
  }, [users, navigate]);

  return (
    <>
      <Title text="Usuarios" />

      {users &&
        users.users.map((user) => {
          return (
            <section
              id="section-all-therapists"
              className="w-100"
              key={user.id}
            >
              <ArticleAdmin h5Text="Id" pText={user.id} />
              <ArticleAdmin h5Text="Name" pText={user.name} />
              <ArticleAdmin h5Text="Lastname" pText={user.lastname} />
              <ArticleAdmin h5Text="U email" pText={user.email} />

              <ArticleH5Img
                articleClassName="all-therapists-article"
                h5ClassName="all-therapists-title color-dark-green"
                h5Text="Avatar"
                content={
                  <Img
                    className="img-all-therapists"
                    src={user.avatar}
                    alt="img all users"
                  />
                }
              />
              <ArticleAdmin h5Text="Category" pText={user.id_user_category} />
            </section>
          );
        })}
      <ButtonPages
        disabledPrev={!users.prevPage}
        disabledNext={!users.nextPage}
        onclickPrev={() => {
          setPages({ page: pages.page - 1 });
          helperAllUsers(setUsers, pages.page - 1);
        }}
        onClickNext={() => {
          setPages({ page: pages.page + 1 });
          helperAllUsers(setUsers, pages.page + 1);
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
        <Link
          to="/user-search"
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

export { AllUsers };
