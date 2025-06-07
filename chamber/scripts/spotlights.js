async function getSpotlights() {
    const response = await fetch('data/members.json');
    const members = await response.json();

    const spotlights = members.filter(m => m.membershipLevel === 2 || m.membershipLevel === 3);

    const count = Math.floor(Math.random() * 2) + 2;
    const selected = spotlights.sort(() => 0.5 - Math.random()).slice(0, count);

    displaySpotlights(selected);
}

function displaySpotlights(members) {
    const container = document.querySelector('.business-cards');
    container.innerHTML = '';
    container.className = 'business-cards grid-view';

    members.forEach(member => {
        const card = document.createElement('div');
        card.className = 'business-card';

        card.innerHTML = `
            <div class="business-info">
                <h3>${member.name}</h3>
                <h4>${member.description || member.tagline || ''}</h4>
                <hr>
                <div class="business-details-row">
                    <div class="business-img">
                        <img src="images/${member.image}" alt="${member.name}">
                    </div>
                    <div class="business-details">
                        <div><strong>Email:</strong> ${member.email || '-'}</div>
                        <div><strong>Phone:</strong> ${member.phone || '-'}</div>
                        <div><strong>URL:</strong> <a href="${member.website}" target="_blank">${member.website.replace(/^https?:\/\//, '')}</a></div>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

getSpotlights();