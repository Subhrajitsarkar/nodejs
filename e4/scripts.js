document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username');
    const usernameElement = document.getElementById('username');
 
    if (username) {
        usernameElement.textContent = username;
    }
 
    const messageForm = document.getElementById('messageForm');
    const messageInput = document.getElementById('message');
    const messageList = document.getElementById('messageList');
 
    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
 
        const message = messageInput.value;
        const sender = username || 'Anonymous';
 
        if (message) {
            // Create a new message element and add it to the list
            const messageElement = document.createElement('div');
            messageElement.className = 'message';
            messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
            messageList.appendChild(messageElement);
 
            // Add the message to the messages array
            const newMessage = { username: sender, message };
            messages.push(newMessage);
 
            // Save the messages to a JSON file for persistence
            fetch('/message/send-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });
 
            // Clear the input field
            messageInput.value = '';
        }
    });
 
    // Display existing messages when the page loads (if any)
    messages.forEach((msg) => {
        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.innerHTML = `<strong>${msg.username}:</strong> ${msg.message}`;
        messageList.appendChild(messageElement);
    });
 });
 