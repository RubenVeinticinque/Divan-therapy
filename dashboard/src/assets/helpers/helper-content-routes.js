const urlTherapists = "http://localhost:3001/api/all-therapists";
const urlMessages = "http://localhost:3001/api/all-messages";
const urlPrices = "http://localhost:3001/api/prices";
const urlTotalSessions = "http://localhost:3001/api/total-sessions";
const urlRegion = "http://localhost:3001/api/regions";

const config = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

async function therapist(state) {
  const fetchTherapists = await fetch(urlTherapists, config);

  const response = await fetchTherapists.json();
  state(response.data);
}
async function message(state) {
  const fetchMessages = await fetch(urlMessages, config);
  const response = await fetchMessages.json();
  state(response.data);
}
async function price(state) {
  const fetchPrices = await fetch(urlPrices, config);
  const response = await fetchPrices.json();
  state(response.data);
  return response.data;
}
async function totalSession(state) {
  const fetchTotalSessions = await fetch(urlTotalSessions, config);
  const response = await fetchTotalSessions.json();
  state(response.data);
}

async function regions() {
  const fetchRegion = await fetch(urlRegion, config);
  const response = await fetchRegion.json();
  localStorage.setItem("regions", JSON.stringify(response.data));
}

export { therapist, message, price, totalSession, regions };
