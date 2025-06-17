document.addEventListener('DOMContentLoaded', () => {
    showVisitMessage();
    loadDiscoverCards();
});

function showVisitMessage() {
    const visitMessage = document.getElementById('visitMessage');
    const lastVisit = localStorage.getItem('discoverLastVisit');
    const now = Date.now();
    let message = '';
    if (!lastVisit) {
        message = 'Welcome! Let us know if you have any questions.';
    } else {
        const days = Math.floor((now - Number(lastVisit)) / (1000 * 60 * 60 * 24));
        if (days < 1) {
            message = 'Back so soon! Awesome!';
        } else if (days === 1) {
            message = 'You last visited 1 day ago.';
        } else {
            message = `You last visited ${days} days ago.`;
        }
    }
    visitMessage.textContent = message;
    localStorage.setItem('discoverLastVisit', now);
}

function loadDiscoverCards() {
    fetch('data/discover.json')
        .then(response => response.json())
        .then(data => {
            const gallery = document.getElementById('discoverGallery');
            data.forEach(item => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
          <h2>${item.name}</h2>
          <div class="card-content">
            <figure><img src="${item.image}" alt="${item.name}" width="200" height="140"></figure>
            <div class="card-info">
              <address>${item.address}</address>
              <p>${item.description}</p>
            </div>
          </div>
          <button type="button">Learn More</button>
        `;
                gallery.appendChild(card);
            });
        });
}
