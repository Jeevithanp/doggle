// script.js

async function submitVote(option) {
    const name = document.getElementById('name').value;
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;

    try {
        const response = await fetch('/vote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, age, gender, option })
        });

        const result = await response.json();
        const confirmationDiv = document.getElementById('confirmation');
        confirmationDiv.innerHTML = result.success ? 'Vote submitted successfully!' : result.message;
    } catch (error) {
        console.error('Error submitting vote:', error);
    }
}
