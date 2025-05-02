import { renderHome } from "../pages/home";
import { renderUser } from "../pages/userDetails";
import { renderBookingHistory } from "../pages/bookingHistory";
import { renderWallet } from "../pages/wallet";
import { renderBookRoom } from "../pages/bookRoom";
import { renderRooms } from "../pages/rooms";
import { renderWishList } from "../pages/wishlist";
import * as APICALLS from "../api/apiCalls";

export function renderNavbar(container: HTMLElement, rerenderApp: () => void) {
    const nav = document.createElement("div");
    nav.className = "navbar";
    nav.innerHTML = `
    <button data-page="home">Home</button>
    <button data-page="userDetails">User Details</button>
    <button data-page="rooms">Rooms</button>
    <button data-page="bookRoom">Book Room</button>
    <button data-page="wishlist">WishList</button>
    <button data-page="bookingHistory">Booking History</button>
    <button data-page="wallet">Wallet</button>
    <button id="logout">Logout</button>
  `;

    nav.querySelectorAll("button[data-page]").forEach(btn =>
        btn.addEventListener("click", () => {
            const page = btn.getAttribute("data-page")!;
            renderPage(container, page);
        })
    );

    nav.querySelector("#logout")!.addEventListener("click", async () => {
        await APICALLS.logout();
        rerenderApp();
    });

    container.appendChild(nav);
}

export function renderPage(container: HTMLElement, page: string) {
    const content = document.createElement("div");
    content.className = "page";

    switch (page) {
        case "home":
            renderHome(content);
            break;
        case "userDetails":
            renderUser(content);
            break;
        case "rooms":
            renderRooms(content);
            break;
        case "bookRoom":
            renderBookRoom(content);
            break;
        case "wishlist":
            renderWishList(content);
            break;
        case "bookingHistory":
            renderBookingHistory(content);
            break;
        case "wallet":
            renderWallet(content);
            break;
        default:
            content.innerText = "Page not found.";
    }

    const oldPage = container.querySelector(".page");
    if (oldPage) container.removeChild(oldPage);
    container.appendChild(content);
}
