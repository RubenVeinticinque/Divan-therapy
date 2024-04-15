import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../Partials/Body-title";
import {
  onSubmit,
  handleDate,
  handleModality,
} from "../../assets/helpers/helper-therapist-shifts";
import Label from "../Partials/Label";
import TextDanger from "../Partials/Text-danger";
import Input from "../Partials/Input";
import Select from "../Partials/Select";
import Option from "../Partials/Option";
import Button from "../Partials/Button";
import "../../assets/css/therapist-shifts.css";

function TherapistShifts({ isLogged, state }) {
  const [userLogged] = useState(isLogged ? isLogged : "");
  const [status] = useState(state ? state : false);
  const [date, setDate] = useState("");
  const [modality, setModality] = useState("");
  const [turns, setTurns] = useState(false);
  const [shiftList, setShiftList] = useState("");
  const [errors, setErrors] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) return navigate("/login");
  }, [isLogged, navigate]);

  useEffect(() => {
    if (!status) return navigate("/");
  }, [status, navigate]);

  useEffect(() => {
    if (turns)
      return navigate("/therapist-shift-list", {
        state: { state: true, shiftLists: shiftList },
      });
  }, [turns, navigate]);

  return (
    <>
      <Title text="Buscar turnos" />
      <form
        className="form-search-turns"
        onSubmit={(e) =>
          onSubmit(e, userLogged, setErrors, setTurns, setShiftList)
        }
      >
        <Label
          className="color-dark-green"
          htmlFor="date"
          labelText="Ingresa la fecha"
        />
        <TextDanger text={errors.date ? errors.date.msg : ""} />
        <Input
          className="form-control inputs"
          type="date"
          name="date"
          id="date"
          value={date}
          required={true}
          onChange={(e) => handleDate(e, setDate)}
        />

        <Label
          className="color-dark-green"
          htmlFor="modality"
          labelText="Ingresa la modalidad"
        />
        <TextDanger text={errors.modality ? errors.modality.msg : ""} />
        <Select
          className="form-select color-dark-green inputs"
          name="modality"
          id="modality"
          value={modality}
          required={true}
          textSelect={
            <>
              <Option
                selected
                disabled
                hidden
                id="modality"
                textOption="Modality"
              />
              <Option value="Presencial" textOption="Presencial" />
              <Option value="En línea" textOption="En línea" />
            </>
          }
          onChange={(e) => handleModality(e, setModality)}
        />
        <Button
          type="submit"
          name="button"
          className="btn-back bg-color-light-green color-white"
          id="btn-back"
          btnText="Buscar"
        />
      </form>
    </>
  );
}
export { TherapistShifts };
