import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import Peer from "peerjs";
import Title from "../Partials/Body-title";
import ArticleP from "../Partials/Article-p";
import Button from "../Partials/Button";
import Video from "../Partials/Video";
import { videoC } from "../../assets/helpers/helper-video-call";
import P from "../Partials/P";
import I from "../Partials/I";
import "../../assets/css/video-call.css";

function VideoCall({ isLogged, vc }) {
  const [error, setError] = useState(false);
  const [red, setRed] = useState(true);
  const [stateConnection, setStateConnection] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    videoC(io, isLogged, setError, Peer, setRed, setStateConnection);
    vc(false);
  }, []);

  useEffect(() => {
    if (!isLogged) navigate("/login");
  }, [isLogged, navigate]);

  useEffect(() => {
    if (error) navigate("/state-of-mind");
  }, [error, navigate]);

  useEffect(() => {
    if (stateConnection) {
      const conatinerVcT = document.getElementById("container-vc-therapist");
      conatinerVcT.innerHTML = "";
    }
  }, [stateConnection]);

  if (!red) {
    return (
      <>
        <Title text="Video llamada" />
        <P pText="Verifique la conexión a internet" />
      </>
    );
  }

  return (
    <>
      <div id="container-vc-therapist">Conectando...</div>
      <Video
        id="video-call-therapist"
        src=""
        autoPlay={true}
        alt="video call therapist"
      />

      <Video
        id="video-call-user"
        src=""
        autoPlay={false}
        alt="video call user"
      />

      <section
        id="video-call-command"
        className="color-white bg-color-light-blue2"
      >
        <Button
          className="bg-color-board"
          id="btn-circle"
          title="phone"
          btnText={
            <I className="fa-solid fa-phone-flip color-white" id="icon-phone" />
          }
        />

        <Button
          className="btn-video-call"
          id="btn-video-out"
          title="video-call-out"
          btnText={
            <>
              <I
                className="fa-solid fa-video-slash icons-video-call color-white"
                id="fa-video-slash"
              />
              <I
                className="fa-solid fa-video icons-video-call color-white display-none"
                id="fa-video"
              />
            </>
          }
        />
        <ArticleP
          articleId="video-call-clock"
          pClassName="color-white"
          pId="p-video-call-clock"
        />
        <Button
          id="btn-mic"
          className="btn-video-call"
          title="microphone-out"
          btnText={
            <>
              <I
                className="fa-solid fa-microphone-slash icons-video-call color-white"
                id="fa-mic-slash"
              />
              <I
                className="fa-solid fa-microphone icons-video-call color-white display-none"
                id="fa-mic"
              />
            </>
          }
        />
      </section>
    </>
  );
}

export default VideoCall;
