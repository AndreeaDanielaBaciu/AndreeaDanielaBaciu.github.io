document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const closeMenu = document.querySelector('.close-menu');

    const toggleMenu = () => navLinks.classList.toggle('open');

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', (event) => {
            event.preventDefault();
            navLinks.classList.remove('open');
        });
    }

    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach((button) => {
        button.addEventListener('click', () => {
            tabButtons.forEach((btn) => btn.classList.remove('active'));
            tabPanels.forEach((panel) => panel.classList.remove('active'));

            button.classList.add('active');
            document.getElementById(button.dataset.tab).classList.add('active');
        });
    });

    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');

    if (track && slides.length) {
        let currentIndex = 0;

        const updateCarousel = (index) => {
            currentIndex = (index + slides.length) % slides.length;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach((dot) => dot.classList.toggle('active', Number(dot.dataset.index) === currentIndex));
        };

        prevBtn?.addEventListener('click', () => updateCarousel(currentIndex - 1));
        nextBtn?.addEventListener('click', () => updateCarousel(currentIndex + 1));

        dots.forEach((dot) => {
            dot.addEventListener('click', () => updateCarousel(Number(dot.dataset.index)));
        });

        setInterval(() => updateCarousel(currentIndex + 1), 5000);
    }

    const form = document.forms['submit-to-google-sheet'];
    const msg = document.getElementById('msg');
    const scriptURL = 'https://script.google.com/macros/s/AKfycbz34T-EY-MzXwhEJ-XZnhAituDhYmr4u2A5pgikBN31l8nH1Q0yKHAajW5SgI19HKc/exec';

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            fetch(scriptURL, { method: 'POST', body: new FormData(form) })
                .then(() => {
                    msg.textContent = 'Message sent successfully';
                    form.reset();
                    setTimeout(() => {
                        msg.textContent = '';
                    }, 5000);
                })
                .catch((error) => {
                    console.error('Error!', error.message);
                    msg.textContent = 'Something went wrong. Please try again.';
                });
        });
    }
});