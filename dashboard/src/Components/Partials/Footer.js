import { Link } from "react-router-dom";
import logoFooter from "../../assets/img/icons/logo-update-white.gif";

function Footer() {
  return (
    <footer className="footer" id="footer">
      <div id="footer-container-menu">
        <Link to="/" exact="true">
          <img id="img-logo-footer" src={logoFooter} alt="img logo" />
        </Link>
        <div className="logo-and-ul">
          <ul>
            <div className="container-menu-a">
              <Link to="/" exact="true" className="a-footer">
                <li>Home</li>
              </Link>
              <Link to="/emergency" exact="true" className="a-footer">
                <li>Urgencias</li>
              </Link>
              <Link to="/therapists" exact="true" className="a-footer">
                <li>Psicólogos</li>
              </Link>
            </div>
            <div className="container-menu-a">
              <Link to="/price" exact="true" className="a-footer">
                <li>Precios</li>
              </Link>
              <Link to="/donation" exact="true" className="a-footer">
                <li>Donación</li>
              </Link>
              <Link to="/contact" exact="true" className="a-footer">
                <li>Contacto</li>
              </Link>
            </div>
          </ul>
        </div>
      </div>
      <p className="text-center color-white" id="p-footer">
        ©Copyright 2023 proyecto de Diván therapy ... Hecho en Buenos Aires,
        Argentina.
      </p>
    </footer>
  );
}

export default Footer;
