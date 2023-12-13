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

document
  .getElementById("accountCreationForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    fetch("http://localhost:3000/createAccount", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((data) => {
        // handle successful response here
        console.log("Success:", data);
        // update the UI to show a success message
        document.getElementById("responseMessage").textContent =
          "Account created successfully!";
      })
      .catch((error) => {
        console.error("Error:", error);
        // update the UI to show an error message
        document.getElementById("responseMessage").textContent =
          "Error creating account. Please try again.";
      });
  });
