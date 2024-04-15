import { useState } from "react";
import Header from "../src/Components/Partials/Header";
import Footer from "../src/Components/Partials/Footer";
import Conatiner from "../src/Components/Container/Container";
import { isLogged } from "./assets/helpers/helper-app";
import "./assets/css/normalize.css";
import "./assets/css/theme.css";

function App() {
  const localStorageUserLogged = JSON.parse(localStorage.getItem("userLogged"));
  const localStorageVideoCall = JSON.parse(localStorage.getItem("video-call"));

  const [userLogged, setUserLogged] = useState(localStorageUserLogged);
  const [videoC, setVideoC] = useState(localStorageVideoCall);

  function vc(data) {
    setVideoC(data);
  }

  return (
    <>
      {videoC ? <Header userLogged={userLogged} logout={setUserLogged} /> : ""}
      <Conatiner
        isLogged={(data) => isLogged(data, setUserLogged)}
        userLogged={userLogged}
        vc={vc}
        logout={setUserLogged}
      />
      {videoC ? <Footer /> : ""}
    </>
  );
}

export default App;
