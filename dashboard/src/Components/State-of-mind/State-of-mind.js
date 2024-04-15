import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import imgStateOfMind from "../../assets/img/animo.jpg";
import Title from "../Partials/Body-title";
import Img from "../Partials/Img";
import P from "../Partials/P";
import Input from "../Partials/Input";
import Label from "../Partials/Label";
import Span from "../Partials/Span";
import Button from "../Partials/Button";
import { onSubmit } from "../../assets/helpers/helper-state-of-mind";
import "../../assets/css/state-of-mind.css";

function StateOfMind({ isLogged, vc }) {
  const [stateOfMind, setStateOfMind] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) navigate("/login");
    vc(true);
  }, [isLogged, navigate]);

  useEffect(() => {
    if (stateOfMind) navigate("/region", { state: true });
  }, [stateOfMind, navigate]);

  return (
    <>
      <Title text={"¿Cuál es tu ánimo?"} />

      <picture className="pic-img-animo">
        <Img id="img-animo" src={imgStateOfMind} alt="img-ánimo" />
      </picture>

      <P pClassName="p-feel" pText="Cuéntanos cómo te sientes" />

      <div
        id="carouselExampleIndicators"
        className="carousel carousel-dark slide"
        data-bs-ride="true"
      >
        <div className="carousel-inner carousel-animo">
          <form
            id="form-region"
            className="w-100"
            onSubmit={(e) => onSubmit(e, isLogged, setStateOfMind)}
          >
            <div className="carousel-item active">
              <Input
                className="input-check"
                alt="btn-Joy"
                type="checkbox"
                name="check_state_of_mind-joy"
                id="check-state-of-mind-Joy"
                value="Alegria"
              />
              <Label
                htmlFor="check-state-of-mind-Joy"
                className="check carousel-animo bg-color-yellow check-state-of-mind-joy carousel-label"
                labelText={
                  <React.Fragment>
                    <Span id="span-select" text="✔" />
                    Alegría
                  </React.Fragment>
                }
              />
            </div>

            <div className="carousel-item">
              <Input
                className="input-check"
                alt="btn-sadness"
                type="checkbox"
                name="check_state_of_mind-sadness"
                id="check-state-of-mind-sadness"
                value="Tristeza"
              />
              <Label
                htmlFor="check-state-of-mind-sadness"
                className="check carousel-animo bg-color-blue check-state-of-mind-sadness carousel-label"
                labelText={
                  <React.Fragment>
                    <Span id="span-select" text="✔" />
                    Tristeza
                  </React.Fragment>
                }
              />
            </div>

            <div className="carousel-item">
              <Input
                className="input-check"
                alt="btn-anger"
                type="checkbox"
                name="check_state_of_mind-anger"
                id="check-state-of-mind-anger"
                value="Enojo"
              />
              <Label
                htmlFor="check-state-of-mind-anger"
                className="check carousel-animo bg-color-board carousel-label"
                labelText={
                  <React.Fragment>
                    <Span id="span-select" text="✔" />
                    Enojo
                  </React.Fragment>
                }
              />
            </div>

            <div className="carousel-item">
              <Input
                className="input-check"
                alt="btn-disgust"
                type="checkbox"
                name="check_state_of_mind-disgust"
                id="check-state-of-mind-disgust"
                value="Asco"
              />
              <Label
                htmlFor="check-state-of-mind-disgust"
                className="check carousel-animo bg-color-greenish carousel-label"
                labelText={
                  <React.Fragment>
                    <Span id="span-select" text="✔" />
                    Asco
                  </React.Fragment>
                }
              />
            </div>

            <div className="carousel-item">
              <Input
                className="input-check"
                alt="btn-Fear"
                type="checkbox"
                name="check_state_of_mind-fear"
                id="check-state-of-mind-fear"
                value="Miedo"
              />
              <Label
                htmlFor="check-state-of-mind-fear"
                className="check carousel-animo bg-color-purple carousel-label"
                labelText={
                  <React.Fragment>
                    <Span id="span-select" text="✔" />
                    Miedo
                  </React.Fragment>
                }
              />
            </div>
          </form>
        </div>

        <Button
          type="button"
          dataBsTarget="#carouselExampleIndicators"
          dataBsSlide="prev"
          className="carousel-control-prev"
          btnText={
            <React.Fragment>
              <Span className="carousel-control-prev-icon" ariaHidden="true" />
              <Span className="visually-hidden" text="Anterior" />
            </React.Fragment>
          }
        />

        <Button
          type="button"
          dataBsTarget="#carouselExampleIndicators"
          dataBsSlide="next"
          className="carousel-control-next"
          btnText={
            <React.Fragment>
              <Span className="carousel-control-next-icon" ariaHidden="true" />
              <Span className="visually-hidden" text="Próximo" />
            </React.Fragment>
          }
        />
      </div>

      <Button
        type="submit"
        className="btn-register btn-ask-for-help"
        form="form-region"
        btnText="Pedir ayuda"
      />
    </>
  );
}

export default StateOfMind;
