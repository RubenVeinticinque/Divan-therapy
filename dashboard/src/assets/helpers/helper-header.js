function handleClick() {
  //Menu burger y xmark
  const burgerIcon = document.getElementById("burger");
  const xmarkIcon = document.getElementById("xmark");
  const nav = document.getElementById("nav");
  //Titles
  const title = document.getElementById("title");
  const titlePayment = document.getElementById("p-payment");

  burgerIcon.style.display = "none";
  xmarkIcon.style.display = "flex";
  nav.style.transitionProperty = "left";
  nav.style.transitionDuration = "2s";
  nav.style.left = "0";

  if (title) {
    title.style.transitionProperty = "margin-top";
    title.style.transitionDuration = "2s";
    title.style.marginTop = "420px";
  }
  if (titlePayment) {
    titlePayment.style.transitionProperty = "margin-top";
    titlePayment.style.transitionDuration = "2s";
    titlePayment.style.marginTop = "100px";
  }
}
function handleXmark() {
  //Menu burger y xmark
  const burgerIcon = document.getElementById("burger");
  const xmarkIcon = document.getElementById("xmark");
  const nav = document.getElementById("nav");
  //Titles
  const title = document.getElementById("title");
  const titlePayment = document.getElementById("p-payment");

  xmarkIcon.style.display = "none";
  burgerIcon.style.display = "flex";
  nav.style.transitionProperty = "left";
  nav.style.transitionDuration = "2s";
  nav.style.left = "-955px";

  if (title) {
    title.style.transitionProperty = "margin-top";
    title.style.transitionDuration = "2s";
    title.style.marginTop = "100px";
  }
  if (titlePayment) {
    titlePayment.style.transitionProperty = "margin-top";
    titlePayment.style.transitionDuration = "2s";
    titlePayment.style.marginTop = "0px";
  }
}
function buttonLogin() {
  //Menu button login
  const btnLogin = document.getElementById("btn-login");
  const menuLogin = document.getElementById("ul-login");

  if (btnLogin) {
    if (menuLogin) {
      menuLogin.classList.remove("display-none");
      btnLogin.addEventListener("mouseenter", () => {
        menuLogin.style.transitionProperty = "opacity";
        menuLogin.style.transitionDuration = "2s";
        menuLogin.style.opacity = "1";
        menuLogin.style.display = "block";
      });
      btnLogin.addEventListener("mouseleave", () => {
        function menuLoginOut() {
          menuLogin.style.transitionProperty = "opacity";
          menuLogin.style.transitionDuration = "2s";
          menuLogin.style.opacity = "0";
          menuLogin.style.display = "none";
        }
        setTimeout(menuLoginOut, 4000);
      });

      menuLogin.addEventListener("mouseleave", () => {
        menuLogin.style.transitionProperty = "opacity";
        menuLogin.style.transitionDuration = "2s";
        menuLogin.style.opacity = "0";
        menuLogin.style.display = "none";
      });
    }
  }
}

function userDisconnect(io, isLogged) {
  const socket = io("http://localhost:3001");
  socket.emit("user-disconn", isLogged);
}

export { handleClick, handleXmark, buttonLogin, userDisconnect };
