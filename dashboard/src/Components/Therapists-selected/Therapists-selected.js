import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Title from "../Partials/Body-title";
import P from "../Partials/P";
import Img from "../Partials/Img";
import Label from "../Partials/Label";
import Input from "../Partials/Input";
import Button from "../Partials/Button";
import { onSubmit } from "../../assets/helpers/helper-therapists-selected";
import "../../assets/css/therapists.css";

function TherapistsSelected({ isLogged, therapists, state }) {
  const locStorageTherapistSelected =
    localStorage.getItem("therapist-selected");
  const therapistSelected = JSON.parse(locStorageTherapistSelected);

  const [status] = useState(state ? state.state : false);
  const [therapistsSelected] = useState(therapists);
  const [formOnSubmit, setFormOnSubmit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) return navigate("/login");
  }, [isLogged, navigate]);

  useEffect(() => {
    if (!status) return navigate("/login");
  }, [status, navigate]);

  useEffect(() => {
    if (formOnSubmit)
      return navigate("/session-mode", { state: therapistSelected[0] });
  }, [formOnSubmit, therapistSelected, navigate]);

  return (
    <>
      <Title text={"Terapeutas seleccionados"} />

      <P
        pId="p-therapists"
        pText="Listado de terapeutas según la región que elegiste"
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

      {therapistSelected && !therapistsSelected.length > 0 ? (
        <>
          <P pId="p-therapist-not-found" pText="Terapeutas no encontrado" />
          <Link
            to="/region"
            exact="true"
            state={true}
            className="btn-register bg-color-light-green color-white"
            id="a-edit-profile"
          >
            Volver
          </Link>
        </>
      ) : (
        <>
          {therapistsSelected &&
            therapistsSelected.map((therapist) => {
              return (
                <form
                  className="form-therapists"
                  key={therapist.id}
                  onSubmit={(e) => onSubmit(e, setFormOnSubmit)}
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
                          <div className="therapist-card-text">
                            <Label
                              className="label-therapist color-dark-green"
                              htmlFor="name"
                              id="label-name"
                              labelText={
                                therapist.name + " " + therapist.lastname
                              }
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
                              placeholder="type therapist"
                              defaultValue={therapist.type_therapist}
                            />

                            <Label
                              className="label-therapist color-light-green"
                              htmlFor="therapist"
                              id="label-speciality"
                              labelText={therapist.speciality}
                            />
                            <Input
                              type="text"
                              className="display-none"
                              name="speciality"
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
      )}
    </>
  );
}

export default TherapistsSelected;
