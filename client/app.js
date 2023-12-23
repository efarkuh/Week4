const form = document.getElementById("guestForm");

form.addEventListener("submit", async function (event) {
    event.preventDefault();
    // get message from frontend
    const formData = new FormData(form);
    const formValues = Object.fromEntries(formData);
    console.log(formValues);
    // send the message to the API
    const response = await fetch("http://localhost:8080/guestbook", {
        method: "POST",
        headers:{
        "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
    });
    const json = await response.json();
    console.log(json);
    // Refresh the message list
    await getMessages();

    // Clear the form fields
    form.reset();
});

async function getMessages() {
    // Clear existing messages
    const messageContainer = document.getElementById("messageContainer");
    messageContainer.innerHTML = '';
    
    // get messages from db with API
    const response = await fetch("http://localhost:8080/guestbook");
    const messages = await response.json();
    
    // Update message count
    const messageCount = document.getElementById("messageCount");
    messageCount.textContent = messages.length + ' messages';

    // loop all messages
    messages.forEach(function(message){
            const li = document.createElement("li");
            li.className = "message-item"; // Add a class for styling if needed
            // const h3 = document.createElement("h3");
            // const p = document.createElement("p");

            const messageText = document.createElement("span");
            messageText.textContent = message.firstName + ": " + message.message;
            // h3.textContent = message.firstName;
            // p.textContent = message.message;
            const deleteButton = document.createElement("button");
            deleteButton.className = "delete-btn";
            // deleteButton.textContent = "Delete";
            // Use Font Awesome's trash can icon
            const icon = document.createElement("i");
            icon.className = "fas fa-trash";
            deleteButton.appendChild(icon);
            
            
            deleteButton.onclick = function() { deleteMessage(message.id); };
            
            li.appendChild(messageText);
            li.appendChild(deleteButton);
            document.getElementById("messageContainer").appendChild(li);

            // const messageContainer = document.getElementById("messageContainer");
            // messageContainer.appendChild(li);
            // messageContainer.appendChild(h3);
            // messageContainer.appendChild(p);
    })

}

// Add this function in app.js

async function deleteMessage(id) {
    const response = await fetch(`http://localhost:8080/guestbook/${id}`, {
        method: "DELETE",
    });
    const json = await response.json();
    console.log(json);
    // Refresh messages
    getMessages();
}

getMessages();