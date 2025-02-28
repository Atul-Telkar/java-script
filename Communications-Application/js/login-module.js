document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

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

    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (email == "" || !emailPattern.test(email)) {
      alert("Please enter a valid email address");
      return false;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const user = storedUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      sessionStorage.setItem("loggedIn", email);
      window.location.href = `Userlist.html?email=${encodeURIComponent(email)}`;
    } else {
      document.getElementById("errorMessage").textContent =
        "Wrong Email or Password";
    }
  });
