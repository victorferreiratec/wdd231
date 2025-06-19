const hamburgerButton = document.getElementById('hamburgerButton');
        const mainNav = document.getElementById('mainNav');

        hamburgerButton.addEventListener('click', () => {
            hamburgerButton.classList.toggle('active');
            mainNav.classList.toggle('active');
        });

        // Close menu when a nav link is clicked (optional, but good for UX)
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerButton.classList.remove('active');
                mainNav.classList.remove('active');
            });
        });