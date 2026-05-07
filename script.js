document.addEventListener('DOMContentLoaded', () => {
    AOS.init({ duration: 800, once: true });

    const glow = document.querySelector('.cursor-glow');
    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });

    const navItems = document.querySelectorAll('.nav-item');
    const navLinksList = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li a');
    const sections = document.querySelectorAll('.content-section');
    const subpageName = document.getElementById('subpage-name');
    const menuToggle = document.getElementById('mobile-menu');
    const contactForm = document.getElementById('contact-form');
    const successPage = document.getElementById('success-page');

    if(contactForm) {
        const emailInput = document.getElementById('email-address');

        emailInput.addEventListener('input', () => {
            if (!emailInput.value.toLowerCase().endsWith("@gmail.com") && emailInput.value.trim() !== "") {
                emailInput.setCustomValidity('Please enter a valid @gmail.com address');
            } else {
                emailInput.setCustomValidity('');
            }
        });

        contactForm.addEventListener('submit', (e) => {
            if (!contactForm.checkValidity()) {
                return; 
            }

            e.preventDefault();

            document.querySelectorAll('.error-msg').forEach(el => el.style.display = 'none');

            sections.forEach(section => section.classList.remove('active'));
            successPage.classList.add('active');
            contactForm.reset();
            window.scrollTo(0,0);
        });
    }

    if(menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinksList.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const href = item.getAttribute('href');
            if(href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                
                navLinksList.classList.remove('active');
                if(menuToggle) {
                    const icon = menuToggle.querySelector('i');
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }

                navLinks.forEach(link => link.classList.remove('active-link'));
                const activeNavLink = document.querySelector(`.nav-links li a[href="#${targetId}"]`);
                if(activeNavLink) activeNavLink.classList.add('active-link');
                
                if (targetId === 'home') {
                    subpageName.style.display = 'none';
                } else {
                    subpageName.style.display = 'block';
                }

                sections.forEach(section => section.classList.remove('active'));
                const activeSection = document.getElementById(targetId);
                if(activeSection) {
                    activeSection.classList.add('active');
                    window.scrollTo(0,0);
                    AOS.refresh();
                }
            }
        });
    });
});