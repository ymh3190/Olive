const greetingForm = document.querySelector(".js-greeting-form"),
  greetingInput = greetingForm.querySelector("input"),
  greeting = document.querySelector(".js-greeting");

const USERNAME_LS = "username",
  SHOWING_UN = "showing";

function saveUserName(userName) {
  localStorage.setItem(USERNAME_LS, userName);
}

function paintUserName(userName) {
  greeting.classList.add(SHOWING_UN);
  greeting.innerText = `Hello, ${userName}.`;
}

function handleSubmit(event) {
  event.preventDefault();
  greetingForm.classList.remove(SHOWING_UN);
  const inputValue = greetingInput.value;
  saveUserName(inputValue);
  paintUserName(inputValue);
}

function askForUserName() {
  greetingForm.classList.add(SHOWING_UN);
  greetingForm.addEventListener("submit", handleSubmit);
}

function getUserName() {
  const userName = localStorage.getItem(USERNAME_LS);
  if (userName) {
    paintUserName(userName);
  } else {
    askForUserName();
  }
}

function init() {
  getUserName();
}

init();
