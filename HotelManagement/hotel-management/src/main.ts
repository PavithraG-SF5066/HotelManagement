import { showAuthForm } from "./auth";
import { renderNavbar, renderPage } from "./components/navbar";
import * as APICALLS from "./api/apiCalls";

const app = document.getElementById("app")!;

async function renderApp() {
  app.innerHTML = "";
 var call = await APICALLS.isAuthenticated();
  if (!call.success) {
    showAuthForm(app, renderApp);
  } else {
    renderNavbar(app, renderApp);
    renderPage(app, "home");
  }
}

renderApp();
