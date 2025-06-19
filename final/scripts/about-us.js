document.addEventListener('DOMContentLoaded', () => {
    const teamGrid = document.getElementById('teamGrid');

    async function fetchTeamData() {
        try {
            const response = await fetch('data/team.json'); // Path to your JSON file
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const teamMembers = await response.json();
            displayTeamMembers(teamMembers);
        } catch (error) {
            console.error('Error fetching team data:', error);
            teamGrid.innerHTML = '<p>Failed to load team information. Please try again later.</p>';
        }
    }

    function displayTeamMembers(members) {
        teamGrid.innerHTML = ''; // Clears any existing content

        members.forEach(member => {
            const card = document.createElement('div');
            card.classList.add('team-member-card');

            card.innerHTML = `
                <img src="${member.image}" alt="${member.name}" loading="lazy">
                <h3>${member.name}</h3>
                <p class="title">${member.title}</p>
                <p>${member.description}</p>
            `;
            teamGrid.appendChild(card);
        });
    }

    // Calls the function to load team members when the page loads
    fetchTeamData();
});