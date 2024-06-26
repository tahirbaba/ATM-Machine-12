#! usr/bin/env node

let balance: number = 1000;  // Initial balance
let pinCode: string = "1234";  // Default PIN
let isAuthenticated: boolean = false;

function insertCard(): void {
  displayMessage("Card inserted. Please enter your PIN.");
  showElement("pinInput");
  hideElement("amountInput");
}

function checkPIN(): void {
  const pinInput = document.getElementById("pinInput") as HTMLInputElement;
  if (pinInput.value === pinCode) {
    isAuthenticated = true;
    displayMessage("PIN accepted. You can now use the ATM.");
    hideElement("pinInput");
    showElement("amountInput");
  } else {
    displayMessage("Incorrect PIN. Please try again.");
  }
}

function withdrawMoney(): void {
  if (isAuthenticated) {
    const amountInput = document.getElementById("amountInput") as HTMLInputElement;
    let amount = parseFloat(amountInput.value);
    if (amount <= balance && amount > 0) {
      balance -= amount;
      displayMessage(`You have withdrawn $${amount}. New balance: $${balance}.`);
    } else {
      displayMessage("Insufficient balance or invalid amount.");
    }
    amountInput.value = '';  // Clear the amount input after transaction
  } else {
    displayMessage("Please insert your card and enter your PIN.");
  }
}

function depositMoney(): void {
  if (isAuthenticated) {
    const amountInput = document.getElementById("amountInput") as HTMLInputElement;
    let amount = parseFloat(amountInput.value);
    if (amount > 0) {
      balance += amount;
      displayMessage(`You have deposited $${amount}. New balance: $${balance}.`);
    } else {
      displayMessage("Invalid amount.");
    }
    amountInput.value = '';  // Clear the amount input after transaction
  } else {
    displayMessage("Please insert your card and enter your PIN.");
  }
}

function checkBalance(): void {
  if (isAuthenticated) {
    displayMessage(`Your current balance is $${balance}.`);
  } else {
    displayMessage("Please insert your card and enter your PIN.");
  }
}

function logout(): void {
  isAuthenticated = false;
  displayMessage("You have logged out. Please insert your card.");
  hideElement("amountInput");
  showElement("pinInput");
  const pinInput = document.getElementById("pinInput") as HTMLInputElement;
  pinInput.value = '';  // Clear the PIN input after logout
}

function displayMessage(message: string): void {
  const messageElement = document.getElementById("message");
  if (messageElement) {
    messageElement.textContent = message;
  }
}

function showElement(id: string): void {
  const element = document.getElementById(id);
  if (element) {
    element.style.display = "block";
  }
}

function hideElement(id: string): void {
  const element = document.getElementById(id);
  if (element) {
    element.style.display = "none";
  }
}

// Ensure that the functions are available in the global scope
(window as any).insertCard = insertCard;
(window as any).checkPIN = checkPIN;
(window as any).withdrawMoney = withdrawMoney;
(window as any).depositMoney = depositMoney;
(window as any).checkBalance = checkBalance;
(window as any).logout = logout;
