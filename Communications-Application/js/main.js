document.addEventListener("DOMContentLoaded", function () {
  // Initialize the page
  document.getElementById("groupChatContainer").style.display = "none";
  document.getElementById("addUploadBtn").style.display = "none";
  document.getElementById("uploadForm").style.display = "none";
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get("email");
  if (sessionStorage.getItem("loggedIn") !== email) {
    window.location.href = "Welcome.html";
  }
  document.getElementById("pageSubTitle").textContent = `Welcome, ${email}!`;
});

window.addEventListener("load", function () {
  updateUserName();
});
