import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Title from "../Partials/Body-title";
import { helperAllTherapists } from "../../assets/helpers/helper-admin/helper-all-therapists";
import { helperAllUsers } from "../../assets/helpers/helper-admin/helper-all-users";
import { helperAllShifts } from "../../assets/helpers/helper-admin/helper-all-shifts";
import { helperAllDonations } from "../../assets/helpers/helper-admin/helper-all-donations";
import { helperAllMoods } from "../../assets/helpers/helper-admin/helper-all-moods";
import { helperAllPrices } from "../../assets/helpers/helper-admin/helper-all-prices";
import { helperAllSessionsHours } from "../../assets/helpers/helper-admin/helper-all-sessions-hours";
import { helperAllContacts } from "../../assets/helpers/helper-admin/helper-all-contacts";
import "../../assets/css/profile.css";

function Admin({ isLogged }) {
  const [therapists, setAllTherapists] = useState("");
  const [users, setUsers] = useState("");
  const [turns, setTurns] = useState("");
  const [pages] = useState({
    page: 0,
  });
  const [donations, setDonations] = useState("");
  const [moods, setMoods] = useState("");
  const [prices, setPrices] = useState("");
  const [sessionsHours, setSessionsHours] = useState("");
  const [constacts, setContacts] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    helperAllTherapists(setAllTherapists, pages.page);
    helperAllUsers(setUsers, pages.page);
    helperAllShifts(setTurns, pages.page);
    helperAllDonations(setDonations, pages.page);
    helperAllMoods(setMoods, pages.page);
    helperAllPrices(setPrices);
    helperAllSessionsHours(setSessionsHours);
    helperAllContacts(setContacts, pages.page);
  }, []);

  useEffect(() => {
    if (!isLogged) navigate("/login");
  }, [isLogged, navigate]);

  return (
    <>
      <Title text="Administrar" />

      <Link
        to="/all-therapists"
        state={{ therapists: therapists }}
        exact="true"
        className="btn-payment btn-admin bg-color-light-green color-white"
      >
        Terapeutas
      </Link>
      <Link
        to="/all-users"
        state={{ users: users }}
        exact="true"
        className="btn-payment btn-admin bg-color-light-green color-white"
      >
        Usuarios
      </Link>
      <Link
        to="/all-shifts"
        state={{ turns: turns }}
        exact="true"
        className="btn-payment btn-admin bg-color-light-green color-white"
      >
        Turnos
      </Link>
      <Link
        to="/all-donations"
        state={{ donations: donations }}
        exact="true"
        className="btn-payment btn-admin bg-color-light-green color-white"
      >
        Donaciones
      </Link>
      <Link
        to="/all-moods"
        state={{ moods: moods }}
        exact="true"
        className="btn-payment btn-admin bg-color-light-green color-white"
      >
        Estados de ánimo
      </Link>
      <Link
        to="/all-prices"
        state={{ prices: prices }}
        exact="true"
        className="btn-payment btn-admin bg-color-light-green color-white"
      >
        Honorarios de terapeutas
      </Link>
      <Link
        to="/all-sessions-hours"
        state={{ sessionHours: sessionsHours }}
        exact="true"
        className="btn-payment btn-admin bg-color-light-green color-white"
      >
        Horas de sesión
      </Link>
      <Link
        to="/all-contacts"
        state={{ contacts: constacts }}
        exact="true"
        className="btn-payment btn-admin bg-color-light-green color-white"
      >
        Contactos
      </Link>
    </>
  );
}
export { Admin };
