// popup window functionality 
function popup() {
    const createContainer = document.createElement('div');
    createContainer.innerHTML = `
        <div id = "createContainer">
            <h1>new note</h1> 
            <textarea id = "note-text" placeholder = "start a new note..."></textarea>

            <div id = "button-container">
                <button id = "submitButton" onclick = "createNote()">create note</button>
                <button id = "closeButton" onclick = "closeNote()">close</button>
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
    const text = document.getElementById("note-text").value;
    
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
    notes.innnerHTML = "";

    const notes = JSON.parse(localStorage.getItem("notes")) || [];

    notes.forEach(note => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span>${note.text}</span>
            <div id = "noteButtons-container">
                <button id = "editButton" onclick = "editNote(${note.id}")><i class = "fa-solid fa-pen"></i></button>
                <button id = "deleteButton" onclick = "deleteNote(${note.id}")><i class = "fa-solid fa-trash"></i></button>
            </div>
        `;

        notesList.appendChild(listItem);
    })
}