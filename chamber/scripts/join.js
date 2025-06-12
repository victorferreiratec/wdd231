document.addEventListener('DOMContentLoaded', function () {
    const dialogs = [
        {
            id: 'npModal',
            title: 'NP Membership Benefits',
            benefits: [
                'No membership fee',
                'Access to community events',
                'Networking opportunities'
            ]
        },
        {
            id: 'bronzeModal',
            title: 'Bronze Membership Benefits',
            benefits: [
                'All NP benefits',
                'Discounted event tickets',
                'Business directory listing'
            ]
        },
        {
            id: 'silverModal',
            title: 'Silver Membership Benefits',
            benefits: [
                'All Bronze benefits',
                'Spotlight advertising on homepage',
                'Free training sessions'
            ]
        },
        {
            id: 'goldModal',
            title: 'Gold Membership Benefits',
            benefits: [
                'All Silver benefits',
                'Premium event access',
                'Featured in newsletters',
                'Exclusive networking events'
            ]
        }
    ];
    dialogs.forEach(dialog => {
        if (!document.getElementById(dialog.id)) {
            const dlg = document.createElement('dialog');
            dlg.id = dialog.id;
            dlg.innerHTML = `
                <button class="close-dialog" aria-label="Close" onclick=\"document.getElementById('${dialog.id}').close()\">&times;</button>
                <h2 class="card-title">${dialog.title}</h2>
                <ul>${dialog.benefits.map(b => `<li>${b}</li>`).join('')}</ul>
            `;
            document.body.appendChild(dlg);
        }
    });

    document.getElementById('npBtn').addEventListener('click', function () {
        document.getElementById('npModal').showModal();
    });
    document.getElementById('bronzeBtn').addEventListener('click', function () {
        document.getElementById('bronzeModal').showModal();
    });
    document.getElementById('silverBtn').addEventListener('click', function () {
        document.getElementById('silverModal').showModal();
    });
    document.getElementById('goldBtn').addEventListener('click', function () {
        document.getElementById('goldModal').showModal();
    });

    var timestamp = document.getElementById('timestamp');
    if (timestamp) {
        timestamp.value = new Date().toISOString();
    }

    const cards = document.querySelectorAll('.membership-card');
    cards.forEach((card, i) => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(40px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.7s, transform 0.7s';
            card.style.opacity = 1;
            card.style.transform = 'translateY(0)';
        }, 200 + i * 200);
    });
});