// Add event listener to the manage users link to load the manage users interface
document
  .getElementById("manageUsersLink")
  .addEventListener("click", function (event) {
    event.preventDefault();
    loadManageUsers();
  });

// Add event listener to the edit user form to handle form submission and update user details
document
  .getElementById("editUserForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;

    if (fullName.length > 10) {
      alert("Name must be no more than 10 characters long");
      return false;
    }

    let storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = storedUsers.findIndex((user) => user.email === email);

    if (userIndex !== -1) {
      const oldFullName = storedUsers[userIndex].fullName;
      storedUsers[userIndex].fullName = fullName;
      localStorage.setItem("users", JSON.stringify(storedUsers));
      alert("User details updated successfully!");
      document.getElementById("editFormContainer").style.display = "none";
      document.getElementById("editDocContainer").style.display = "none";
      populateUserList();

      // Update chat history
      let chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
      chatHistory.forEach((chat) => {
        if (chat.message.includes(oldFullName)) {
          chat.message = chat.message.replace(oldFullName, fullName);
        }
      });
      localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    } else {
      alert("User not found!");
    }
  });

// Add event listener to the cancel edit button to hide the edit form and load manage users interface
document.getElementById("cancelEdit").addEventListener("click", function () {
  document.getElementById("editFormContainer").style.display = "none";
  document.getElementById("editDocContainer").style.display = "none";
  loadManageUsers();
});

// Function to load the manage users interface and populate the user list
function loadManageUsers() {
  let userList = document.getElementById("userList");
  pageTitle.textContent = "Manage User";
  document.getElementById("editFormContainer").style.display = "none";
  document.getElementById("editDocContainer").style.display = "none";
  document.getElementById("documentTable").style.display = "none";
  document.getElementById("addUploadBtn").style.display = "none";
  document.getElementById("groupChatContainer").style.display = "none";
  populateUserList();
}

// Function to populate the user list table with stored user details
function populateUserList() {
  let userTable = document.getElementById("userTable");
  let userList = document.getElementById("userList");
  userList.innerHTML = "";
  pageSubTitle.style.display = "none";

  if (userList && userTable) {
    let storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    let urlParams = new URLSearchParams(window.location.search);
    let loggedInUserEmail = urlParams.get("email");

    if (storedUsers.length === 0) {
      userTable.style.display = "none";
      return;
    }

    storedUsers.forEach((user) => {
      let row = document.createElement("tr");

      let nameCell = document.createElement("td");
      nameCell.textContent = user.fullName;
      row.appendChild(nameCell);

      let emailCell = document.createElement("td");
      emailCell.textContent = user.email;
      row.appendChild(emailCell);

      let actionsCell = document.createElement("td");

      let editLink = document.createElement("a");
      editLink.textContent = "Edit";
      editLink.href = "#";
      editLink.onclick = (e) => {
        e.preventDefault();
        showEditForm(user);
      };
      actionsCell.appendChild(editLink);

      actionsCell.appendChild(document.createTextNode(" | "));

      let deleteLink = document.createElement("a");
      deleteLink.textContent = "Delete";
      deleteLink.href = "#";
      deleteLink.onclick = (e) => {
        e.preventDefault();
        deleteUser(user.email);
      };

      if (user.email === loggedInUserEmail) {
        deleteLink.style.pointerEvents = "none";
        deleteLink.style.color = "gray";
      }

      actionsCell.appendChild(deleteLink);

      row.appendChild(actionsCell);
      userList.appendChild(row);
    });
    userTable.style.display = "table";
  } else {
    console.error("userList or userTable element not found.");
  }
}

// Function to show the edit form for a user and populate it with the user's details
function showEditForm(user) {
  document.getElementById("userTable").style.display = "none";
  document.getElementById("editFormContainer").style.display = "block";
  document.getElementById("addUploadBtn").style.display = "none";
  document.getElementById("groupChatContainer").style.display = "none";
  document.getElementById("fullName").value = user.fullName;
  document.getElementById("email").value = user.email;
}

// Function to delete a user from the stored users list
function deleteUser(email) {
  if (confirm("Are you sure you want to delete this user?")) {
    let storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    let updatedUsers = storedUsers.filter((user) => user.email !== email);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    populateUserList();
  }
}
