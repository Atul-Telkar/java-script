// Add event listener to the manage documents link to load the manage documents interface
document
  .getElementById("manageDocumentsLink")
  .addEventListener("click", function (event) {
    event.preventDefault();
    loadManageDocuments();
  });

// Add event listener to the add upload button to display the upload form
document.getElementById("addUploadBtn").addEventListener("click", function () {
  document.getElementById("uploadForm").style.display = "block";
});

// Add event listener to the submit upload button to save the file and update the document list
document
  .getElementById("submitUpload")
  .addEventListener("click", function (event) {
    event.preventDefault();
    saveFile();
    populateDocumentList();
  });

// Add event listener to the edit document form to handle form submission and update document details
document
  .getElementById("editDocForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const docLabel = document.getElementById("label").value;
    const docId = document.getElementById("docId").value;

    if (docLabel.length > 50) {
      alert("Input length should not exceed 50 characters.");
      return;
    }

    let storedDoc = JSON.parse(localStorage.getItem("documents")) || [];
    const docIndex = storedDoc.findIndex((doc) => doc.id === docId);

    if (docIndex !== -1) {
      storedDoc[docIndex].label = docLabel;
      localStorage.setItem("documents", JSON.stringify(storedDoc));
      alert("Document updated successfully!");
      document.getElementById("editDocContainer").style.display = "none";
      populateDocumentList();
      document.getElementById("addUploadBtn").style.display = "block";
    } else {
      alert("Document not found!");
    }
  });

// Add event listener to the cancel edit upload button to hide the edit form and load manage documents interface
document
  .getElementById("cancelEditUpload")
  .addEventListener("click", function () {
    document.getElementById("editFormContainer").style.display = "none";
    document.getElementById("editDocContainer").style.display = "none";
    loadManageDocuments();
  });

// Add event listener to the cancel upload button to hide the edit form, edit document container, and upload form
document.getElementById("cancelUpload").addEventListener("click", function () {
  document.getElementById("editFormContainer").style.display = "none";
  document.getElementById("editDocContainer").style.display = "none";
  document.getElementById("uploadForm").style.display = "none";
});

// Function to save the uploaded file and store its details in local storage
function saveFile() {
  let documentLabel = document.getElementById("documentLabel").value;
  let documentFile = document.getElementById("documentFile").files[0];

  if (documentLabel == "") {
    alert("Label must be filled out");
    return;
  }

  if (!documentFile) {
    alert("File not chosen to upload");
    return;
  }

  if (documentLabel.length > 50) {
    alert("Input length should not exceed 50 characters.");
    return;
  }

  // Validate file size (limit to 5KB)
  if (documentFile.size > 5120) {
    // 5KB = 5120 bytes
    alert("File size should not exceed 5KB.");
    return;
  }

  if (documentLabel && documentFile) {
    let newDocument = {
      id: crypto.randomUUID(),
      label: documentLabel,
      fileName: documentFile.name,
      fileContent: documentFile,
    };
    saveDocumentToLocalStorage(newDocument);
    alert("Document uploaded successfully!");
    document.getElementById("uploadForm").reset();
    document.getElementById("uploadForm").style.display = "none";
  } else {
    alert("Please fill in all fields.");
  }
}

// Function to show the edit form for a document and populate it with the document's details
function showEditDoc(doc) {
  document.getElementById("documentTable").style.display = "none";
  document.getElementById("addUploadBtn").style.display = "none";
  document.getElementById("groupChatContainer").style.display = "none";
  document.getElementById("editDocContainer").style.display = "block";
  document.getElementById("label").value = doc.label;
  document.getElementById("docId").value = doc.id;
}

// Function to delete a document from the stored documents list
function deleteDoc(id) {
  if (confirm("Are you sure you want to delete this Document?")) {
    let storedDocuments = JSON.parse(localStorage.getItem("documents")) || [];
    let updateDocs = storedDocuments.filter((doc) => doc.id !== id);
    localStorage.setItem("documents", JSON.stringify(updateDocs));
    populateDocumentList();
  }
}

// Function to load the manage documents interface
function loadManageDocuments() {
  pageTitle.textContent = "Manage Documents";
  pageSubTitle.style.display = "none";
  document.getElementById("userTable").style.display = "none";
  document.getElementById("editFormContainer").style.display = "none";
  document.getElementById("editDocContainer").style.display = "none";
  document.getElementById("groupChatContainer").style.display = "none";
  showManageDocumentForm();
}

// Function to show the manage document form and populate the document list
function showManageDocumentForm() {
  document.getElementById("DocumentFormContainer").style.display = "block";
  document.getElementById("documentTable").style.display = "block";
  document.getElementById("addUploadBtn").style.display = "block";
  populateDocumentList();
}

// Function to populate the document list table with stored document details
function populateDocumentList() {
  let documentTable = document.getElementById("documentTable");
  let documentList = document.getElementById("documentList");
  documentList.innerHTML = "";
  pageSubTitle.style.display = "none";
  if (documentList && documentTable) {
    let storedDocument = JSON.parse(localStorage.getItem("documents")) || [];
    if (storedDocument.length === 0) {
      documentTable.style.display = "none";
      return;
    }

    storedDocument.forEach((doc) => {
      let row = document.createElement("tr");

      let nameCell = document.createElement("td");
      nameCell.textContent = doc.label;
      row.appendChild(nameCell);

      let emailCell = document.createElement("td");
      emailCell.textContent = doc.fileName;
      row.appendChild(emailCell);

      let actionsCell = document.createElement("td");

      let editLink = document.createElement("a");
      editLink.textContent = "Edit";
      editLink.href = "#";
      editLink.onclick = (e) => {
        e.preventDefault();
        showEditDoc(doc);
      };
      actionsCell.appendChild(editLink);

      actionsCell.appendChild(document.createTextNode(" | "));

      let deleteLink = document.createElement("a");
      deleteLink.textContent = "Delete";
      deleteLink.href = "#";
      deleteLink.onclick = (e) => {
        e.preventDefault();
        deleteDoc(doc.id);
      };
      actionsCell.appendChild(deleteLink);

      row.appendChild(actionsCell);
      documentList.appendChild(row);
    });
    documentTable.style.display = "table";
  } else {
    console.error("documentList or documentTable element not found.");
  }
}

