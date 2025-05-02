import * as APICALLS from "../api/apiCalls";
export async function renderHome(container: HTMLElement) {
   var user =  await APICALLS.isAuthenticated();
    container.innerHTML = `<h2>Welcome ${user.name} to our Hotel!</h2> <br> <img src="/images/library.webp" width="1000" height="500">`;
  }