import { RoomDetails } from '../models/models';
import * as APICALLS from '../api/apiCalls';

export function renderRooms(container: HTMLElement) {
    container.innerHTML = `<h2>Rooms</h2> <button id="addRoomBtn">Add Room</button>`;
    const tableContainer = document.createElement("span");
    createTable();
    async function createTable() {
        var rooms = await APICALLS.fetchRooms();

        tableContainer.innerHTML = "";
        const table = document.createElement("table");
        table.border = "1";
        table.style.borderCollapse = "collapse";
        table.style.width = "100%";

        const headerRow = document.createElement("tr");
        headerRow.innerHTML = `
            <th>Room ID</th>
            <th>Room Type</th>
            <th>Number Of Beds</th>
            <th>Price Per Day</th>
            <th>Action</th>`;
        table.appendChild(headerRow);


        rooms.forEach((room) => {
            const row = document.createElement("tr");
            row.innerHTML = `
      <td>${room.roomID}</td>
      <td>${room.roomType}</td>
      <td>${room.numberOfBeds}</td>
      <td>${room.pricePerDay}</td>
      <td>
        <button onclick="editRoom('${room.roomID}')">Edit</button>
        <button onclick="deleteRoom('${room.roomID}')">Delete</button>
      </td>`;
            table.appendChild(row);
        });

        tableContainer.appendChild(table);
        container.appendChild(tableContainer);
    }
    function addEditRoomsForm() {
        const existingForm = document.getElementById("roomForm");
        if (existingForm) {
            existingForm.remove();
        }
        const form = document.createElement("form");
        form.id = "roomForm";
        form.innerHTML = `       
        <label for="roomType">Room Type:</label>      
        <select id="roomType">
            <option value="Select">Select</option>
            <option value="Standard">Standard</option>
            <option value="Delux">Delux</option>
            <option value="Suit">Suit</option>
        </select><br>
        <label for="noOfBeds">Number of Beds:</label>
        <input type="text" id="noOfBeds" name="noOfBeds"><br>
        <label for="price">Price Per Day:</label>
        <input type="text" id="price" name="price"><br>
        <button class="btn" type="submit">Save</button>
        `;
        container.appendChild(form);
    }

    // Attach listeners AFTER table is in the DOM
    let editingID: number = 0;
    async function editRoom(id: string) {
        // alert("Editing " + id);
        addEditRoomsForm();
        // Populate form with existing data for editing
        const form = document.getElementById("roomForm") as HTMLFormElement;
        const room = await APICALLS.getIndividualRoom(parseInt(id));
        if (room) {
            editingID = Number(id);
            form.roomType.value = room.roomType;
            form.noOfBeds.value = room.numberOfBeds;
            form.price.value = room.pricePerDay;
        }
    }

    document.addEventListener("submit", async (event) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        if (editingID > 0) {
            const room: RoomDetails = {
                roomID: editingID,
                roomType: form.roomType.value,
                numberOfBeds: form.noOfBeds.value,
                pricePerDay: form.price.value,
            };
            await APICALLS.editRoomDetail(room);
            alert("Updated Room successfully : " + room.roomID);
        } else {
            const room: RoomDetails = {
                roomID: 0, roomType: form.roomType.value, numberOfBeds: form.noOfBeds.value, pricePerDay: form.price.value
            };
            await APICALLS.addNewRoom(room);
            alert("Added Room successfully : " + room.roomID);
        }
        createTable();
        form.reset();
        editingID = 0;
        const existingForm = document.getElementById("roomForm");
        if (existingForm) {
            existingForm.remove();
        }
    });

    const addBtn = container.querySelector("#addRoomBtn") as HTMLButtonElement;
    addBtn?.addEventListener("click", () => {
        alert("Add Room");
        addEditRoomsForm(); // make sure this function exists and is imported
    });

    async function deleteRoom(id: string) {
        await APICALLS.deleteRoomDetail(parseInt(id));
        alert("Deleted " + id);
        createTable();
    }
    // Expose to window object
    (window as any).editRoom = editRoom;
    (window as any).deleteRoom = deleteRoom;
}