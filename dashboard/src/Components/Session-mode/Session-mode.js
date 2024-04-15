import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  onSubmit,
  filterPassedTime,
  btnOnClickF,
  btnOnClickO,
} from "../../assets/helpers/helper-session-mode.js";
import Title from "../Partials/Body-title.js";
import P from "../Partials/P.js";
import Img from "../Partials/Img.js";
import Button from "../Partials/Button.js";
import Label from "../Partials/Label.js";
import "../../assets/css/session-mode.css";

function SessionMode({ therapists, isLogged }) {
  const newDate = new Date();
  const [startDate, setStartDate] = useState(newDate);
  const [datetime, setDatetime] = useState([]);
  const [therapist, setTherapist] = useState([]);
  const [btnOnClickFtf, setBtnOnClickFtf] = useState(null);
  const [btnOnClickOnline, setBtnOnClickOnline] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setTherapist(therapists);
  }, []);

  useEffect(() => {
    if (!isLogged) return navigate("/");
  }, [isLogged, navigate]);

  useEffect(() => {
    if (!therapist) return navigate("/therapists");
  }, [therapist, navigate]);

  useEffect(() => {
    if (datetime.date) {
      return navigate("/session-mode", { state: therapist });
    } else {
      if (btnOnClickFtf) {
        if (startDate.getHours() < 9 || startDate.getHours() > 17)
          return navigate("/session-mode", {
            state: therapist,
          });
        return navigate("/modality", {
          state: [
            { therapist },
            { sessionConfirm: true },
            { modality: false },
            { startDate },
          ],
        });
      }
      if (btnOnClickOnline) {
        if (startDate.getHours() < 9 || startDate.getHours() > 17)
          return navigate("/session-mode", {
            state: therapist,
          });
        return navigate("/modality", {
          state: [
            { therapist },
            { sessionConfirm: true },
            { modality: true },
            { startDate },
          ],
        });
      }
    }
  }, [datetime]);

  return (
    <>
      <Title text={"Fecha de la cita"} />
      <div className="div-sub-title">
        <P pClassName="sub-title" pText="Próxima sesión" />
      </div>

      <div type="submit" className="btn-card" id="btn-card">
        <Img
          className="img-profile"
          src={therapist && therapist.avatar}
          alt="img card profile"
        />

        <div className="therapist-card-text">
          <Label
            className="label-therapist color-dark-green"
            htmlFor="name"
            id="label-name"
            labelText={therapist && therapist.name + " " + therapist.lastname}
          />

          <Label
            className="label-therapist color-soft-green"
            htmlFor="therapist-type"
            id="label-therapist"
            labelText={therapist && therapist.type_therapist}
          />

          <Label
            className="label-therapist color-light-green"
            htmlFor="therapist-speciality"
            id="label-speciality"
            labelText={therapist && therapist.speciality}
          />

          <Label
            className="label-therapist color-light-green"
            htmlFor="session"
            id="label-sessions"
            labelText={therapist && therapist.total_sessions + " sessions"}
          />
        </div>
      </div>
      <div className="modality">
        {datetime && datetime.date ? (
          <P
            pClassName="color-orange"
            pText={
              <React.Fragment>
                {datetime.date.slice(8) +
                  "-" +
                  datetime.date.slice(5, 7) +
                  "-" +
                  datetime.date.slice(0, 4) +
                  " "}
                a las {datetime.time} hs está reservada
              </React.Fragment>
            }
          />
        ) : (
          ""
        )}
        <P pClassName="fs-4" pText="Fecha de la sesión" />
      </div>
      <form
        autoComplete="off"
        id="form-session-mode"
        className="form"
        onSubmit={(e) => onSubmit(e, setDatetime, therapist)}
      >
        <DatePicker
          className="input-date-time"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          timeInputLabel="Time:"
          dateFormat="dd/MM/yyyy H:mm"
          showTimeSelect
          timeFormat="H:mm"
          timeIntervals={60}
          minDate={startDate}
          minTime={new Date(0, 0, 0, 9, 0)}
          maxTime={new Date(0, 0, 0, 17, 0)}
          filterTime={(time) => filterPassedTime(time, newDate)}
        />
      </form>

      <div className="div-session-mode">
        <Button
          type="submit"
          name="date"
          value="btn-ftf"
          className="btn-ftf-session-mode bg-color-orange color-white"
          form="form-session-mode"
          onClick={() => btnOnClickF(setBtnOnClickFtf)}
          btnText="Presencial"
        />

        <Button
          type="submit"
          name="date"
          value="btn-online"
          className="btn-online-session-mode bg-color-light-green color-white"
          form="form-session-mode"
          onClick={() => btnOnClickO(setBtnOnClickOnline)}
          btnText="En línea"
        />
      </div>
    </>
  );
}
export default SessionMode;
