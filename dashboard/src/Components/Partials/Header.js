import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";
import Img from "./Img";
import burger from "../../assets/img/icons/burger.svg";
import xmark from "../../assets/img/icons/xmark-solid.svg";
import logoUpdate from "../../assets/img/icons/logo-update.gif";
import {
  handleClick,
  handleXmark,
  buttonLogin,
  userDisconnect,
} from "../../assets/helpers/helper-header";

function Header({ userLogged, logout }) {
  const [isLogged, setIsLogged] = useState("");

  useEffect(() => {
    setIsLogged(userLogged);
  }, [userLogged]);

  return (
    <header className="header" id="header">
      <picture id="burger-xmark">
        <Link to="#" onClick={() => handleClick()}>
          <Img id="burger" className="burger" src={burger} alt="img burger" />
        </Link>
        <Link to="#" onClick={() => handleXmark()}>
          <Img
            id="xmark"
            className="burger-xmark"
            src={xmark}
            alt="img burger xmark"
          />
        </Link>
      </picture>

      <picture id="logo">
        <Link to="/" exact="true">
          <Img id="img-logo-header" src={logoUpdate} alt="img logo" />
        </Link>
      </picture>
      <nav className="header-nav" id="nav">
        <ul>
          <Link to="/" exact="true" onClick={handleXmark}>
            <li>Home</li>
          </Link>

          <Link to="/divan-therapy" exact="true" onClick={handleXmark}>
            <li>Diván therapy</li>
          </Link>

          <Link to="/therapists" exact="true" onClick={handleXmark}>
            <li>Psicólogos</li>
          </Link>

          <Link to="/price" exact="true" onClick={handleXmark}>
            <li>Precios</li>
          </Link>

          <Link to="/donation" exact="true" onClick={handleXmark}>
            <li>Donación</li>
          </Link>

          <Link to="/emergency" exact="true" onClick={handleXmark}>
            <li>Urgencias</li>
          </Link>

          <Link to="/contact" exact="true" onClick={handleXmark}>
            <li>Contacto</li>
          </Link>
        </ul>
      </nav>
      <div id="container-login">
        <Link
          to="/login"
          exact="true"
          className="btn-login"
          id="btn-login"
          onMouseEnter={buttonLogin}
        >
          {isLogged ? isLogged.name : "Log in"}
        </Link>
        {isLogged && isLogged.name ? (
          <ul className="ul-login display-none" id="ul-login">
            <Link
              to={isLogged ? "/profile" : "/login"}
              exact="true"
              className="color-soft-green a-login"
            >
              <li>Perfil</li>
            </Link>
            <Link
              to="/logout"
              exact="true"
              className="color-soft-green a-login"
              onClick={() => {
                localStorage.clear();
                setIsLogged("");
                logout("");
                userDisconnect(io, isLogged);
              }}
            >
              <li>Logout</li>
            </Link>
          </ul>
        ) : (
          ""
        )}
      </div>
    </header>
  );
}

export default Header;
