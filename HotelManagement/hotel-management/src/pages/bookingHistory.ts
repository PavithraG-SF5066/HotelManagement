import { bookingStatus } from '../models/models';
import * as APICALLS from '../api/apiCalls';

export async function renderBookingHistory(container: HTMLElement) {
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

  container.innerHTML = `<h2>Your Booking History</h2>`;
  const tableContainer = document.createElement("span");
  createTable();
  async function createTable() {
    var bookings = await APICALLS.getBookings();
    tableContainer.innerHTML = "";
    const table = document.createElement("table");
    table.border = "1";
    table.style.borderCollapse = "collapse";
    table.style.width = "100%";

    var headerRow = document.createElement("tr") as HTMLTableRowElement;
    headerRow.innerHTML = `
       <th>Booking ID</th>
          <th>User ID</th>
          <th>Book Id</th>
          <th>TotalPrice</th>
          <th>Date Of Booking</th>
          <th>Booking Status</th>`;
          
    table.appendChild(headerRow);

    bookings!.forEach((booking) => {
      if (booking.userID == currentUser!.userID) {
        // alert(borrow.borrowDate);
        var row = document.createElement("tr") as HTMLTableRowElement;
        row.innerHTML = `
        <td>${booking.bookingID}</td> 
        <td>${booking.userID}</td> 
        <td>${booking.totalPrice}</td> 
        <td>${new Date(booking.dateOfBooking).toLocaleDateString()}</td> 
        <td>${booking.bookingStatus}</td> 
        <td><button onclick="cancelBooking(${booking.bookingID})">Cancell</button></td>`;
        table.appendChild(row);
      }
    })
    tableContainer.appendChild(table);
  }
  container.appendChild(tableContainer);

  async function cancelBooking(bookingId: number) {
    var confirmation = confirm("Are you sure you want to Cancel this Booking?");
    if (!confirmation) {
      return;
    }
    var booking = await APICALLS.getIndividualBooking(bookingId);
    if (booking == null) {
      alert("Booking Detail not found");
      return;
    }
    if (booking!.bookingStatus != bookingStatus[1]) {
      alert("Booking  already Cancelled");
      return;
    }
    else
    {
      await APICALLS.cancelBook(bookingId);
      alert("Booking cancelled successfully");
      createTable();
    }

    // borrow.paidFineAmount = fineAmount;
   
  }
  (window as any).cancelBooking = cancelBooking;
}