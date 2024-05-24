async function sendMessage() {
    const message = document.getElementById('messageInput').value;
    const response = await fetch('http://localhost:3000/print', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
    });

    const result = await response.json();
    alert(result.status);
}
