import ContentRoutes from "../Content-routes/Content-routes";
import { turn } from "../../assets/helpers/helper-container";

function Container({ isLogged, userLogged, vc, logout }) {
  turn(userLogged);

  return (
    <section id="main" className="main">
      <ContentRoutes
        isLogged={isLogged}
        userLogged={userLogged}
        vc={vc}
        logout={logout}
      />
    </section>
  );
}

export default Container;
