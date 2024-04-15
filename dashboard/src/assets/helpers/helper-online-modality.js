const urlSessionHours = "http://localhost:3001/api/session-hours";
const urlAddressTherapist = "http://localhost:3001/api/address-therapist";

async function sessionHours(state) {
  const fetchSessionHours = await fetch(urlSessionHours, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error) => console.log(error));
  const response = await fetchSessionHours.json();
  state(response.data);
  return response.data;
}

async function addressTherapist(setState, emailTherapist) {
  const fetchAddressTherapist = await fetch(urlAddressTherapist, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: emailTherapist.therapist.email }),
  }).catch((error) => console.log(error));

  const response = await fetchAddressTherapist.json();

  setState(response.data);
  return response.data;
}

function dateT(setDatetime, datetime) {
  const days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ];
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const datetimeSelected = datetime.startDate;
  const day = datetimeSelected.getDay();
  const date = datetimeSelected.getDate();
  const month = datetimeSelected.getMonth();
  const hour = datetimeSelected.getHours();

  const weekDay = days[day];
  const newMonth = months[month];

  const confirmDate =
    weekDay + ", " + date + " de " + newMonth + ", " + hour + " hs";

  setDatetime(confirmDate);
}

function localStorageDatetime(selectedTherpist, isLogged, addressT) {
  if (selectedTherpist) {
    const dateTimeSelected = {
      date:
        selectedTherpist[3].startDate.getFullYear().toString() +
        "-" +
        (selectedTherpist[3].startDate.getMonth() + 1) +
        "-" +
        selectedTherpist[3].startDate.getDate(),
      time: selectedTherpist[3].startDate.getHours() + ":00:00",
      modality: selectedTherpist[2].modality,
      userLogged: isLogged.id,
      therapist: addressT.email,
    };

    localStorage.setItem("selected-datetime", JSON.stringify(dateTimeSelected));
  }
}

function localStorageTherapist(therapist) {
  localStorage.setItem("therapists", JSON.stringify(therapist));
  localStorage.setItem("create-med-appointment", JSON.stringify(true));
}

export {
  sessionHours,
  addressTherapist,
  dateT,
  localStorageDatetime,
  localStorageTherapist,
};
