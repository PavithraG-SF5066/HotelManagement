import * as APICALLS from '../api/apiCalls';
import { WishList } from '../models/models';
// import { Customer } from '../models/model';

export function renderBookRoom(container: HTMLElement) {
    container.innerHTML = `<h2>Book Rooms</h2>`;
    const tableContainer = document.createElement("span");
    createTable();
    async function createTable() {
        var rooms = await APICALLS.fetchRooms();
        tableContainer.innerHTML = "";
        const table = document.createElement("table");
        table.border = "1";
        table.style.borderCollapse = "collapse";
        table.style.width = "100%";

        var headerRow = document.createElement("tr") as HTMLTableRowElement;
        headerRow.innerHTML = `
          <th>Room ID</th>
          <th>Room Type</th>
          <th>Number of Beds</th>
          <th>Price Per Day</th>
          <th>Action</th>`;
        table.appendChild(headerRow);

        rooms.forEach((room) => {
            const row = document.createElement("tr");
            row.innerHTML =
                `<td>${room.roomID}</td>
                 <td>${room.roomType}</td>
                 <td>${room.numberOfBeds}</td>
                 <td>${room.pricePerDay}</td>
        <td><button id="borrowbtn" onclick="bookRoom(${room.roomID})">Add To wishList</button></td>`;
            table.appendChild(row);
        });
        tableContainer.appendChild(table);
    }
    container.appendChild(tableContainer);
    function GetDateForm() {
        const existingForm = document.getElementById("dateForm");
        if (existingForm) {
            existingForm.remove();
        }
        const form = document.createElement("form");
        form.id = "dateForm";
        form.innerHTML = `       
        <label for="fromDate">From Date:</label>      
        <input type="date" id="fromDate" name="fromDate"><br>
        <label for="toDate">To Date:</label>
        <input type="date" id="toDate" name="toDate"><br>
        <button class="btn" type="submit">Submit</button>
        `;
        container.appendChild(form);
    }
    let bookID:number=0;
    async function bookRoom(roomID: number) {
        GetDateForm();
        bookID=roomID;
    }
        document.addEventListener("submit", async (event) => {
            event.preventDefault();
            const form = event.target as HTMLFormElement;   
            var fromDateIp = new Date(form.fromDate.value);
            var toDateIp = new Date(form.toDate.value);
            var days = Math.floor((toDateIp.getTime() - new Date(fromDateIp).getTime()) / (1000 * 60 * 60 * 24));
            const existingForm = document.getElementById("dateForm");
            if (existingForm) {
                existingForm.remove();
            }
            var roomList = await APICALLS.getIndividualRoom(bookID);
            
            if (roomList == null) {
                alert("Room not found");
                return;
            }
            var user = await APICALLS.isAuthenticated();
            if (!user.success) {
                alert("Please login first");
                return;
            }
            var currentUser = await APICALLS.getIndividualUser(user.email);
            if (!currentUser) {
                alert("User not found");
                return;
            }
            const wishlist: WishList = { wishListID: 0, userID: currentUser.userID, roomID: roomList.roomID, fromDate: fromDateIp, toDate: toDateIp,priceOfRoom:roomList.pricePerDay*(days+1)}
            var wishID=await APICALLS.addWhisList(wishlist);
            alert("Added to Your WishList successfully : " +wishID);
        });
    
    (window as any).bookRoom = bookRoom;
}



