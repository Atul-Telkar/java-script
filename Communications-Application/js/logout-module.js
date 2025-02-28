// Add event listener to the logout link to log the user out
document
  .getElementById("logoutLink")
  .addEventListener("click", function (event) {
    event.preventDefault();
    logout();
  });

// Function to log the user out and redirect to the welcome page
function logout() {
  sessionStorage.removeItem("loggedIn");
  window.location.href = "Welcome.html?logout=true";
}
