let users = [];
let socketAuth;
let userDisconnected;

module.exports = (io) => {
  async function fetchSockets(socketId) {
    const fetchSockets = await io.fetchSockets();

    fetchSockets.forEach((element, i) => {
      if (i <= 1) {
        //Agrego id al objeto auth del socket.
        socketAuth = element.handshake.auth = {
          socketId,
        };
      }
    });
    return socketAuth;
  }

  io.on("connection", (socket) => {
    socket.on("user-logged", (userLogged) => {
      const usernameWithAvatar = {
        name: userLogged.name,
        lastname: userLogged.lastname,
        avatar: userLogged.avatar,
        email: userLogged.email,
        socketId: socket.id,
      };

      socket.users = usernameWithAvatar;
      users.push(socket.users);

      for (let i = 0; i < users.length; i++) {
        for (let x = i + 1; x < users.length; x++) {
          if (users[i].email === users[x].email) {
            users.splice(x);
          }
        }

        if (userDisconnected) {
          if (users[i].email === userDisconnected[0].email) {
            users[i].socketId = userDisconnected[0].socketId;
            socket.join(userDisconnected[0].socketId);
            userDisconnected = undefined;
          }
        }
      }

      io.emit("users", users);
    });

    socket.on("user-reconnect", () => {
      io.emit("users", users);
    });

    socket.on("user-typing", (userSelected) => {
      io.to(userSelected.socketId).emit("alert-user-typing", socket.users);
    });

    socket.on("not-typing", (userSelected) => {
      io.to(userSelected.socketId).emit("alert-not-typing");
    });

    socket.on("message", async (inputValue, socketId, userSelected) => {
      socketAuth = await fetchSockets(socketId);

      io.to(socket.id)
        .to(userSelected.socketId)
        .emit("message", inputValue, socketAuth, socket.users);
    });

    socket.on("file", async (userSelected, file, socketId) => {
      socketAuth = await fetchSockets(socketId);

      io.to(socket.id)
        .to(userSelected.socketId)
        .emit("upload-file", file, socketAuth, socket.users);
    });

    socket.on("mic-voice", async (chunks, userSelected, socketId) => {
      socketAuth = await fetchSockets(socketId);

      io.to(socket.id)
        .to(userSelected.socketId)
        .emit("audio-chat", chunks, socketAuth, socket.users);
    });

    socket.on("disconnect", () => {
      for (const i of users) {
        if (socket.users === i) {
          const indexUser = users.indexOf(i);
          userDisconnected = users.splice(indexUser, 1);
        }
      }
      io.emit("user-disconnecting", users);
    });

    socket.on("user-disconn", (isLogged) => {
      for (const i of users) {
        if (isLogged.userEmail === i.email) {
          const indexUser = users.indexOf(i);
          users.splice(indexUser, 1);
        }
      }

      io.emit("user-disconnecting", users);
    });

    //-----VIDEO CAll-----
    socket.on("join-room", (userLogged, therapistMa, userMa, id) => {
      if (therapistMa === userLogged.email || userMa === userLogged.email) {
        socket.join("join");
      }

      socket.to("join").emit("user-connected", id);

      socket.on("disconnect", () => {
        socket.to("join").emit("user-disconnected", id);
      });
    });
  });
};
