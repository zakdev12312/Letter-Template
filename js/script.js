document.addEventListener('DOMContentLoaded', function() {
    const greeting = document.querySelector('.greeting');

    function fadeInOnScroll() {
        if (window.scrollY > 50) {
            greeting.classList.add('fade-in');
        }
    }

    window.addEventListener('scroll', fadeInOnScroll);
});