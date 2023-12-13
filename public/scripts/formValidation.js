// formValidation.js

function validateForm(formId) {
  var email = document.getElementById("email").value;
  var password = document.getElementById("passwd").value;
  var isValid = true;

  // Reset previous error messages
  document.getElementById("emailError").textContent = "";
  document.getElementById("passwordError").textContent = "";
  var confirmPasswordError = document.getElementById("confirmPasswordError");
  if (confirmPasswordError) confirmPasswordError.textContent = "";

  // Email validation
  if (!email.match(/^\S+@\S+\.\S+$/)) {
    document.getElementById("emailError").textContent =
      "Please enter a valid email address.";
    isValid = false;
  }

  // Password validation
  if (password.length < 6) {
    document.getElementById("passwordError").textContent =
      "Password must be at least 6 characters.";
    isValid = false;
  }

  // Confirm Password validation for account creation form
  if (formId === "accountCreationForm") {
    var confirmPassword = document.getElementById("re-passwd").value;
    if (password !== confirmPassword) {
      if (confirmPasswordError)
        confirmPasswordError.textContent = "Passwords do not match.";
      isValid = false;
    }
  }

  return isValid;
}

document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("accountCreationForm");
  var currentPort = window.location.port || "80"; // Default to port 80 if no port is specified
  form.action =
    "http://" +
    window.location.hostname +
    ":" +
    currentPort +
    "/create_account";
});