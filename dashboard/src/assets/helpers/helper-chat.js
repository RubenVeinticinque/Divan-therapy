function socketChat(io, isLogged, selectedTherapist) {
  const socket = io.connect("http://localhost:3001");

  let userSelected;
  let audio;
  let source;
  let mediaRecorder;
  let chunks = [];
  let usersChat;

  const imgProfile = document.getElementById("img-profile");
  const input = document.getElementById("chat-input-msg");
  const ulUsers = document.getElementById("chat-ul-users");
  const connectedUsers = document.getElementById("chat-users");
  const containerChat = document.getElementById("container-chat");
  const main = document.getElementById("chat-msg");
  const form = document.getElementById("chat-form");
  const chatImgName = document.getElementsByClassName(
    "chat-container-img-name"
  );
  const labelName = document.getElementsByClassName("label-therapist-name");
  const userTyping = document.getElementById("typing");
  const file = document.getElementById("file");
  const btnMic = document.getElementById("btn-mic");
  const btnChatOut = document.getElementById("btn-chat-out");

  //ENVIO DE USERNAME (USERLOGGED) AL SERVIDOR
  const userLogged = {
    id: isLogged.id,
    name: isLogged.name,
    lastname: isLogged.lastname,
    email: isLogged.userEmail,
    avatar: isLogged.avatar,
    therapistSelected: selectedTherapist[0]
      ? selectedTherapist[0].therapist.email
      : selectedTherapist,
  };

  socket.emit("user-logged", userLogged);

  //RECIBE DEL SERVIDOR TODOS LOS USUARIOS
  socket.on("users", (users) => {
    let element = "";

    usersChat = users;

    for (const i of users) {
      element += `<button class="btn_username" name="btn_username"><img src=${i.avatar} class="img_users" alt="img user"><li>${i.name} ${i.lastname}</li></button>`;
      ulUsers.innerHTML = element;
    }

    const btnUsername = document.getElementsByClassName("btn_username");
    for (const m of btnUsername) {
      m.style.color = "#008c87";
    }

    //ENVIO EL USUARIO SELECIONADO AL SERVIDOR PARA HABITACIONES
    for (let i = 0; i < btnUsername.length; i++) {
      btnUsername[i].addEventListener("click", async (e) => {
        e.preventDefault();

        if (e.target.previousElementSibling) {
          const imgSrc =
            e.target.previousElementSibling.src || e.target.firstChild.src;
          const username = e.target.textContent;

          containerChat.classList.remove("display-none");
          connectedUsers.classList.add("display-none");
          btnChatOut.classList.remove("display-none");

          imgProfile.src = imgSrc;

          for (const e of labelName) {
            e.textContent = username;
          }

          const lastnameIndex = username.lastIndexOf(" ");

          const name = username.slice(0, lastnameIndex);
          const lastname = username.slice(lastnameIndex + 1);

          for (const x of users) {
            if (x.name === name && x.lastname === lastname) {
              userSelected = x;
            }
          }

          const audioConstrains = {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          };

          const contrains = { audio: audioConstrains, video: false };
          audio = navigator.mediaDevices.getUserMedia(contrains).catch(() => {
            window.alert(
              "Debes conectar tu micrófono para poder enviar audios al chat"
            );
          });
        }
      });
    }
  });

  //CARGA DE IMAGENES AL CHAT Y ENVIO AL SERVIDOR
  file.addEventListener("change", async (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function (evt) {
      const resizeWidth = 400;

      const image = new Image();
      image.src = evt.target.result;

      image.onload = (el) => {
        const element = document.createElement("canvas");

        const factorScale = resizeWidth / el.target.width;
        element.width = resizeWidth;
        element.height = el.target.height * factorScale;

        const cxt = element.getContext("2d");
        cxt.drawImage(el.target, 0, 0, element.width, element.height);

        const srcEncoded = cxt.canvas.toDataURL("image/png", 1);

        socket.emit("file", userSelected, srcEncoded, socket.id);
      };
    };
  });

  //IMPRESION DE ARCHIVO EN EL CLIENTE
  socket.on("upload-file", (file, socketAuth, socketUser) => {
    socket.auth = socketAuth.socketId;

    if (socket.auth === socket.id) {
      main.innerHTML += `<div class="container-img"><p class="p_user">${userLogged.name} ${userLogged.lastname}</p><img src=${file} class="img_upload" alt="img upload"></div>`;
    } else {
      main.innerHTML += `<div class="container-img"><p class="p_user_selected">${socketUser.name} ${socketUser.lastname}</p><img src=${file} class="img_upload" alt="img upload"></div>`;
    }
  });

  //ENVIO EL VALOR DEL INPUT (MENSAJE) AL SERVIDOR
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (input.value) {
      socket.emit(
        "message",
        input.value,
        { socketId: socket.id },
        userSelected
      );
      input.value = "";
    }
  });

  //AVISO DE USUARIO ESCRIBIENDO
  input.addEventListener("keypress", (e) => {
    socket.emit("user-typing", userSelected);
  });

  socket.on("alert-user-typing", (socketUser) => {
    userTyping.style.transitionProperty = "opacity";
    userTyping.style.transitionDuration = "0s";
    userTyping.style.opacity = "1";
    userTyping.innerHTML = `<strong>${socketUser.name} ${socketUser.lastname}</strong> está escribriendo`;
  });

  //AVISO AL USUARIO QUE HA DEJADO DE ESCRIBIR
  input.addEventListener("keyup", (e) => {
    socket.emit("not-typing", userSelected);
  });

  socket.on("alert-not-typing", () => {
    userTyping.style.transitionProperty = "opacity";
    userTyping.style.transitionDuration = "3s";
    userTyping.style.opacity = "0";
  });

  //PINTA DE UN COLOR EL MENSAJE Y DE OTRO COLOR CUANDO RECIBE UN MENSAJE
  socket.on("message", (inputValue, socketAuth, socketUser) => {
    socket.auth = socketAuth.socketId;

    if (socket.auth.socketId === socket.id) {
      main.innerHTML += `<div class="div-chat-container-user"><p class="p_user w-100">${userLogged.name} ${userLogged.lastname}</p><div class="container-msg"><div id="div-msg1"></div><p class="chat-send-user" id="chat">${inputValue}</p></div></div>`;

      window.scrollTo(0, document.body.scrollHeight);
    } else {
      main.innerHTML += `<div class="container w-100 text"><div class="div-chat-container-therapist"><p class="p_user_selected w-100">${socketUser.name} ${socketUser.lastname}</p><div class="container-msg">
      <div id="div-msg2"></div><p class="chat-send-guest" id="chat-therapist">${inputValue}</p></div></div></div>`;
      window.scrollTo(0, document.body.scrollHeight);
    }
  });

  for (const i of chatImgName) {
    i.addEventListener("click", (e) => {
      e.preventDefault();
      containerChat.classList.add("display-none");
      connectedUsers.classList.remove("display-none");
    });
  }

  //ENTRADA DE AUDIO AL CHAT POR MICRÓFONO
  btnMic.addEventListener("mousedown", (e) => {
    audio.then((stream) => {
      if (stream) {
        const audioContext = new AudioContext();

        source = audioContext.createMediaStreamSource(stream);

        source.connect(audioContext.destination);

        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();
      }
    });

    btnMic.style.borderRadius = "50%";
    btnMic.style.backgroundColor = "#961515";
  });

  //DETIENE DE AUDIO QUE PROVIENE DEL MICRÓFONO
  btnMic.addEventListener("mouseup", (e) => {
    btnMic.style.borderRadius = "0";
    btnMic.style.backgroundColor = "#008c87";

    if (source || mediaRecorder) {
      source.disconnect();
      mediaRecorder.stop();

      mediaRecorder.ondataavailable = (e) => {
        chunks.push(e.data);

        socket.emit("mic-voice", chunks, userSelected, socket.id);
      };
    }
  });
  //ENTRADA DE AUDIO AL CHAT POR MICRÓFONO (TOUCH START)
  btnMic.addEventListener("touchstart", (e) => {
    audio.then((stream) => {
      if (stream) {
        const audioContext = new AudioContext();
        source = audioContext.createMediaStreamSource(stream);

        source.connect(audioContext.destination);

        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();
      }
    });

    btnMic.style.borderRadius = "50%";
    btnMic.style.backgroundColor = "#961515";
  });

  //DETIENE DE AUDIO QUE PROVIENE DEL MICRÓFONO (TOUCH END)
  btnMic.addEventListener("touchend", (e) => {
    btnMic.style.borderRadius = "0";
    btnMic.style.backgroundColor = "#008c87";

    if (source || mediaRecorder) {
      source.disconnect();
      mediaRecorder.stop();

      mediaRecorder.ondataavailable = (e) => {
        chunks.push(e.data);

        socket.emit("mic-voice", chunks, userSelected, socket.id);
      };
    }
  });

  //IMPRESION DE AUDIO EN EL CLIENTE
  socket.on("audio-chat", (chunks, socketAuth, socketUser) => {
    socket.auth = socketAuth.socketId;

    if (socket.auth === socket.id) {
      const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
      chunks = [];
      const audioUrl = window.URL.createObjectURL(blob);

      main.innerHTML += `<div class="div-chat-container-user container-audio-chat"><p class="p_user w-100">${userLogged.name} ${userLogged.lastname}</p><audio src=${audioUrl} class="audio-chat" controls></audio></div></div>`;

      window.scrollTo(0, document.body.scrollHeight);
    } else {
      const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
      chunks = [];
      const audioUrl = window.URL.createObjectURL(blob);

      main.innerHTML += `<div class="container-audio-chat w-100"><div class="div-chat-container-therapist"><p class="p_user_selected w-100">${socketUser.name} ${socketUser.lastname}</p><audio src=${audioUrl} class="audio-chat" controls></audio></div></div></div>`;

      window.scrollTo(0, document.body.scrollHeight);
    }
  });

  //USUARIO DESCONECTADO DEL CHAT
  socket.on("user-disconnecting", (users) => {
    let element = "";

    for (const i of users) {
      element += `<button class="btn_username"><img src=${i.avatar} class="img_users" alt="img user"><li>${i.name} ${i.lastname} </li></button>`;
      ulUsers.innerHTML = element;

      const btnUsername = document.getElementsByClassName("btn_username");
      for (const m of btnUsername) {
        m.style.color = "#008c87";
      }
      const notConnected = document.getElementsByClassName("not_connected");
      for (const i of notConnected) {
        i.style.color = "#961515";
      }
    }
    socket.emit("user-reconnect");
  });
}

export { socketChat };
