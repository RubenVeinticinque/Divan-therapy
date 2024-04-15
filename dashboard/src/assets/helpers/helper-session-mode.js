async function fetchMedicalAppointment(url, e, setState, therapist) {
  try {
    const medicalAppointment = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        datetime: e.target[0].value,
        email: therapist.email,
      }),
    });
    const response = await medicalAppointment.json();

    setState(response.data);
  } catch (error) {
    console.log(error);
  }
}

function onSubmit(e, setState, therpist) {
  e.preventDefault();

  const urlMa = "http://localhost:3001/api/medical-appointments";
  fetchMedicalAppointment(urlMa, e, setState, therpist);
}

const filterPassedTime = (time, date) => {
  const selectedDate = new Date(time);
  return date.getTime() < selectedDate.getTime();
};

function btnOnClickF(state) {
  state(true);
}

function btnOnClickO(state) {
  state(true);
}

export { onSubmit, filterPassedTime, btnOnClickF, btnOnClickO };
