const nameInput = document.querySelector("#cardholder-name");
const nameDisplay = document.querySelector(".card-name-display");
const numberInput = document.querySelector("#card-number");
const numberDisplay = document.querySelector(".card-number-display");
const monthInput = document.querySelector("#expiry-month");
const yearInput = document.querySelector("#expiry-year");
const dateDisplay = document.querySelector(".card-date-display");
const cvcInput = document.querySelector("#card-cvc");
const cvcDisplay = document.querySelector(".card-cvc-display");
const form = document.querySelector("form");
const submitButton = document.querySelector(".submit-button");
const nameError = document.querySelector("#name-error");
const numberError = document.querySelector("#number-error");
const dateError = document.querySelector("#date-error");
const cvcError = document.querySelector("#cvc-error");
nameInput.addEventListener("input", (e) => {
  const valorInput = e.target.value.trim();
  nameDisplay.textContent =
    valorInput === "" ? "Jane Appleseed" : e.target.value;
});

numberInput.addEventListener("input", (e) => {
  const value = e.target.value.replace(/\D/g, "").slice(0, 16);
  const formattedNumber = value.replace(/(\d{4})(?=\d)/g, "$1 ");
  e.target.value = formattedNumber;

  numberDisplay.textContent =
    value === "" ? "0000 0000 0000 0000" : formattedNumber;
});

function updateDate() {
  const month = monthInput.value === "" ? "00" : monthInput.value;

  const year = yearInput.value === "" ? "00" : yearInput.value;

  dateDisplay.textContent = `${month}/${year}`;
}

monthInput.addEventListener("input", (e) => {
  const value = e.target.value.replace(/\D/g, "").slice(0, 2);
  e.target.value = value;

  updateDate();
});

yearInput.addEventListener("input", (e) => {
  const value = e.target.value.replace(/\D/g, "").slice(0, 2);
  e.target.value = value;

  updateDate();
});

cvcInput.addEventListener("input", (e) => {
  const cvc = e.target.value.replace(/\D/g, "").slice(0, 3);
  e.target.value = cvc;
  cvcDisplay.textContent = cvc === "" ? "000" : cvc;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nameValue = nameInput.value.trim();
  const numberValue = numberInput.value.replace(/\D/g, "");
  const monthValue = monthInput.value.replace(/\D/g, "");
  const yearValue = yearInput.value.replace(/\D/g, "");
  const cvcValue = cvcInput.value.replace(/\D/g, "");

  if (nameValue === "") {
    nameError.textContent = "Can't be blank";
    nameInput.classList.add("error");
  } else {
    nameError.display = none;

    nameInput.classList.remove("error");
  }
});
