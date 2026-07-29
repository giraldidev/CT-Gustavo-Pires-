(function () {
    'use strict';

    // Os plugins vem de CDN. Se qualquer um falhar (rede movel instavel,
    // bloqueador de anuncios, CDN fora do ar), nenhuma chamada abaixo pode
    // derrubar o restante do script.

    // Icones (Lucide)
    function renderIcons() {
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
        }
    }
    renderIcons();
    // Disponivel para o modal redesenhar seus icones
    window.renderIcons = renderIcons;

    // Animacoes de scroll (AOS)
    // O CSS do AOS deixa os elementos com opacity: 0 ate a biblioteca marca-los.
    // Sem o AOS a pagina inteira ficaria invisivel, entao liberamos o conteudo.
    if (window.AOS && typeof window.AOS.init === 'function') {
        window.AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic'
        });
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
        // Alterna o icone entre hamburguer e X
        const icon = mobileMenuButton.querySelector('[data-lucide], svg');
        if (icon) {
            icon.setAttribute('data-lucide', open ? 'x' : 'menu');
            renderIcons();
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
