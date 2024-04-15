import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import Label from "../Partials/Label";
import Input from "../Partials/Input";
import P from "../Partials/P";
import Img from "../Partials/Img";
import Button from "../Partials/Button";
import IconVideoBlack from "../../assets/img/icons/video-black.gif";
import IconCameraRetro from "../../assets/img/icons/camera-retro.gif";
import IconMic from "../../assets/img/icons/mic.gif";
import IconSendMessage from "../../assets/img/icons/send-message.gif";
import { socketChat } from "../../assets/helpers/helper-chat";
import { userDisconnect } from "../../assets/helpers/helper-header";
import "../../assets/css/chat.css";

function Chat({ isLogged, vc, stateChat }) {
  const selectedTherapist = JSON.parse(localStorage.getItem("therapists"));
  const [status] = useState(stateChat ? stateChat : false);
  const [therapistSel] = useState(selectedTherapist ? selectedTherapist : "");
  const navigate = useNavigate();

  useEffect(() => {
    if (therapistSel) return socketChat(io, isLogged, therapistSel);
    return socketChat(io, isLogged, "");
  }, []);

  useEffect(() => {
    if (!isLogged) navigate("/");
    vc(true);
  }, [isLogged, navigate]);

  useEffect(() => {
    if (!status) navigate("/");
  }, [status, navigate]);

  return (
    <>
      <div id="chat-users" className="w-100">
        <P
          pClassName="color-dark-green"
          pId="title"
          pText="Usuarios Conectados"
        />
        <ul id="chat-ul-users"></ul>
      </div>

      <div className="container-chat w-100 display-none" id="container-chat">
        <section id="chat-therapist-name">
          <div className="chat-header">
            <div className="chat-container-img-name">
              <Img
                id="img-profile"
                className="img-profile"
                src={therapistSel ? therapistSel[0].therapist.avatar : ""}
                alt="img card profile"
              />

              <Label
                className="label-therapist-name label-session-mode color-dark-green"
                htmlFor="name"
              />
            </div>
            <Link
              to="/video-call"
              exact="true"
              onClick={() => userDisconnect(io, isLogged)}
            >
              <Img
                className="chat-icon-video-black"
                src={IconVideoBlack}
                alt="img video black"
              />
            </Link>
          </div>
        </section>

        <div id="div-line" className="bg-color-light-gray"></div>

        <section id="chat-msg"></section>

        <P pId="typing" />

        <div className="div-session-mode">
          <form
            id="chat-form"
            className="bg-color-light-green"
            encType="multipart/form-data"
          >
            <div className="chat-icon-camera-retro bg-color-light-green color-white">
              <Label
                htmlFor="file"
                labelText={
                  <Img
                    className="chat-icon-msg "
                    src={IconCameraRetro}
                    alt="icon camera retro"
                  />
                }
              />
              <Input
                className="chat-icon-msg"
                type="file"
                name="avatar"
                id="file"
                accept=".jpg, .png, .gif"
                required={false}
              />
            </div>

            <Label className="display-none" htmlFor="chat-input-msg"></Label>
            <Input
              className="bg-color-light-green color-white"
              type="text"
              name="chat-msg"
              id="chat-input-msg"
              placeholder="Escribe tu mensage"
            />

            <Button
              type="submit"
              className="chat-icon-msg bg-color-light-green color-white"
              form="chat-form"
              btnText={
                <Img
                  className="chat-icon-msg"
                  src={IconSendMessage}
                  alt="icon send message"
                />
              }
            />

            <Button
              type="button"
              className="chat-icon-msg bg-color-light-green color-white"
              id="btn-mic"
              for="chat-form"
              btnText={
                <Img
                  id="img-mic"
                  className="chat-icon-msg"
                  src={IconMic}
                  alt="icon mic"
                />
              }
            />
          </form>
        </div>
        <Link
          to="/users-messages"
          exact="true"
          onClick={() => userDisconnect(io, isLogged)}
        >
          <Button
            type="button"
            className="btn-ftf-session-mode bg-color-orange color-white display-none"
            id="btn-chat-out"
            btnText="Salir del chat"
          />
        </Link>
      </div>
    </>
  );
}

export default Chat;
