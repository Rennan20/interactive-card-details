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
const formSection = document.querySelector(".form-section");
const successSection = document.querySelector(".success-section");
const continueButton = document.querySelector(".continue-button");
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
  let isValid = true;

  const nameValue = nameInput.value.trim();
  const numberValue = numberInput.value.replace(/\D/g, "");
  const monthValue = monthInput.value.replace(/\D/g, "");
  const yearValue = yearInput.value.replace(/\D/g, "");
  const cvcValue = cvcInput.value.replace(/\D/g, "");

  if (nameValue === "") {
    nameError.textContent = "Can't be blank";
    nameInput.classList.add("error");
    isValid = false;
  } else {
    nameError.textContent = "";
    nameInput.classList.remove("error");
  }
  if (numberValue.length !== 16) {
    numberError.textContent = "Wrong format, numbers only";
    numberInput.classList.add("error");
    isValid = false;
  } else {
    numberError.textContent = "";
    numberInput.classList.remove("error");
  }
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
  if (cvcValue.length !== 3) {
    cvcError.textContent = "Can't be blank";
    cvcInput.classList.add("error");
    isValid = false;
  } else {
    cvcError.textContent = "";
    cvcInput.classList.remove("error");
  }
  if (isValid) {
    formSection.classList.add("hidden");
    successSection.classList.add("active");
  }
});

continueButton.addEventListener("click", () => {
  successSection.classList.remove("active");
  formSection.classList.remove("hidden");

  form.reset();
  nameDisplay.textContent = "Jane Appleseed";
  numberDisplay.textContent = "0000 0000 0000 0000";
  dateDisplay.textContent = `00/00`;
  cvcDisplay.textContent = "000";
});
