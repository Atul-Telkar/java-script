document
  .getElementById("registerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (fullName == "") {
      alert("Full Name must be filled out");
      return false;
    }

    if (fullName.length > 10) {
      alert("Name must be no more than 10 characters long");
      return false;
    }

    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (email == "" || !emailPattern.test(email)) {
      alert("Please enter a valid email address");
      return false;
    }

    if (password == "") {
      alert("Password must be filled out");
      return false;
    }

    if (password.length < 4) {
      alert("Password must be at least 4 characters long");
      return false;
    }

    if (password.length > 8) {
      alert("Password must be no more than 8 characters long");
      return false;
    }

    if (confirmPassword == "") {
      alert("Confirm Password must be filled out");
      return false;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return false;
    }

    // Retrieve existing users from local storage
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    const emailExists = storedUsers.some((user) => user.email === email);
    if (emailExists) {
      alert("Email already exists. Please use a different email address.");
      return false;
    }

    // Add new user to the list
    storedUsers.push({ fullName, email, password });

    // Save updated user list to local storage
    localStorage.setItem("users", JSON.stringify(storedUsers));

    // Redirect to registration success page
    window.location.href = "RegisterSuccess.html";
  });
