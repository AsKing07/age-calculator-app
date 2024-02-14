// Fonction pour calculer l'âge exact à partir de la date de naissance
//dob = date of birth
function calcultAge(dob) {
    const dobObj = new Date(dob);
    const now = new Date();

    let age = now.getFullYear() - dobObj.getFullYear();
    let month = now.getMonth() - dobObj.getMonth();
    let days = now.getDate() - dobObj.getDate();

    if (month < 0 || (month === 0 && days < 0)) {
        age--;
        month < 0 ? month+=12 : month+=0
    }

    if (days < 0) {
        const lastDayPrecedentMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        console.log(lastDayPrecedentMonth)
        days += lastDayPrecedentMonth;
        month--;
    }


    return {
        year: age,
        months: month,
        days: days
    };
}

// Function for verify a date
function validateDate(day, month, year) {
    const monthsWith31Days = [1, 3, 5, 7, 8, 10, 12];
    const monthsWith30Days = [4, 6, 9, 11];

    // Vérify if day between 1 and 31
    if (day < 1 || day > 31) {
        return false;
    }

    // Vérify if month between 1 and 12
    if (month < 1 || month > 12) {
        return false;
    }

    // Vérify if year is not in the future
    const givenDate = new Date(year, month - 1, day);
    const now = new Date();
    if (givenDate > now) {
        return false;
    }

    // Check if the date is valid based on the number of days in the month
    if ((month === 2 && (day > 29
         || (month === 29 && !isLeapYear(year))
         )) ||
        (monthsWith31Days.includes(month) && day > 31) 
        ||
        (monthsWith30Days.includes(month) && day > 30)) 
        {
        return false;
    }

    return true;
}

// function for verify if it's a leap  year or not
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

//Function to show age
function showAge(age) {
    console.log("Âge exact : " + age.year + " ans, " + age.months + " mois et " + age.days + " jours");
    // Vous pouvez ici ajouter du code pour animer les numéros d'âge si vous le souhaitez
    const showYear = document.getElementById("yearResult")
    const showMonth = document.getElementById("monthResult")
    const showDay = document.getElementById("dayResult")

    showYear.textContent = parseInt(age.year);
    showMonth.textContent = parseInt(age.months);
    showDay.textContent = parseInt(age.days);
}

// When the form is submitted
document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();

    const showErrorYear = document.getElementById('errorYear')
    const showErrorMonth = document.getElementById('errorMonth')
    const showErrorDay = document.getElementById('errorDay')
    const showErrorForm = document.getElementById('errorForm')

    showErrorDay.classList.add('notDisplay')
    showErrorMonth.classList.add('notDisplay')
    showErrorYear.classList.add('notDisplay')
    showErrorForm.classList.add('notDisplay')


showErrorDay.innerHTML = ''
showErrorMonth.innerHTML = ''
showErrorYear.innerHTML = ''


    const day = parseInt(document.getElementById('dob_day').value);
    const month = parseInt(document.getElementById('dob_month').value);
    const year = parseInt(document.getElementById('dob_year').value);

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        document.getElementById('dob_day').classList.remove('inputError')
        document.getElementById('dob_month').classList.remove('inputError')
        document.getElementById('dob_year').classList.remove('inputError')
        if(isNaN(day))
        {
            showErrorDay.innerHTML = "This field is required";
            showErrorDay.classList.remove('notDisplay')
            document.getElementById('dob_day').classList.add('inputError')
        }
        
        if(isNaN(month))
        {
            
                showErrorMonth.innerHTML = "This field is required";
                showErrorMonth.classList.remove('notDisplay')
                document.getElementById('dob_month').classList.add('inputError')
            
        }

        if (isNaN(year))
        {
            showErrorYear.innerHTML = "This field is required";
            showErrorYear.classList.remove('notDisplay')
            document.getElementById('dob_year').classList.add('inputError')
        }
        return;
    }

    else
    {
        document.getElementById('dob_day').classList.remove('inputError')
        document.getElementById('dob_month').classList.remove('inputError')
        document.getElementById('dob_year').classList.remove('inputError')
    }

if(day<1 || day>31)
{
    showErrorDay.innerHTML = "Must be between 1 and 31 days";
            showErrorDay.classList.remove('notDisplay')
            document.getElementById('dob_day').classList.add('inputError')
}

if(month<1  || month>12)
{
    showErrorMonth.innerHTML = "Must be between 1 and 12 months";
    showErrorMonth.classList.remove('notDisplay')
    document.getElementById('dob_month').classList.add('inputError')
}

const nowYear = new Date().getFullYear();

console.log(nowYear)
console.log(year)
if(year > nowYear)
{
    showErrorYear.innerHTML = "Should not be in the futur";
    showErrorYear.classList.remove('notDisplay')
    document.getElementById('dob_year').classList.add('inputError')

}

    if (!validateDate(day, month, year)) {
        document.getElementById('dob_day').classList.add('inputError')
        document.getElementById('dob_month').classList.add('inputError')
        document.getElementById('dob_year').classList.add('inputError')

        showErrorForm.innerHTML='Must be a valid date'
        showErrorForm.classList.remove('notDisplay')
        return;
    }

    const age = calcultAge(year + ',' + month + ',' + day);
    showAge(age);
});
