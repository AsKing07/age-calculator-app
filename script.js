// When the form is submitted
document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const showErrorForm = document.getElementById("errorForm");
  showErrorForm.innerHTML = "";

  const day = parseInt(document.getElementById("dob_day").value);
  const month = parseInt(document.getElementById("dob_month").value);
  const year = parseInt(document.getElementById("dob_year").value);

  const dateComponents = [
    {
      inputId: "dob_day",
      errorId: "errorDay",
      min: 1,
      max: 31,
      errorMessage: "Must be between 1 and 31 days",
    },
    {
      inputId: "dob_month",
      errorId: "errorMonth",
      min: 1,
      max: 12,
      errorMessage: "Must be between 1 and 12 months",
    },
    {
      inputId: "dob_year",
      errorId: "errorYear",
      min: undefined,
      max: new Date().getFullYear(),
      errorMessage: "Must be in the past",
    },
  ];

  let isError;
   dateComponents.forEach((component) => {
    const inputElement = document.getElementById(component.inputId);
    const errorElement = document.getElementById(component.errorId);

    if (isNaN(parseInt(inputElement.value))) {
      showError("This field is required", errorElement, inputElement);
      isError = true;
      return
    } else {
      inputElement.classList.remove("inputError");
      errorElement.classList.add("notDisplay");
    }

    if (
      (component.min && inputElement.value < component.min) ||
      inputElement.value > component.max
    ) {
      showError(component.errorMessage, errorElement, inputElement);
      isError = true;
      return;
    }
    isError = false;
  });
  console.log(isError)

  if(isError)
  {
    return;
  }

  if (!validateDate(day, month, year)) {
    document.getElementById("dob_day").classList.add("inputError");
    document.getElementById("dob_month").classList.add("inputError");
    document.getElementById("dob_year").classList.add("inputError");

    showErrorForm.innerHTML = "Must be a valid date";
    showErrorForm.classList.remove("notDisplay");
    return;
  }
  else
  {
    const age = calcultAge(month + "/" + day + "/" + year);
    showAge(age);
  }


});

function showError(message, errorElement, inputElement) {
  errorElement.innerHTML = message;
  errorElement.classList.remove("notDisplay");
  inputElement.classList.add("inputError");
}

// Function for verify a date

function validateDate(day, month, year) {
  const monthsWith31Days = [1, 3, 5, 7, 8, 10, 12];
  const monthsWith30Days = [4, 6, 9, 11];

  if (
    day < 1 ||
    day > 31 ||
    month < 1 ||
    month > 12 ||
    year > new Date().getFullYear()
  ) {
    return false;
  }

  const givenDate = new Date(year, month - 1, day);
  const now = new Date();
  if (givenDate > now) {
    return false;
  }

  if (
    (month === 2 && (day > 29 || (day === 29 && !isLeapYear(year)))) ||
    (monthsWith31Days.includes(month) && day > 31) ||
    (monthsWith30Days.includes(month) && day > 30)
  ) {
    return false;
  }

  return true;
}

// function for verify if it's a leap  year or not
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

//Function for calculate age
//dob = date of birth
function calcultAge(dob) {
  const dobObj = new Date(dob);
  const now = new Date();

  let age = now.getFullYear() - dobObj.getFullYear();
  let months = now.getMonth() - dobObj.getMonth();
  let days = now.getDate() - dobObj.getDate();

  if (months < 0 || (months === 0 && days < 0)) {
    age--;
    months = now.getMonth() + 12 - dobObj.getMonth();
  }

  if (days < 0) {
    const lastDayPrecedentMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      0
    ).getDate();
    days += lastDayPrecedentMonth;
    months--;
  }

  return {
    year: Math.floor(age),
    months: Math.floor(months),
    days: Math.floor(days),
  };
}

//Function to show age
function showAge(age) {
  const showYear = document.getElementById("yearResult");
  const showMonth = document.getElementById("monthResult");
  const showDay = document.getElementById("dayResult");

  animateNumber(showYear, age.year);
  animateNumber(showMonth, age.months);
  animateNumber(showDay, age.days);
}

function animateNumber(element, target) {
  let current = 0;
  if (target === 0) {
    element.textContent = current < 10 ? `0${current}` : current;
  } else {
    const interval = setInterval(() => {
      current++;
      element.textContent = current < 10 ? `0${current}` : current;
      if (current === target) {
        clearInterval(interval);
      }
    }, 100);
  }
}
