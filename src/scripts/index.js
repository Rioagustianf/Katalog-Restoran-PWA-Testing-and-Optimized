import "regenerator-runtime"; /* for async await transpile */
import "../styles/main.css";
import "../styles/responsive.css";
import App from "./views/app";
import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";
import swRegister from "./utils/sw-register";

const app = new App({
  button: document.querySelector(".tombol-menu"),
  drawer: document.querySelector(".navmob"),
  content: document.querySelector("#main-container"),
});

window.addEventListener("hashchange", () => {
  app.renderPage();
});

window.addEventListener("load", () => {
  app.renderPage();
  swRegister();
});
