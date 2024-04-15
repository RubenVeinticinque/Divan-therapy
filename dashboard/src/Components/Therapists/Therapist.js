import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { therapist } from "../../assets/helpers/helper-content-routes";
import { onSubmit } from "../../assets/helpers/helper-therapist";
import Title from "../Partials/Body-title";
import P from "../Partials/P";
import Img from "../Partials/Img";
import Label from "../Partials/Label";
import Input from "../Partials/Input";
import Button from "../Partials/Button";
import "../../assets/css/therapists.css";

function Therapists({ isLogged }) {
  const [therapists, setTherapists] = useState([]);
  const [therapistSelected, setTherapistSelected] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    therapist(setTherapists);
  }, []);

  useEffect(() => {
    if (!isLogged) return navigate("/");
    localStorage.removeItem("create-med-appointment");
  }, [isLogged, navigate]);

  useEffect(() => {
    if (therapistSelected)
      return navigate("/session-mode", { state: therapistSelected });
  }, [therapistSelected, navigate]);

  return (
    <>
      <Title text={"Elige tu terapeuta"} />

      <P
        pId="p-therapists"
        pText="Presentamos a los siguientes terapeutas para usted"
      />

      <P
        pId="p-therapists"
        pText={
          <React.Fragment>
            Si eres un profesional de salud mental y quieres ser parte de diván
            therapy has click{" "}
            <Link to="/form-therapists" exact="true">
              aqui
            </Link>
          </React.Fragment>
        }
      />

      {therapists.map((therapist, index) => {
        return (
          <form
            className="form-therapists"
            key={index}
            onSubmit={(data) => onSubmit(data, setTherapistSelected)}
          >
            <div>
              <Button
                type="submit"
                className="btn-card"
                btnText={
                  <>
                    <Img
                      className="img-profile"
                      src={therapist.avatar}
                      alt="img card profile"
                    />

                    <Input
                      type="text"
                      className="display-none"
                      name="avatar"
                      title="avatar"
                      defaultValue={therapist.avatar}
                    />

                    <div className="therapist-card-text">
                      <Label
                        className="label-therapist color-dark-green"
                        htmlFor="name"
                        id="label-name"
                        labelText={therapist.name + " " + therapist.lastname}
                      />

                      <Input
                        type="text"
                        className="display-none"
                        name="name"
                        title="name"
                        placeholder="name"
                        defaultValue={therapist.name}
                      />
                      <Input
                        type="text"
                        className="display-none"
                        name="lastname"
                        title="lastname"
                        placeholder="lastname"
                        defaultValue={therapist.lastname}
                      />
                      <Label
                        className="display-none"
                        htmlFor="email"
                        id="label-email"
                      />
                      <Input
                        type="text"
                        className="display-none"
                        name="email"
                        defaultValue={therapist.email}
                      />
                      <Label
                        className="label-therapist color-soft-green"
                        htmlFor="therapist"
                        id="label-therapist"
                        labelText={therapist.type_therapist}
                      />
                      <Input
                        type="text"
                        className="display-none"
                        name="therapist"
                        title="type_therapist"
                        placeholder="type therapists"
                        defaultValue={therapist.type_therapist}
                      />

                      <Label
                        className="label-therapist color-light-green"
                        htmlFor="speciality"
                        id="label-speciality"
                        labelText={therapist.speciality}
                      />
                      <Input
                        type="text"
                        className="display-none"
                        name="specility"
                        title="speciality"
                        placeholder="speciality"
                        defaultValue={therapist.speciality}
                      />

                      <Label
                        className="label-therapist color-light-green"
                        htmlFor="session"
                        id="label-sessions"
                        labelText={therapist.total_sessions + " sessions"}
                      />
                      <Input
                        type="text"
                        className="display-none"
                        name="session"
                        title="session"
                        placeholder="session"
                        defaultValue={therapist.total_sessions}
                      />
                    </div>
                  </>
                }
              />
            </div>
          </form>
        );
      })}
    </>
  );
}

export default Therapists;
