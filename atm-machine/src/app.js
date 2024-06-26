"use strict";
var balance = 1000; // Initial balance
var pinCode = "1234"; // Default PIN
var isAuthenticated = false;
function insertCard() {
    displayMessage("Card inserted. Please enter your PIN.");
    showElement("pinInput");
    hideElement("amountInput");
}
function checkPIN() {
    var pinInput = document.getElementById("pinInput");
    if (pinInput.value === pinCode) {
        isAuthenticated = true;
        displayMessage("PIN accepted. You can now use the ATM.");
        hideElement("pinInput");
        showElement("amountInput");
    }
    else {
        displayMessage("Incorrect PIN. Please try again.");
    }
}
function withdrawMoney() {
    if (isAuthenticated) {
        var amountInput = document.getElementById("amountInput");
        var amount = parseFloat(amountInput.value);
        if (amount <= balance && amount > 0) {
            balance -= amount;
            displayMessage("You have withdrawn $".concat(amount, ". New balance: $").concat(balance, "."));
        }
        else {
            displayMessage("Insufficient balance or invalid amount.");
        }
        amountInput.value = ''; // Clear the amount input after transaction
    }
    else {
        displayMessage("Please insert your card and enter your PIN.");
    }
}
function depositMoney() {
    if (isAuthenticated) {
        var amountInput = document.getElementById("amountInput");
        var amount = parseFloat(amountInput.value);
        if (amount > 0) {
            balance += amount;
            displayMessage("You have deposited $".concat(amount, ". New balance: $").concat(balance, "."));
        }
        else {
            displayMessage("Invalid amount.");
        }
        amountInput.value = ''; // Clear the amount input after transaction
    }
    else {
        displayMessage("Please insert your card and enter your PIN.");
    }
}
function checkBalance() {
    if (isAuthenticated) {
        displayMessage("Your current balance is $".concat(balance, "."));
    }
    else {
        displayMessage("Please insert your card and enter your PIN.");
    }
}
function logout() {
    isAuthenticated = false;
    displayMessage("You have logged out. Please insert your card.");
    hideElement("amountInput");
    showElement("pinInput");
    var pinInput = document.getElementById("pinInput");
    pinInput.value = ''; // Clear the PIN input after logout
}
function displayMessage(message) {
    var messageElement = document.getElementById("message");
    if (messageElement) {
        messageElement.textContent = message;
    }
}
function showElement(id) {
    var element = document.getElementById(id);
    if (element) {
        element.style.display = "block";
    }
}
function hideElement(id) {
    var element = document.getElementById(id);
    if (element) {
        element.style.display = "none";
    }
}
// Ensure that the functions are available in the global scope
window.insertCard = insertCard;
window.checkPIN = checkPIN;
window.withdrawMoney = withdrawMoney;
window.depositMoney = depositMoney;
window.checkBalance = checkBalance;
window.logout = logout;
