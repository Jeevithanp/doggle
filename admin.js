// admin.js

// Admin login function
async function adminLogin() {
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/admin-login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password })
        });

        const result = await response.json();
        if (result.success) {
            document.getElementById('adminLoginForm').style.display = 'none';
            document.getElementById('adminContent').style.display = 'block';
            fetchVotes();
            fetchVoterDetails();
        } else {
            alert('Invalid admin password!');
        }
    } catch (error) {
        console.error('Error during admin login:', error);
    }
}

// Function to fetch vote data and display it in a bar chart
async function fetchVotes() {
    try {
        const response = await fetch('/votes');
        if (response.ok) {
            const votes = await response.json();
            updateChart(votes);
        } else {
            console.error('Failed to fetch votes data');
        }
    } catch (error) {
        console.error('Error fetching votes:', error);
    }
}

// Function to fetch voter details and display them
async function fetchVoterDetails() {
    try {
        const response = await fetch('/voters');
        if (response.ok) {
            const voters = await response.json();
            updateVoterDetails(voters);
        } else {
            console.error('Failed to fetch voter details');
        }
    } catch (error) {
        console.error('Error fetching voter details:', error);
    }
}

// Function to update the chart with voting data
function updateChart(votes) {
    const ctx = document.getElementById('resultsChart').getContext('2d');
    const labels = Object.keys(votes);
    const data = Object.values(votes);

    // Clear existing chart instance if any
    if (window.voteChart) {
        window.voteChart.destroy();
    }

    // Create a new chart
    window.voteChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Votes',
                data: data,
                backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Function to update the voter details section with fetched data
function updateVoterDetails(voters) {
    const voterDetailsDiv = document.getElementById('voterDetails');
    voterDetailsDiv.innerHTML = '<h3>List of Voters</h3>'; // Header for voter details section

    // Create a table for voter details
    const table = document.createElement('table');
    table.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Voted Option</th>
        </tr>
    `;

    // Populate the table with voter details
    for (const [name, details] of Object.entries(voters)) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${name}</td>
            <td>${details.age}</td>
            <td>${details.gender}</td>
            <td>${details.option}</td>
        `;
        table.appendChild(row);
    }

    voterDetailsDiv.appendChild(table);
}

// Periodically fetch and update the admin dashboard data
setInterval(fetchVotes, 5000);
setInterval(fetchVoterDetails, 5000);
// admin.js

async function adminLogin() {
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/admin-login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password })
        });

        const result = await response.json();
        if (result.success) {
            document.getElementById('adminLoginForm').style.display = 'none';
            document.getElementById('adminContent').style.display = 'block';
            fetchVotes();
            fetchVoterDetails();
        } else {
            alert('Invalid admin password!');
        }
    } catch (error) {
        console.error('Error during admin login:', error);
    }
}

async function fetchVotes() {
    try {
        const response = await fetch('/votes');
        if (response.ok) {
            const votes = await response.json();
            updateChart(votes);
        } else {
            console.error('Failed to fetch votes data');
        }
    } catch (error) {
        console.error('Error fetching votes:', error);
    }
}

async function fetchVoterDetails() {
    try {
        const response = await fetch('/voters');
        if (response.ok) {
            const voters = await response.json();
            updateVoterDetails(voters);
        } else {
            console.error('Failed to fetch voter details');
        }
    } catch (error) {
        console.error('Error fetching voter details:', error);
    }
}

function updateChart(votes) {
    const ctx = document.getElementById('resultsChart').getContext('2d');
    const labels = Object.keys(votes);
    const data = Object.values(votes);

    if (window.voteChart) {
        window.voteChart.destroy();
    }

    window.voteChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Votes',
                data: data,
                backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function updateVoterDetails(voters) {
    const voterDetailsDiv = document.getElementById('voterDetails');
    voterDetailsDiv.innerHTML = '<h3>List of Voters</h3>';

    const table = document.createElement('table');
    table.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Voted Option</th>
        </tr>
    `;

    for (const [name, details] of Object.entries(voters)) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${name}</td>
            <td>${details.age}</td>
            <td>${details.gender}</td>
            <td>${details.option}</td>
        `;
        table.appendChild(row);
    }

    voterDetailsDiv.appendChild(table);
}

setInterval(fetchVotes, 5000);
setInterval(fetchVoterDetails, 5000);
