// popup window functionality 
function popup() {
    const createContainer = document.createElement('div');
    createContainer.innerHTML = `
        <div id="createContainer">
            <h1>new note</h1> 
            <textarea id="note-text" placeholder="start a new note..."></textarea>

            <div id="button-container">
                <button id="submitButton" onclick="createNote()">create note</button>
                <button id="closeButton" onclick="closeNote()">close</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(createContainer);
}

// cancelling note creation functionality 
function closeNote() {
    const createContainer = document.getElementById("createContainer");
    if (createContainer) {
        createContainer.remove();
    }
}

// creating a new note functionality 
function createNote() {
    const createContainer = document.getElementById("createContainer");
    const noteText = document.getElementById("note-text").value;
    
    // new note attributes 
    const note = {
        id: new Date().getTime(),
        text: noteText
    };

    const existingNotes = JSON.parse(localStorage.getItem("notes")) || [];
    existingNotes.push(note);

    localStorage.setItem("notes", JSON.stringify(existingNotes));

    document.getElementById("note-text").value = "";

    createContainer.remove();
    displayNotes();
}

// displaying added notes functionality 
function displayNotes() {
    const notesList = document.getElementById("notes-list");
    notesList.innerHTML = "";

    const notes = JSON.parse(localStorage.getItem("notes")) || [];

    notes.forEach(note => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span>${note.text}</span>
            <div id="noteButtons-container">
                <button class="editButton" onclick="editNote(${note.id})"><i class="fa-solid fa-pen"></i></button>
                <button class="deleteButton" onclick="deleteNote(${note.id})"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        notesList.appendChild(listItem);
    });
}

// editing mode functionality 
function editNote(noteId) {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const noteToEdit = notes.find(note => note.id == noteId);
    const noteText = noteToEdit ? noteToEdit.text : "";
    const editingWindow = document.createElement("div");

    editingWindow.innerHTML = `
        <div id="editing-container" data-note-id="${noteId}">
            <h1>edit note</h1>
            <textarea id="note-text" placeholder="${noteText == "" ? "add some text here..." : ""}">${noteText}</textarea>
            <div id="button-container">
                <button id="submitButton" onclick="updateNote()">done</button>
                <button id="closeButton" onclick="closeEditWindow()">cancel</button>
            </div>
        </div>
    `;

    document.body.appendChild(editingWindow);
}

// close editing window functionality 
function closeEditWindow() {
    const editingWindow = document.getElementById("editing-container");
    if (editingWindow) {
        editingWindow.remove();
    }
}

// update the contents of a note functionality
function updateNote() {
    const noteText = document.getElementById("note-text").value.trim();
    const editingWindow = document.getElementById("editing-container");

    const noteId = editingWindow.getAttribute("data-note-id");
    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    const updatedNotes = notes.map(note => {
        if (note.id == noteId) {
            return { id: note.id, text: noteText };
        }
        return note;
    });

    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    editingWindow.remove();
    displayNotes();
}

// deleting note functionality 
function deleteNode(noteId) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes = notes.filter(note => note.id !== noteId);

    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
}

// display notes everytime user refreshes the browser
displayNotes();
