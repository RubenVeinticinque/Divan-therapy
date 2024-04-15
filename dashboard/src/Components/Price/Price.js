import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import P from "../Partials/P";
import Img from "../Partials/Img";
import { price } from "../../assets/helpers/helper-content-routes";
import imgFaceToFace from "../../assets/img/face-to-face.jpg";
import imgOnline from "../../assets/img/online.jpg";
import Title from "../Partials/Body-title";
import "../../assets/css/price.css";

function Price({ isLogged, title }) {
  const [prices, setPrices] = useState([]);
  const [titleHome] = useState(title);
  const navigate = useNavigate();

  useEffect(() => {
    price(setPrices);
  }, []);

  useEffect(() => {
    if (!isLogged) return navigate("/");
  }, [isLogged, navigate]);

  return (
    <>
      {titleHome ? "" : <Title text={"Nuestros precios"} />}
      <section className="section-option-therapists bg-color-green-dark bg-color-white margin-botton-3">
        <div className="therapy-option img-register">
          <P
            pId="p-choice-of-terapy"
            pText="Elige la terapia que más te guste"
          />

          <div className="main-guia-price">
            <Link
              to="/therapists"
              exact="true"
              className="btn-online
                  bg-color-orange
                  color-white"
            >
              En linea
            </Link>
            <Link
              to="/therapists"
              exact="true"
              className="btn-face-to-face
                  bg-color-light-green color-white"
            >
              Presencial
            </Link>
          </div>
          <br />

          <div className="main-guia-price" id="session-price">
            <P pClassName="fs-6" pText={"ARS " + prices.price} />
            <P pClassName="fs-6" pText={"ARS " + prices.price} />
          </div>

          <P
            pClassName="main-modality"
            pText="Cambie el modo de sesión cuando desee."
          />

          <picture className="main-guia mod-f-and-o">
            <Img
              className="modality-o"
              src={imgOnline}
              alt="img online modality"
            />
            <Img
              className="modality-ftf"
              src={imgFaceToFace}
              alt="img face to face modality"
            />
          </picture>
        </div>
      </section>
    </>
  );
}
export default Price;
