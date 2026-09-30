// DOM elements
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

const nameError = document.querySelector("#name-error");
const numberError = document.querySelector("#number-error");
const dateError = document.querySelector("#date-error");
const cvcError = document.querySelector("#cvc-error");

const formSection = document.querySelector(".form-section");
const successSection = document.querySelector(".success-section");
const continueButton = document.querySelector(".continue-button");

// Restores the card preview to its default values
function resetCardDisplay() {
  nameDisplay.textContent = "Jane Appleseed";
  numberDisplay.textContent = "0000 0000 0000 0000";
  dateDisplay.textContent = "00/00";
  cvcDisplay.textContent = "000";
}

// Updates the expiration date preview
function updateDate() {
  const month = monthInput.value === "" ? "00" : monthInput.value;
  const year = yearInput.value === "" ? "00" : yearInput.value;

  dateDisplay.textContent = `${month}/${year}`;
}

// Displays an error message and highlights the input
function showError(input, errorElement, message) {
  errorElement.textContent = message;
  input.classList.add("error");
}

// Clears an input error
function clearError(input, errorElement) {
  errorElement.textContent = "";
  input.classList.remove("error");
}

// Updates the cardholder name preview
nameInput.addEventListener("input", (e) => {
  const inputValor = e.target.value.trim();

  nameDisplay.textContent =
    inputValor === "" ? "Jane Appleseed" : e.target.value;
});

// Keeps only 16 digits and formats them in groups of four
numberInput.addEventListener("input", (e) => {
  const value = e.target.value.replace(/\D/g, "").slice(0, 16);
  const formattedNumber = value.replace(/(\d{4})(?=\d)/g, "$1 ");

  e.target.value = formattedNumber;

  numberDisplay.textContent =
    value === "" ? "0000 0000 0000 0000" : formattedNumber;
});

// Keeps only two digits for the expiration month
monthInput.addEventListener("input", (e) => {
  const value = e.target.value.replace(/\D/g, "").slice(0, 2);

  e.target.value = value;
  updateDate();
});

// Keeps only two digits for the expiration year
yearInput.addEventListener("input", (e) => {
  const value = e.target.value.replace(/\D/g, "").slice(0, 2);

  e.target.value = value;
  updateDate();
});

// Keeps only three digits and updates the CVC preview
cvcInput.addEventListener("input", (e) => {
  const cvc = e.target.value.replace(/\D/g, "").slice(0, 3);

  e.target.value = cvc;
  cvcDisplay.textContent = cvc === "" ? "000" : cvc;
});

// Validates the form before showing the success state
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let isValid = true;

  // Values used for validation
  const nameValue = nameInput.value.trim();
  const numberValue = numberInput.value.replace(/\D/g, "");
  const monthValue = monthInput.value.replace(/\D/g, "");
  const yearValue = yearInput.value.replace(/\D/g, "");
  const cvcValue = cvcInput.value.replace(/\D/g, "");

  // Name validation
  if (nameValue === "") {
    showError(nameInput, nameError, "Can't be blank");
    isValid = false;
  } else {
    clearError(nameInput, nameError);
  }

  // Card number validation
  if (numberValue.length !== 16) {
    showError(numberInput, numberError, "Wrong format, numbers only");
    isValid = false;
  } else {
    clearError(numberInput, numberError);
  }

  // Expiration date validation
  if (monthValue === "" || yearValue === "") {
    dateError.textContent = "Can't be blank";

    if (monthValue === "") {
      monthInput.classList.add("error");
    } else {
      monthInput.classList.remove("error");
    }

    if (yearValue === "") {
      yearInput.classList.add("error");
    } else {
      yearInput.classList.remove("error");
    }

    isValid = false;
  } else {
    dateError.textContent = "";
    monthInput.classList.remove("error");
    yearInput.classList.remove("error");
  }

  // CVC validation
  if (cvcValue.length !== 3) {
    showError(cvcInput, cvcError, "Can't be blank");
    isValid = false;
  } else {
    clearError(cvcInput, cvcError);
  }

  // Shows the success state when all fields are valid
  if (isValid) {
    formSection.classList.add("hidden");
    successSection.classList.add("active");
  }
});

// Returns to the form and resets the card
continueButton.addEventListener("click", () => {
  successSection.classList.remove("active");
  formSection.classList.remove("hidden");

  form.reset();
  resetCardDisplay();
});
