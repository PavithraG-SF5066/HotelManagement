import * as APICALLS from '../api/apiCalls';


export async function renderUser(container: HTMLElement) {
  var user = await APICALLS.isAuthenticated();
  var userDetails= await APICALLS.getIndividualUser(user.email)
  container.innerHTML=`<h2> User Information</h2>`;
  const divContainer = document.createElement("div");
  divContainer.innerHTML=`
  <div><img src="/images/tomato.jpg"></div>
    <div>Name : ${userDetails?.name}</div>
    <div>User ID : ${userDetails?.userID}</div>
    <div>Email : ${userDetails?.email}</div>
    <div>Address : ${userDetails?.address}</div>
    <div>Phone Number : ${userDetails?.userPhoneNumber}</div>
    <div>Aadhar Number : ${userDetails?.aadharNumber}</div>
    <div>Gender : ${userDetails?.gender} </div>
    <div>Food Type : ${userDetails?.foodType}</div>`
    container.append(divContainer);
  }