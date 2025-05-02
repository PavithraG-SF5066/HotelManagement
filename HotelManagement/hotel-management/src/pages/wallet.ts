import * as APICALLS from '../api/apiCalls';

export async function renderWallet(container: HTMLElement) {
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
  container.innerHTML = `
    <h2>Your balance is: $<span id="balance">${currentUser.amount}</span></h2><br><br>
    <h1>Recharge your wallet</h1>
    <span>
      <input type="number" placeholder="Enter the Amount" id="amount" required>
      <button id="deposit">Deposit</button>
    </span><br><br>
  `;

  requestAnimationFrame(() => {
    const depositBtn = document.getElementById("deposit");
    const amountInput = document.getElementById("amount") as HTMLInputElement;
    const balanceDisplay = document.getElementById("balance");

    depositBtn!.addEventListener("click", async () => {
      const amount = Number(amountInput.value);
      if (!amount || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
      }

      if (currentUser) {
        await APICALLS.RrchargeWalletBalance(currentUser.userID,amount);
        var currentUser1 = await APICALLS.getIndividualUser(user.email);
        alert("Deposit successful. New balance: $" + currentUser1!.amount);
        balanceDisplay!.textContent = String(currentUser1!.amount);
        amountInput.value = "";
      }
    });
  });
}
