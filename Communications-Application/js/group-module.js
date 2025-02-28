// Add event listener to the group chat link to load the group chat interface
document
  .getElementById("groupChatLink")
  .addEventListener("click", function (event) {
    event.preventDefault();
    loadGroupChat();
  });

document
  .getElementById("refreshButton")
  .addEventListener("click", function (event) {
    const chatMessages = document.getElementById("chatMessages");
    updateUserName(); // Update user name
    loadChatHistory();
  });

document
  .getElementById("chatForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const chatInput = document.getElementById("chatInput");
    const message = chatInput.value;

    if (!message) {
      alert("No message entered!");
      return;
    }
    addMessage(message);
    chatInput.value = "";
  });

// Function to add a new message to the chat
function addMessage(message) {
  const chatMessages = document.getElementById("chatMessages");
  const messageElement = document.createElement("div");
  const now = new Date();
  const timestamp = `[${now.toLocaleString()}]`;

  let urlParams = new URLSearchParams(window.location.search);
  let loggedInUserEmail = urlParams.get("email");

  const fullName = getFullNameByEmail(loggedInUserEmail);
  const fullMessage = fullName ? `${fullName}: ${message}` : message;
  messageElement.textContent = `${timestamp} ${fullMessage}`;

  // Append the message to the chat box
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Save the message to local storage
  saveMessageToLocalStorage(timestamp, fullMessage);
}

function loadChatHistory() {
  const chatMessages = document.getElementById("chatMessages");

  // Clear existing chat messages
  chatMessages.innerHTML = "";

  let chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];

  chatHistory.forEach(({ timestamp, message }) => {
    const messageElement = document.createElement("div");
    messageElement.textContent = `${timestamp} ${message}`;
    chatMessages.appendChild(messageElement);
  });

  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to load the group chat interface
function loadGroupChat() {
  pageTitle.textContent = "Group Chat";
  pageSubTitle.style.display = "none";
  document.getElementById("userTable").style.display = "none";
  document.getElementById("editFormContainer").style.display = "none";
  document.getElementById("editDocContainer").style.display = "none";
  document.getElementById("documentTable").style.display = "none";
  document.getElementById("uploadForm").style.display = "none";
  document.getElementById("addUploadBtn").style.display = "none";
  document.getElementById("groupChatContainer").style.display = "block";
  loadChatHistory();
  updateUserName(); // Update user name
}

// Function to update the user name
function updateUserName() {
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get("email");
  if (email) {
    const fullName = getFullNameByEmail(email);
    const userNameElement = document.getElementById("printUserName");
    userNameElement.textContent = fullName;
  } else {
    console.error("Email parameter not found in URL.");
  }
}
