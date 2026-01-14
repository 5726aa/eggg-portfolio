document.addEventListener('DOMContentLoaded', () => {
    const updateClock = () => {
        const clockElement = document.getElementById('liveClock');
        if (!clockElement) return;
        const now = new Date();
        const Y = now.getFullYear();
        const M = String(now.getMonth() + 1).padStart(2, '0');
        const D = String(now.getDate()).padStart(2, '0');
        const h = String(now.getHours()).padStart(2, '0');
        const m = String(now.getMinutes()).padStart(2, '0');
        const s = String(now.getSeconds()).padStart(2, '0');
        clockElement.innerText = `${Y}. ${M}. ${D}. ${h}:${m}:${s}`;
    };
    setInterval(updateClock, 1000);
    updateClock();
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        reveals.forEach(el => {
            if (el.closest('.tab-pane')) return;
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                el.classList.add('active');
                el.classList.add('revealed');
            }
        });
    };
    const strategyCards = document.querySelectorAll('.strategy-card');
    strategyCards.forEach(card => {
        card.addEventListener('click', function () {
            strategyCards.forEach(otherCard => {
                if (otherCard !== card) otherCard.classList.remove('active');
            });
            this.classList.toggle('active');
        });
    });
    const startCount = () => {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000;
            const startTime = performance.now();
            const updateCount = (currentTime) => {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                const currentNumber = Math.floor(progress * target);
                counter.innerText = currentNumber;
                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target;
                }
            };
            requestAnimationFrame(updateCount);
        });
    };
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                startCount();
                observer.disconnect();
            }
        }, { threshold: 0.3 });
        observer.observe(statsSection);
    }
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const targetPane = document.getElementById(targetId);
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => {
                p.classList.remove('active');
                p.querySelectorAll('.reveal').forEach(el => el.classList.remove('active'));
            });
            btn.classList.add('active');
            if (targetPane) {
                targetPane.classList.add('active');
                setTimeout(() => {
                    const revealsInPane = targetPane.querySelectorAll('.reveal');
                    revealsInPane.forEach(el => {
                        el.classList.add('active');
                    });
                }, 100);
            }
        });
    });
    const contactForm = document.getElementById('marketingForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('성공적으로 접수되었습니다. 담당 마케터가 곧 연락드리겠습니다!');
            contactForm.reset();
        });
    }
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
    const activePane = document.querySelector('.tab-pane.active');
    if (activePane) {
        setTimeout(() => {
            activePane.querySelectorAll('.reveal').forEach(el => {
                el.classList.add('active');
            });
        }, 500);
    }
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});