(function () {
    'use strict';

    // Os icones sao SVG inline no HTML: nao dependem de CDN nem de JS.

    // Animacoes de entrada, com IntersectionObserver nativo.
    // O CSS deixa [data-aos] em opacity: 0; se algo aqui falhar, a classe
    // .no-aos devolve o conteudo em vez de deixar a pagina em branco.
    const alvos = document.querySelectorAll('[data-aos]');
    if ('IntersectionObserver' in window && alvos.length) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const delay = parseInt(el.dataset.aosDelay, 10) || 0;
                setTimeout(() => el.classList.add('aos-animate'), delay);
                obs.unobserve(el); // anima uma vez so
            });
        }, { rootMargin: '0px 0px -10% 0px', threshold: 0.01 });

        alvos.forEach(el => observer.observe(el));
    } else {
        document.documentElement.classList.add('no-aos');
    }

    // Navbar compacta ao rolar
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            const compact = window.scrollY > 50;
            navbar.classList.toggle('shadow-2xl', compact);
            navbar.classList.toggle('py-2', compact);
            navbar.classList.toggle('py-4', !compact);
        }, { passive: true });
    }

    // Menu mobile
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    function setMenu(open) {
        if (!mobileMenu || !mobileMenuButton) return;
        mobileMenu.classList.toggle('hidden', !open);
        mobileMenuButton.setAttribute('aria-expanded', String(open));
        mobileMenuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
        // Alterna entre os dois icones ja presentes no HTML
        const abrir = mobileMenuButton.querySelector('[data-icon="open"]');
        const fechar = mobileMenuButton.querySelector('[data-icon="close"]');
        if (abrir && fechar) {
            abrir.classList.toggle('hidden', open);
            fechar.classList.toggle('hidden', !open);
        }
    }

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', (e) => {
            e.stopPropagation();
            setMenu(mobileMenu.classList.contains('hidden'));
        });

        // Fecha ao tocar fora do menu
        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('hidden')) return;
            if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
                setMenu(false);
            }
        });

        // Fecha ao rolar a pagina
        window.addEventListener('scroll', () => {
            if (!mobileMenu.classList.contains('hidden')) setMenu(false);
        }, { passive: true });

        // Fecha com Esc
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) setMenu(false);
        });
    }

    // Rolagem suave das ancoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
            setMenu(false);
        });
    });

    // Ano do rodape sempre atualizado
    const year = document.getElementById('current-year');
    if (year) year.textContent = new Date().getFullYear();
})();
