let ageVerification = document.querySelector("#check-box"),
    formAgeVerification = document.querySelector("#form-age-validation"),
    ageValidation = document.querySelector(".age-validation"),
    successValidation = document.querySelector(".success-validation"),
    choiceValidation = localStorage.getItem("ageVerification"),
    validationContainer = document.querySelector(".age-validation-container"),
    loader = document.querySelector(".loader");

// Saving in storage
const hideVerification = () => {
    validationContainer.style.display = "none";
    loader.style.display = "flex";
    loader.style.height = "100vh";
    loader.innerHTML = '<div class="loader-spin"></div>';
    setTimeout(function () {
      successValidation.style.display = "block";
      loader.style.display = "none";
    }, 500);
  };
  
  //Validation of age
  
  formAgeVerification.addEventListener("submit", (e) => {
    e.preventDefault();
    choiceValidation = ageVerification.checked;
    if (ageVerification.checked === true) {
      loader.innerHTML = '<div class="loader-spin"></div>';
      setTimeout(function () {
        ageValidation.style.display = "none";
        successValidation.style.display = "block";
        localStorage.setItem("ageVerification", ageVerification.checked);
      }, 1000);
    }
    hideVerification();
  });
  
  if (!!choiceValidation) {
    hideVerification();
  }