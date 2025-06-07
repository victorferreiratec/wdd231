document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    menuToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
    });
});