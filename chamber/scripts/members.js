async function getMembers() {
    const response = await fetch('data/members.json');
    const members = await response.json();
    displayMembers(members, 'grid');
}

function displayMembers(members, view = 'grid') {
    const container = document.querySelector('.business-cards');
    container.innerHTML = '';
    container.className = 'business-cards ' + (view === 'list' ? 'list-view' : 'grid-view');

    if (view === 'grid') {
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
    } else {
        // List view: show as a table
        const table = document.createElement('table');
        table.className = 'business-table';
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Website</th>
                </tr>
            </thead>
            <tbody>
                ${members.map(member => `
                    <tr>
                        <td data-label="Nome">${member.name}</td>
                        <td data-label="Descrição">${member.description || member.tagline || ''}</td>
                        <td>${member.email || '-'}</td>
                        <td>${member.phone || '-'}</td>
                        <td><a href="${member.website}" target="_blank">${member.website.replace(/^https?:\/\//, '')}</a></td>
                    </tr>
                `).join('')}
            </tbody>
        `;
        container.appendChild(table);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let membersData = [];
    const gridBtn = document.getElementById('gridViewBtn');
    const listBtn = document.getElementById('listViewBtn');
    fetch('data/members.json')
        .then(res => res.json())
        .then(data => {
            membersData = data;
            displayMembers(membersData, 'grid');
        });

    gridBtn.addEventListener('click', () => {
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
        displayMembers(membersData, 'grid');
    });

    listBtn.addEventListener('click', () => {
        listBtn.classList.add('active');
        gridBtn.classList.remove('active');
        displayMembers(membersData, 'list');
    });
});