import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
localStorage.setItem("video-call", JSON.stringify(true));

if (window.location.href === "http://localhost:3000/video-call") {
  localStorage.removeItem("video-call");
}

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
