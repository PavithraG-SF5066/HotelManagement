import * as APICALLS from '../api/apiCalls';
import { WishList, Users, RoomDetails, BookingDetails, bookingStatus, RoomSelection } from '../models/models';
// import { Customer } from '../models/model';

var user = await APICALLS.isAuthenticated();
var currentUser = await APICALLS.getIndividualUser(user.email);
var totalPrice: number = 0;
export function renderWishList(container: HTMLElement) {
    container.innerHTML = `<h2>Your WishList</h2>`;
    const tableContainer = document.createElement("span");
    const priceContainer = document.createElement("div");
    const bookAll = document.createElement("div");
    priceContainer.setAttribute('class', 'priceContainer');
    createTable();


    async function createTable() {
        var wishlists = await APICALLS.fetchWishList(currentUser!.userID);
        var availableWish = await APICALLS.getAvailableWish();
        tableContainer.innerHTML = "";
        const table = document.createElement("table");
        table.border = "1";
        table.style.borderCollapse = "collapse";
        table.style.width = "100%";

        var headerRow = document.createElement("tr") as HTMLTableRowElement;
        headerRow.innerHTML = `
          <th>WishList ID</th>
          <th>Room ID</th>
          <th>User ID</th>
          <th>Price of Room</th>
          <th>From Date</th>
          <th>To Date</th>
          <th>Action</th>`;
        table.appendChild(headerRow);
        var flag = true;
        wishlists!.forEach((wishlist) => {
            for (let wish of availableWish!) {
                if (wishlist.wishListID == wish.wishListID) {
                    flag = true;
                    break;
                }
                else {
                    flag = false;
                }
            }
            if (flag == true) {
                const row = document.createElement("tr");
                row.innerHTML =
                    `<td>${wishlist.wishListID}</td>
                 <td>${wishlist.roomID}</td>
                 <td>${wishlist.userID}</td>
                 <td>${wishlist.priceOfRoom}</td>
                 <td>${new Date(wishlist.fromDate).toLocaleDateString()}</td>
                 <td>${new Date(wishlist.toDate).toLocaleDateString()}</td>
                <td><button id="borrowbtn" onclick="confirmBook(${wishlist.wishListID})">Confirm Booking</button>
                <button id="borrowbtn" onclick="removewishList(${wishlist.wishListID})">Remove</button>
                <button id="borrowbtn" onclick="editWishList(${wishlist.wishListID})">Edit</button></td>`;
                totalPrice += wishlist.priceOfRoom;
                table.appendChild(row);
                tableContainer.appendChild(table);
            }
            else {
                const row = document.createElement("tr");
                row.innerHTML =
                    `<td>${wishlist.wishListID}</td>
                 <td>${wishlist.roomID}</td>
                 <td>${wishlist.userID}</td>
                 <td>${wishlist.priceOfRoom}</td>
                 <td>${new Date(wishlist.fromDate).toLocaleDateString()}</td>
                 <td>${new Date(wishlist.toDate).toLocaleDateString()}</td>
                <td><button id="borrowbtn" onclick="confirmBook(${wishlist.wishListID})" disabled>Confirm Booking</button>
                <button id="borrowbtn" onclick="removewishList(${wishlist.wishListID})">Remove</button>
                <button id="editWishBtn" onclick="editWishList(${wishlist.wishListID})">Edit</button></td>`;
                table.appendChild(row);
                tableContainer.appendChild(table);
            }
        });
        container.appendChild(tableContainer);
        priceContainer.innerHTML = `
        <div>Total Price : ${totalPrice}</div>`;
        container.appendChild(priceContainer);
        bookAll.innerHTML = `<div><button id="bookAll" onclick="confirmBookAll()">Book All</button>`
        container.appendChild(bookAll);
    }
    function GetDateForm() {
        const existingForm = document.getElementById("editdateForm");
        if (existingForm) {
            existingForm.remove();
        }
        const form = document.createElement("form");
        form.id = "editdateForm";
        form.innerHTML = `       
        <label for="editfromDate">From Date:</label>      
        <input type="date" id="editfromDate" name="editfromDate"><br>
        <label for="edittoDate">To Date:</label>
        <input type="date" id="edittoDate" name="edittoDate"><br>
        <button class="btn" type="submit">Submit</button>
        `;
        container.appendChild(form);
    }

    let editingID: number = 0;
    async function editWishList(id: string) {
        var wishlist = await APICALLS.getWishList(parseInt(id));
        GetDateForm();
        const form = document.getElementById("editdateForm") as HTMLFormElement;
        if (wishlist) {
            editingID = Number(id);
            form.editfromDate.value = wishlist.fromDate;
            form.edittoDate.value = wishlist.toDate;
        }
    }

    document.addEventListener("submit", async (event) => {
        event.preventDefault();
        var wish = await APICALLS.getWishList(editingID);
        const form = event.target as HTMLFormElement;
        var room = await APICALLS.getIndividualRoom(wish!.roomID);

        var fromDateIp = new Date(form.editfromDate.value);
        var toDateIp = new Date(form.edittoDate.value);
        var days = Math.floor((toDateIp.getTime() - new Date(fromDateIp).getTime()) / (1000 * 60 * 60 * 24));

        const wishlist: WishList = { wishListID: editingID, userID: currentUser!.userID, roomID: room!.roomID, fromDate: fromDateIp, toDate: toDateIp, priceOfRoom: room!.pricePerDay * (days + 1) }
        await APICALLS.editwishListDetails(wishlist);
        alert("Edit to Your WishList successfully : " + wishlist.wishListID);
        createTable();
        const existingForm = document.getElementById("editdateForm");
        if (existingForm) {
            existingForm.remove();
        }
    });

    async function removewishList(id: number) {
        await APICALLS.deleteWishListDetail(id);
        alert("Removed wishlist ID " + id);
        totalPrice = 0;
        createTable();
    }

    async function confirmBookAll() {
        var wishlists = await APICALLS.fetchWishList(currentUser!.userID);
        var availableWish = await APICALLS.getAvailableWish();
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

        if (currentUser.amount < totalPrice) {
            alert("Insufficient balance");
            return;
        }
        const booking: BookingDetails = { bookingID: 0, userID: currentUser!.userID, totalPrice: totalPrice, dateOfBooking: new Date(), bookingStatus: bookingStatus[1] }
        var bookingId = await APICALLS.addNewBooking(booking, totalPrice, currentUser!.userID);

        for (let j = 0; j < wishlists!.length; j++) {
            let wishList = wishlists![j];
            for (let i = 0; i < availableWish!.length; i++) {
                let availablewishlist = availableWish![i];
                if (wishList.wishListID == availablewishlist.wishListID) {
                    var wish = await APICALLS.getWishList(wishList.wishListID)
                    var room = await APICALLS.getIndividualRoom(wish!.roomID);
                    var days = Math.floor(new Date(wishList.toDate).getTime() - new Date(wishList.fromDate).getTime()) / (1000 * 60 * 60 * 24);
                    const selection: RoomSelection = { selectionID: 0, wishListID: wishList.wishListID, bookingID: parseInt(bookingId), roomID: room!.roomID, stayingDateFrom: wishList.fromDate, stayingDateTo: wishList.toDate, numberOfDays: days, price: wishList.priceOfRoom, bookingStatus: bookingStatus[1] };
                    await APICALLS.addRoomSelection(selection);
                    removewishList(wishList.wishListID);
                }
            }
        }
        createTable();
        alert("Room Booked successfully with booking id " + bookingId);
    }

    async function confirmBook(wishlistId: string) {
        var wishlist = await APICALLS.getWishList(parseInt(wishlistId));
        var room = await APICALLS.getIndividualRoom(wishlist!.roomID);
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

        if (currentUser.amount < wishlist!.priceOfRoom) {
            alert("Insufficient balance");
            return;
        }
        var fromDateIp = wishlist!.fromDate;
        var toDateIp = wishlist!.toDate;
        var days = Math.floor((new Date(toDateIp).getTime() - new Date(fromDateIp).getTime()) / (1000 * 60 * 60 * 24));
        // var days = Math.floor((wishlist!.toDate).getTime() - (wishlist!.fromDate).getTime()) / (1000 * 60 * 60 * 24);

        const booking: BookingDetails = { bookingID: 0, userID: currentUser.userID, totalPrice: wishlist!.priceOfRoom, dateOfBooking: new Date(), bookingStatus: bookingStatus[1] }
        var bookingId = await APICALLS.addNewBooking(booking, wishlist!.priceOfRoom, currentUser.userID);
        const roomSelect: RoomSelection = {
            selectionID: 0, wishListID: parseInt(wishlistId), bookingID: parseInt(bookingId), roomID: room!.roomID,
            stayingDateFrom: wishlist!.fromDate, stayingDateTo: wishlist!.toDate, price: wishlist!.priceOfRoom, numberOfDays: days + 1, bookingStatus: bookingStatus[1]
        }
        // alert(orderID);
        await APICALLS.addRoomSelection(roomSelect);
        removewishList(parseInt(wishlistId));
        createTable();
        alert("Booking Confimed.Your Booking ID is" + bookingId);

    }

    (window as any).confirmBookAll = confirmBookAll;
    (window as any).confirmBook = confirmBook;
    // (window as any).confirmBook = confirmBook;
    (window as any).editWishList = editWishList;
    (window as any).removewishList = removewishList;

}



