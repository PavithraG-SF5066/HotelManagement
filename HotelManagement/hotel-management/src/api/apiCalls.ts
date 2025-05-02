import { Users, RoomDetails, BookingDetails,WishList, RoomSelection } from '../models/models';
let url = "http://localhost:5126/api/hotel";

export async function checkUser(email: string): Promise<boolean> {
    let apiURL = `${url}/usersController/${email}`;
    let response = await fetch(apiURL);
    if (!response.ok) {
        return false;
    }
    return await response.json();
}

export async function login(email: string, password: string): Promise<boolean> {
    const response = await fetch(`${url}/auth/login`, {
        method: "POST",
        credentials: "include", // <--- Important!
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
        return false;
    }
    return response.ok;

}

export async function isAuthenticated(): Promise<any> {
    try {
        const response = await fetch(`${url}/auth/me`, {
            method: "GET",
            credentials: "include", // Ensure cookies are sent with the request
        });

        if (response.ok) {
            const data = await response.json();
            return {
                success: true,
                email: data.email,
                name:data.name
            };
        }

        return { success: false }; // If not authenticated, return false
    } catch (error) {
        //console.error("Error fetching user credentials:", error);
        return { success: false }; // Return false in case of an error
    }
}

export function logout(): Promise<void> {
    return fetch(`${url}/auth/logout`, {
        method: "POST",
        credentials: "include",
    }).then(() => { });
}

export async function addNewUser(user: Users): Promise<string> {
    let apiURL = `${url}/usersController/newUser/${user}`;
    let response = await fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    if (!response.ok) {
        throw new Error("Fail to add data");
    }
    return await response.text();
}


export async function getIndividualUser(mailID: string): Promise<Users | null> {
    let apiURL = `${url}/usersController/${mailID}`;
    let response = await fetch(apiURL);
    if (!response.ok) {
        return null;
    }
    //returns true if the customer is already exist
    return await response.json();
}

export async function RrchargeWalletBalance(userID: number, amount: number): Promise<void> {
    let apiURL = `${url}/usersController/recharge/${userID}/${amount}`;
    let response = await fetch(apiURL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error("Fail to update data");
    }
}

export async function fetchRooms(): Promise<RoomDetails[]> {
    let apiURL = `${url}/roomdetailscontroller/rooms`;
    let response = await fetch(apiURL);
    if (!response.ok) {
        throw new Error("Fail to fetch data");
    }
    return await response.json();
}

export async function getIndividualRoom(roomId: number): Promise<RoomDetails | null> {
    let apiURL = `${url}/roomdetailscontroller/get/room/${roomId}`;
    let response = await fetch(apiURL);
    if (!response.ok) {
        return null;
    }
    //returns medicine
    return await response.json();
}

export async function addNewRoom(room: RoomDetails): Promise<string> {
    let apiURL = `${url}/roomdetailscontroller/add/newRoom`;
    let response = await fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(room)
    });

    if (!response.ok) {
        throw new Error("Fail to add data");
    }
    return await response.text();
}

// export async function checkProductExist(productName: string): Promise<boolean> {
//     let apiURL = `${url}/bookdetailscontroller/product/${productName}`;
//     let response = await fetch(apiURL);
//     if (!response.ok) {
//         throw new Error("Fail to fetch data");
//     }
//     //returns true if the medicine is already exist
//     return await response.json();
// }

export async function editRoomDetail(room: RoomDetails): Promise<void> {
    let apiURL = `${url}/roomdetailscontroller/new/room/edit`;
    let response = await fetch(apiURL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(room)
    });
    if (!response.ok) {
        throw new Error("Fail to update data");
    }
}

export async function deleteRoomDetail(roomID: number): Promise<void> {

    const response = await fetch(`${url}/roomdetailscontroller/delete/${roomID}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete contact');
    }
}
export async function addWhisList(wishlist: WishList): Promise<string> {
    let apiURL = `${url}/wishlistcontroller/add/newwishlist`;
    let response = await fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(wishlist)
    });

    if (!response.ok) {
        throw new Error("Fail to add data");
    }
    return await response.text();
}
export async function getAvailableWish(): Promise<WishList[] | null> {
    let apiURL = `${url}/wishlistcontroller/get/available/wislists`;
    let response = await fetch(apiURL);
    if (!response.ok) {
        return null;
    }
    return await response.json();
}

export async function fetchWishList(userID : number): Promise<WishList[] | null> {
    let apiURL = `${url}/wishlistcontroller/get/wishlit/${userID}`;
    let response = await fetch(apiURL);
    if (!response.ok) {
        return null;
    }
    return await response.json();
}
export async function getWishList(wishlist : number): Promise<WishList | null> {
    let apiURL = `${url}/wishlistcontroller/get/individualwishlit/${wishlist}`;
    let response = await fetch(apiURL);
    if (!response.ok) {
        return null;
    }
    return await response.json();
}
export async function editwishListDetails(wishlist: WishList): Promise<void> {
    let apiURL = `${url}/wishlistcontroller/wishlist/edit`;
    let response = await fetch(apiURL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(wishlist)
    });
    if (!response.ok) {
        throw new Error("Fail to update data");
    }
}
export async function deleteWishListDetail(roomID: number): Promise<void> {

    const response = await fetch(`${url}/wishlistcontroller/delete/${roomID}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete contact');
    }
}
export async function fetchRoomSelection(): Promise<RoomSelection[] | null> {
    let apiURL = `${url}/roomselectioncontroller/roomselection`;
    let response = await fetch(apiURL);
    if (!response.ok) {
        return null;
    }
    return await response.json();
}
export async function addRoomSelection(roomSelect: RoomSelection): Promise<string> {
    let apiURL = `${url}/roomselectioncontroller/add/roomSelection`;
    let response = await fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(roomSelect)
    });

    if (!response.ok) {
        throw new Error("Fail to add data");
    }
    return await response.text();
}
export async function getBookings(): Promise<BookingDetails[] | null> {
    let apiURL = `${url}/bookingdetailscontroller/bookings`;
    let response = await fetch(apiURL);
    if (!response.ok) {
        return null;
    }
    return await response.json();
}
export async function addNewBooking(booking: BookingDetails,totalPrice: number,userID:number): Promise<string> {
    let apiURL = `${url}/bookingdetailscontroller/add/newBooking/${totalPrice}/${userID}`;
    let response = await fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(booking)
    });

    if (!response.ok) {
        throw new Error("Fail to add data");
    }
    return await response.text();
}
export async function getIndividualBooking(bookingID: number): Promise<BookingDetails | null> {
    let apiURL = `${url}/bookingdetailscontroller/get/booking/${bookingID}`;
    let response = await fetch(apiURL);
    if (!response.ok) {
        throw new Error("Fail to fetch data");
    }
    
    return await response.json();
}
export async function cancelBook(bookingID: number): Promise<void> {
    let apiURL = `${url}/bookingdetailscontroller/cancel/booking/${bookingID}`;
    let response = await fetch(apiURL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error("Fail to update data");
    }
}

export async function addNewBorrow(userID: number, bookID: number): Promise<string> {
    let apiURL = `${url}/borrowDetailsController/add/newBorrow/${userID}/${bookID}`;
    let response = await fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error("Fail to add data");
    }
    return await response.text();
}