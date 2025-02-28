// Function to get fullName based on email
function getFullNameByEmail(email) {
  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
  const user = storedUsers.find((user) => user.email === email);
  return user ? user.fullName : null;
}

// Function to save a message to local storage
function saveMessageToLocalStorage(timestamp, message) {
  let chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
  chatHistory.push({ timestamp, message });
  localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
}

// Function to save a document to local storage
function saveDocumentToLocalStorage(newDocument) {
  let storedDocuments = JSON.parse(localStorage.getItem("documents")) || [];
  storedDocuments.push(newDocument);
  localStorage.setItem("documents", JSON.stringify(storedDocuments));
}

