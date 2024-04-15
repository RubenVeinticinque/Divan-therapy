async function videoC(
  io,
  isLogged,
  setError,
  Peer,
  setRed,
  setStateConnection
) {
  if (!window.navigator.onLine) {
    setRed(false);
  } else {
    const urlVideoCall = "http://localhost:3001/api/video-call";
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(isLogged),
    };

    try {
      const fetchVideoCall = await fetch(urlVideoCall, config);
      const response = await fetchVideoCall.json();

      if (
        response.data === "There is no medical appointment" ||
        response.data === "Error of medical appointment"
      ) {
        setError(true);
      } else {
        const socket = io.connect("http://localhost:3001");

        let audioVideo;
        let timerC;
        let connectId;

        const main = document.getElementById("main");
        const videoUser = document.getElementById("video-call-user");
        const videoTherapist = document.getElementById("video-call-therapist");
        const btnVideoOut = document.getElementById("btn-circle");
        const chronometer = document.getElementById("p-video-call-clock");
        const faVideoSlash = document.getElementById("fa-video-slash");
        const faVideo = document.getElementById("fa-video");
        const faMicSlash = document.getElementById("fa-mic-slash");
        const faMic = document.getElementById("fa-mic");

        main.style.padding = "0";

        //ENVIO DE USERNAME (USERLOGGED) AL SERVIDOR
        const userLogged = {
          id: isLogged.id,
          name: isLogged.name,
          lastname: isLogged.lastname,
          email: isLogged.userEmail,
          avatar: isLogged.avatar,
        };

        const peer = new Peer();

        const audioConstrains = {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        };

        const contrains = { audio: audioConstrains, video: true };

        audioVideo = navigator.mediaDevices
          .getUserMedia(contrains)
          .catch((error) => {
            window.alert(
              "Debes conectar tu micrófono y cámara para poder tener un diálogo"
            );
            console.log(error);
          });

        peer.on("open", (id) => {
          socket.emit(
            "join-room",
            userLogged,
            response.data.therapist,
            response.data.user,
            id
          );
          timerC = setInterval(timer, 1000);
        });

        peer.on("error", (error) => {
          console.log(error.type);
          clearInterval(timerC);
        });

        audioVideo.then((stream) => {
          addVideoStream(videoUser, stream);

          peer.on("call", (call) => {
            call.answer(stream);

            call.on("stream", (userVideoStream) => {
              addVideoStream(videoTherapist, userVideoStream);
            });
          });

          socket.on("user-connected", (userId) => {
            connectToNewUser(userId, stream);
            connectId = userId;
            clearInterval(timerC);
            timerC = setInterval(timer, 1000);
          });

          socket.on("user-disconnected", (id) => {
            videoTherapist.srcObject = null;
            clearInterval(timerC);
            s = 0;
            m = 0;
          });
        });

        peer.on("connection", () => {
          setStateConnection(true);
        });

        const addVideoStream = (video, stream) => {
          video.srcObject = stream;
          video.addEventListener("loadedmetadata", () => {
            video.play();
          });
        };

        const connectToNewUser = (userId, stream) => {
          const call = peer.call(userId, stream);

          if (call) {
            call.on("stream", (userVideoStream) => {
              addVideoStream(videoTherapist, userVideoStream);
            });

            // If they leave, remove their video
            call.on("close", () => {
              videoTherapist.remove();
            });
          }
          peer.connect(userId);
          setStateConnection(true);
        };

        btnVideoOut.addEventListener("click", () => {
          peer.destroy();
          clearInterval(timerC);
          window.location.href = "/users-messages";
        });

        faVideoSlash.addEventListener("click", () => {
          faVideoSlash.classList.add("display-none");
          faVideo.classList.remove("display-none");

          audioVideo.then((stream) => {
            stream.getVideoTracks().forEach((track) => {
              track.enabled = false;
            });
            clearInterval(timerC);
            s = 0;
            m = 0;
          });
          videoTherapist.srcObject = null;
          peer.disconnect(connectId);
        });

        faVideo.addEventListener("click", () => {
          faVideoSlash.classList.remove("display-none");
          faVideo.classList.add("display-none");

          audioVideo.then((stream) => {
            stream.getVideoTracks().forEach((track) => {
              track.enabled = true;
            });
          });
          peer.reconnect(connectId);
        });

        faMicSlash.addEventListener("click", () => {
          faMicSlash.classList.add("display-none");
          faMic.classList.remove("display-none");

          audioVideo.then((stream) => {
            stream.getAudioTracks()[0].enabled = false;
          });
        });

        faMic.addEventListener("click", () => {
          faMicSlash.classList.remove("display-none");
          faMic.classList.add("display-none");

          audioVideo.then((stream) => {
            stream.getAudioTracks()[0].enabled = true;
          });
        });

        //Timer
        const timeOut = 40;
        let s = 0;
        let m = 0;

        function timer() {
          if (s >= 60) {
            m++;
            s = 0;
          }
          if (m < 10) {
            if (s < 10) {
              chronometer.textContent = `00:0${m}:0${s}`;
            } else {
              chronometer.textContent = `00:0${m}:${s}`;
            }
          } else {
            if (s < 10) {
              chronometer.textContent = `00:${m}:0${s}`;
            } else {
              chronometer.textContent = `00:${m}:${s}`;
            }
          }
          if (m === timeOut) {
            clearInterval(timerC);
            peer.destroy();
            window.location.href = "/messages";
          }
          s++;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export { videoC };
